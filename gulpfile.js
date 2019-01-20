const gulp = require('gulp');
const typescript = require('gulp-typescript');
const tsProject = typescript.createProject('tsconfig.json');
const uglify = require('gulp-uglify-es').default;

gulp.task('development', () => {
    return tsProject.src()
        .pipe(tsProject())
        .js
        .pipe(gulp.dest(tsProject.options.outDir));
});

gulp.task('production', () => {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(uglify())
        .pipe(gulp.dest(tsProject.options.outDir));
});
