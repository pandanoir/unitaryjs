// rollup.config.js
import npm      from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel    from 'rollup-plugin-babel';
import json from 'rollup-plugin-json';

export default {
    format: 'umd',
    plugins: [
        npm({ jsnext: true }), // npmモジュールを`node_modules`から読み込む
        commonjs(), // CommonJSモジュールをES6に変換
        json(),
        babel() // ES5に変換
    ]
}
