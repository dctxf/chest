/**
 * https://rollupjs.org/guide/zh/
 * 配置文档请参考
 */
// 安装以下 npm 包
import { nodeResolve } from '@rollup/plugin-node-resolve' // 解析 node_modules 中的模块
import commonjs from '@rollup/plugin-commonjs' // cjs => esm
import alias from '@rollup/plugin-alias' // alias 和 reslove 功能
import replace from '@rollup/plugin-replace'
import eslint from '@rollup/plugin-eslint'
import { terser } from 'rollup-plugin-terser'
import clear from 'rollup-plugin-clear'
import json from '@rollup/plugin-json' // 支持在源码中直接引入json文件，不影响下面的
import typescript from '@rollup/plugin-typescript'
import nodePolyfills from 'rollup-plugin-node-polyfills'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import { name, version, author } from '../package.json'

const NAME = 'chest'
const banner =
  '/*!\n' +
  ` * ${name} v${version}\n` +
  ` * (c) 2021-${new Date().getFullYear()} ${author}\n` +
  ' * Released under the MIT License.\n' +
  ' */'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: `dist/${name}.js`,
      format: 'umd',
      name: NAME,
      banner,
      exports: 'default',
    },
    {
      file: `dist/${name}.min.js`,
      format: 'umd',
      name: NAME,
      plugins: [terser()],
      banner,
      exports: 'default',
    },
    {
      file: `dist/${name}.cjs.js`,
      format: 'cjs',
      name: NAME,
      banner,
      exports: 'default',
    },
    {
      file: `dist/${name}.es.js`,
      format: 'es',
      name: NAME,
      banner,
      exports: 'default',
    },
  ],
  // 注意 plugin 的使用顺序
  plugins: [
    typescript(),
    json(),
    clear({
      targets: ['dist'],
    }),
    nodePolyfills(),
    alias(),
    replace({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      ),
      preventAssignment: true,
    }),
    nodeResolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs({
      include: 'node_modules/**',
    }),
    eslint({
      throwOnError: true,
      throwOnWarning: true,
      include: ['src/**'],
      exclude: ['node_modules/**'],
    }),
    babel({ exclude: 'node_modules/**', babelHelpers: 'bundled' }),
    process.env.NODE_ENV === 'production' && uglify(),
  ],
}
