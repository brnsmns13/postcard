'use strict';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')();

gulp.task('css', function () {
    return gulp.src('static/css/main.scss')
        .pipe($.rubySass({
            style: 'expanded',
            precision: 10,
            loadPath: ['bower_components']
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('js', function () {
    return gulp.src('static/js/app.jsx')
        .pipe($.browserify({
            insertGlobals: true,
            transform: ['reactify']
        }))
        .pipe(gulp.dest('dist'));
    });

gulp.task('clean', function () {
    return gulp.src(['dist'], {read: false}).pipe($.clean());
});

gulp.task('build', ['css', 'js', 'bower']);

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

gulp.task('bower', function() {
    gulp.src('./bower_components/**/*.js').pipe(gulp.dest('dist/bower_components'));
});

gulp.task('watch', ['build'], function () {
    gulp.watch('static/css/**/*.scss', ['css']);
    gulp.watch('static/js/**/*.jsx', ['js']);
});
