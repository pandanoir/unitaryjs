// rollup.config.js
import npm      from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel    from 'rollup-plugin-babel'

export default {
    format: 'umd',
    plugins: [
        npm({ jsnext: true }), // npmモジュールを`node_modules`から読み込む
        commonjs(), // CommonJSモジュールをES6に変換
        babel() // ES5に変換
    ]
}
