var gulp = require('gulp');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
var uglify = require('gulp-uglify');
var clean = require('gulp-clean-css');
gulp.task('sass', function() {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
})

gulp.task('watch', function() {
    return gulp.watch('./src/scss/**/*.scss', gulp.series('sass'))
})

gulp.task('server', function() {
    return gulp.src('src')
        .pipe(webserver({
            port: 9809,

        }))
})

gulp.task('dev', gulp.series('sass', 'server', 'watch'))

gulp.task('coyJS', function() {
    return gulp.src('./src/js/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
})

gulp.task('coyCss', function() {
    return gulp.src('./src/css/**/*.css')
        .pipe(clean())
        .pipe(gulp.dest('./dist/css'))
})

gulp.task('build', gulp.parallel('coyJS', 'coyCss'))