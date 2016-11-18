// rollup.config.js
import json from 'rollup-plugin-json';

export default {
    format: 'umd',
    plugins: [
        json()
    ]
}
