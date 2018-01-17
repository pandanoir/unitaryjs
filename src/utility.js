const sign = n => n >= 0 ? '+' : '-';
const abs = n => n > 0 ? n : -n;
const isInteger = n => (0 | n) === n;
const gcd = (m, n) => {
    if (m < n) return gcd(n, m);
    if (m < 0) return gcd(-m, n);
    if (n < 0) return gcd(m, -n);
    return n === 0 ? m : gcd(n, m % n);
}
const nearlyEquals = (a, b) => (0 | a*1e6) / 1e6 === (0 | b*1e6) / 1e6;
const nearlyEqualsZero = n => nearlyEquals(n, 0);
export {sign, abs, isInteger, gcd, nearlyEqualsZero, nearlyEquals};
