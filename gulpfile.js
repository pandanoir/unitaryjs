var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var ts = require('gulp-tsc');
var closureCompiler = require('gulp-closure-compiler');
var gzip = require('gulp-gzip');

gulp.task('browserify', ['compile'], function() {
    return browserify({
        entries: ['./src/browser.js']
    }).bundle().pipe(source('unitary.browser.js')).pipe(gulp.dest('./dist'));
});
gulp.task('compile', function() {
    return gulp.src('src/unitary.ts')
        .pipe(ts())
        .pipe(gulp.dest('dist'));
});
gulp.task('canvas', function() {
    return browserify({
        entries: ['./src/canvas.js']
    }).bundle().pipe(source('canvas.js')).pipe(gulp.dest('./dist'));
});
gulp.task('minify', function(cb) {
    gulp.src('./dist/canvas.js')
    .pipe(closureCompiler({
        compilerPath: './bower_components/closure-compiler/compiler.jar',
        fileName: 'canvas.min.js',
        compilerFlags: {
            compilation_level: 'SIMPLE_OPTIMIZATIONS',
            language_in: 'ECMASCRIPT5_STRICT'
        }
    }))
    .pipe(gulp.dest('./dist/'))
    .pipe(gzip()).pipe(gulp.dest('./dist/'));

    gulp.src('./dist/unitary.js')
    .pipe(closureCompiler({
        compilerPath: './bower_components/closure-compiler/compiler.jar',
        fileName: 'unitary.min.js',
        compilerFlags: {
            compilation_level: 'SIMPLE_OPTIMIZATIONS',
            language_in: 'ECMASCRIPT5_STRICT'
        }
    }))
    .pipe(gulp.dest('./dist/'))
    .pipe(gzip()).pipe(gulp.dest('./dist/'));

    gulp.src('./dist/unitary.browser.js')
    .pipe(closureCompiler({
        compilerPath: './bower_components/closure-compiler/compiler.jar',
        fileName: 'unitary.browser.min.js',
        compilerFlags: {
            compilation_level: 'SIMPLE_OPTIMIZATIONS',
            language_in: 'ECMASCRIPT5_STRICT'
        }
    }))
    .pipe(gulp.dest('./dist/'))
    .pipe(gzip()).pipe(gulp.dest('./dist/'));
});
gulp.task('default', ['browserify', 'canvas', 'minify']);
