// rollup.config.js
import json from 'rollup-plugin-json';

export default {
    output: {
        format: 'umd',
    },
    plugins: [
        json(),
    ],
};
