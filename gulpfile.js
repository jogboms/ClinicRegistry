const gulp = require('gulp'),
    zip = require('gulp-zip'),
    sass = require('gulp-ruby-sass'),
    changed = require('gulp-changed'),
    webserver = require('gulp-webserver');


// watch for changes and run the relevant task
gulp.task('watch', () => {
  gulp.watch('src/**/**/*.scss', ['scss']);
});

// move dependencies into dist dir
gulp.task('deps', () => {
  gulp.src('depends/**/*.*').pipe(gulp.dest('src/library'));
});

// move nw files into dist dir
gulp.task('nw', () => {
  gulp.src('src/nw/*.*').pipe(gulp.dest('dist'));
});

// serve the dist dir
gulp.task('serve', () => gulp.src('dist').pipe(webserver({
  // open: true,
  port: 1000,
  // port: Math.floor(Math.random()*1000)+1000,
  livereload: true
})));

// transpile scss
gulp.task('scss', () => {
  sass('src/scss/**/*.scss')
    .on('error', sass.logError)
    .pipe(changed('src/scss/**/*.scss'))
    .pipe(gulp.dest('src/library/css'));
});

// zip distribution folder
const date = new Date(), timestamp = date.getFullYear()+''+(date.getMonth()+1)+''+date.getDate()+'-'+date.getHours()+''+date.getMinutes()+''+date.getSeconds();
gulp.task('zip:commit:dist', () => gulp.src('dist/**/*').pipe(zip('build-dist-'+timestamp+'.zip')).pipe(gulp.dest('build/dist')));
gulp.task('zip:commit:src', () => gulp.src('src/**/*').pipe(zip('build-src-'+timestamp+'.zip')).pipe(gulp.dest('build/src')));
gulp.task('zip', () => gulp.src('dist/**/*').pipe(zip('build.zip')).pipe(gulp.dest('build')));
