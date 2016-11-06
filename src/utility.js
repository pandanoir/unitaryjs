const sign = n => n >= 0 ? '+' : '-';
const abs = n => n > 0 ? n : -n;
const isInteger = n => (0 | n) === n;
export {sign, abs, isInteger};
