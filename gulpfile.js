const gulp = require('gulp');
const closureCompiler = require('gulp-closure-compiler');
const rename = require("gulp-rename");
const gzip = require('gulp-gzip');

gulp.task('minify', () => {
    const flags = {
            compilation_level: 'SIMPLE_OPTIMIZATIONS',
            language_in: 'ECMASCRIPT6_STRICT',
            language_out: 'ECMASCRIPT5_STRICT',
            warning_level: 'QUIET'
        };
    gulp.src('./dist/canvas.js')
    .pipe(closureCompiler({
        fileName: 'canvas.min.js',
        compilerFlags: flags
    }))
    .pipe(gulp.dest('./dist/'))
    .pipe(gzip()).pipe(gulp.dest('./dist/'));

    gulp.src('./dist/unitary.js')
    .pipe(closureCompiler({
        fileName: 'unitary.min.js',
        compilerFlags: flags
    }))
    .pipe(gulp.dest('./dist/'))
    .pipe(gzip()).pipe(gulp.dest('./dist/'))
    .on('end', () => {
        const files = ['unitary.browser.js', 'unitary.browser.min.js', 'unitary.browser.min.js.gz'];
        for (const file of files) {
        gulp.src('./dist/' + file.replace('.browser', ''))
            .pipe(rename(file))
            .pipe(gulp.dest('./dist'));
        }
    });
});
gulp.task('default', ['minify']);
