var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var ts = require('gulp-tsc');

gulp.task('default', function() {
    return browserify({
        entries: ['./src/browser.js']
    }).bundle().pipe(source('unitary.browser.js')).pipe(gulp.dest('./dist'));
});
gulp.task('compile', function() {
    return gulp.src('src/unitary.ts')
        .pipe(ts())
        .pipe(gulp.dest('dist'));
});
