'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

var browserSync = require('browser-sync').create();

gulp.task('sass', function() {
  gulp.src('./docs/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./docs'))
    .pipe(browserSync.stream());

  gulp.src('eq-sass.scss')
    .pipe(sass())
    .pipe(gulp.dest('./'))
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./docs/"
    }
  });

  gulp.watch('./**/*.scss', ['sass']);
  gulp.watch("./docs/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync'])
