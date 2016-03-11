var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var ts = require('gulp-tsc');
var closureCompiler = require('gulp-closure-compiler');
var gzip = require('gulp-gzip');
var replace = require('gulp-replace');

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
        entries: ['./src/canvasBrowser.js']
    }).bundle().pipe(source('canvas.js')).pipe(gulp.dest('./dist'));
});
gulp.task('minify', ['browserify', 'canvas'], function(cb) {
    gulp.src('./dist/canvas.js')
    .pipe(closureCompiler({
        compilerPath: './bower_components/closure-compiler/compiler.jar',
        fileName: 'canvas.min.js',
        compilerFlags: {
            compilation_level: 'SIMPLE_OPTIMIZATIONS',
            language_in: 'ECMASCRIPT5_STRICT',
            warning_level: 'QUIET'
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
            language_in: 'ECMASCRIPT5_STRICT',
            warning_level: 'QUIET'
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
            language_in: 'ECMASCRIPT5_STRICT',
            warning_level: 'QUIET'
        }
    }))
    .pipe(gulp.dest('./dist/'))
    .pipe(gzip()).pipe(gulp.dest('./dist/'));
});
gulp.task('version', function(cb) {
    gulp.src('./src/unitary.ts')
        .pipe(replace(/^export var VERSION = .+$/m, "export var VERSION = '" + require('./package.json').version + "';"))
        .pipe(gulp.dest('./src'));
});
gulp.task('default', ['minify']);
