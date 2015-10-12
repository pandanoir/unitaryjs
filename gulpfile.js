var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

gulp.task('default', function() {
    return browserify({
        entries: ['./src/browser.js']
    }).bundle().pipe(source('unitary.browser.js')).pipe(gulp.dest('./dist'));
});
