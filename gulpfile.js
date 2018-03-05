const gulp = require('gulp');
const compilerPackage = require('google-closure-compiler');
const closureCompiler = compilerPackage.gulp();

compilerPackage.compiler.JAR_PATH = undefined;
compilerPackage.compiler.prototype.javaPath = './node_modules/.bin/closure-gun';

const rename = require("gulp-rename");
const gzip = require('gulp-gzip');

gulp.task('minify', () => {
    closureCompiler({
        js: './dist/canvas.js',
        compilation_level: 'SIMPLE',
        language_in: 'ECMASCRIPT6_STRICT',
        language_out: 'ECMASCRIPT5_STRICT',
        js_output_file: 'canvas.min.js'
    }).src()
    .pipe(gulp.dest('./dist/'));

    closureCompiler({
        js: './dist/unitary.js',
        compilation_level: 'SIMPLE',
        language_in: 'ECMASCRIPT6_STRICT',
        language_out: 'ECMASCRIPT5_STRICT',
        js_output_file: 'unitary.min.js'
    }).src()
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
