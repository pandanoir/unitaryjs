var gulp = require('gulp');
var closureCompiler = require('gulp-closure-compiler');
var rename = require("gulp-rename");
var gzip = require('gulp-gzip');

gulp.task('minify', function() {
    gulp.src('./dist/canvas.js')
    .pipe(closureCompiler({
        // compilerPath: './bower_components/closure-compiler/compiler.jar',
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
        // compilerPath: './bower_components/closure-compiler/compiler.jar',
        fileName: 'unitary.min.js',
        compilerFlags: {
            compilation_level: 'SIMPLE_OPTIMIZATIONS',
            language_in: 'ECMASCRIPT5_STRICT',
            warning_level: 'QUIET'
        }
    }))
    .pipe(gulp.dest('./dist/'))
    .pipe(gzip()).pipe(gulp.dest('./dist/'));

    gulp.src('./dist/unitary.js')
    .pipe(rename('unitary.browser.js'))
    .pipe(gulp.dest('./dist'));

    gulp.src('./dist/unitary.min.js')
    .pipe(rename('unitary.browser.min.js'))
    .pipe(gulp.dest('./dist'));

    gulp.src('./dist/unitary.min.js.gz')
    .pipe(rename('unitary.browser.min.js.gz'))
    .pipe(gulp.dest('./dist'));
});
gulp.task('default', ['minify']);
