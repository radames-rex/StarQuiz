'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var eslint = require('gulp-eslint');

var pathSrcHtml = [
  path.join(conf.paths.src, '/**/*.html')
];

var pathSrcJs = [
  path.join(conf.paths.src, '/**/!(*.spec).js')
];

function runLint () {
  gulp.task('lint', () => {
    return gulp.src(['**/*.js','!node_modules/**'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
  });
}

gulp.task('lint', ['scripts'], function(done) {
  runLint();
});
