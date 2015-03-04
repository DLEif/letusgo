'use strict';
var gulp = require('gulp');
var less = require('gulp-less');
var jade = require('gulp-jade');
var del = require('del');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('less_compiler', function () {

  return gulp.src('public/styles/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('.tmp/styles'));
});


gulp.task('jade_compiler', function(){

    return gulp.src('public/**/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('.tmp/'))
});

gulp.task('clean', require('del').bind(null, ['.tmp']));
gulp.task('serve', ['less_compiler', 'jade_compiler'], function() {

  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', 'public'],
      routes: {
        '/node_modules': 'node_modules',
        '/bower_components': 'bower_components',
        '/images': 'images'
      }
    }
  });

  gulp.watch([
    '.tmp/**/*.html',
    'public/styles/**/*.less',
    'public/javascripts/**/*.js',
    'public/**/*.jade'

  ]).on('change', reload);

  gulp.watch('public/styles/**/*.less', ['less_compiler', reload]);
  gulp.watch('public/views/**/*.jade', ['jade_compiler', reload]);
});