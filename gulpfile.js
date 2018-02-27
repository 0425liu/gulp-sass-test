var gulp = require('gulp');
var sass = require("gulp-sass-china");
var browserSync = require('browser-sync').create();
var sourcemaps = require('gulp-sourcemaps');
var path = require('path');
var autoprefixer = require('gulp-autoprefixer');
var css = path.join("./src/css");
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./"
    });
    gulp.watch("./src/sass/*.sass", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});
gulp.task('sass', function() {
    return gulp.src("./src/sass/*.sass")
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
        }))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest(css))
        .pipe(browserSync.stream());
})
gulp.task('default', ['serve']);