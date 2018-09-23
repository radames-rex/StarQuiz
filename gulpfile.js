// 'use strict';
//
// var gulp = require('gulp'),
//   sass = require('gulp-sass'),
//   concat = require('gulp-concat'),
//   clean = require('gulp-concat'),
//   server = require('gulp-server-livereload'),
//   port = 8080;
//
// // Compila Sass para Css
// gulp.task('sass', function() {
//   return gulp.src([
//       'app/stylesheets/sass/reset.scss',
//       'app/stylesheets/sass/layout.scss',
//       'app/stylesheets/sass/fonts.scss',
//       'app/stylesheets/sass/header.scss',
//       'app/stylesheets/sass/**/*.scss',
//       'app/stylesheets/sass/footer.scss'
//     ])
//     .pipe(concat('app.scss'))
//     .pipe(sass().on('error', sass.logError))
//     .pipe(gulp.dest('app/stylesheets/'));
// });
//
// // Transpila ES6 para JS
// // gulp.task('babel', () => {
// //   return gulp.src('scripts/**/*.js')
// //     .pipe(babel({
// //         presets: ['es2015']
// //     }))
// //     .pipe(concat('app.js'))
// //     .pipe(gulp.dest('scripts/'));
// // });
//
// // Observa mudanças para fazer reload
// gulp.task('watch', function() {
//   gulp.watch('app/stylesheets/sass/**/*.scss', ['sass']);
//   // gulp.watch('scripts/**/*.js', ['babel'])
// });
//
// // Inicia o servidor
// gulp.task('default', ['watch'], function() {
//   gulp.src('app/')
//     .pipe(server({
//       livereload: true,
//       open: true,
//       port: port
//     }));
// });

/**
 *  As tarefas são divididas em vários arquivos no diretório gulp
 *  porque colocar tudo aqui fica muito extenso.
 */

'use strict';

var fs = require('fs');
var gulp = require('gulp');

/**
 *  Isso irá carregar todos os arquivos js ou coffee no diretório gulp.
 */
fs.readdirSync('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file);
});


/**
 *  Default, limpa diretórios temporários
 *  e carrega a tarefa de build otimizado.
 */
gulp.task('default', ['clean'], function() {
  gulp.start('build');
});
