var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');
var runSequence = require('run-sequence');
var cleanCSS = require('gulp-clean-css');
var injectPartials = require('gulp-inject-partials');
var browserSync = require('browser-sync').create();

//compiling sass
gulp.task('sass', function() {
  return gulp.src('app/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream:true
    }))
});

//browsersync
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
});

//minify css
gulp.task('minify-css', function() {
  return gulp.src('app/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css/'));
});

// move
gulp.task('move', function() {
  gulp.src('app/*.html')
    .pipe(gulp.dest('dist'))
  gulp.src('app/css/*.css')
    .pipe(gulp.dest('dist/css'))
  gulp.src('app/img/*')
    .pipe(gulp.dest('dist/img'))
  gulp.src('app/js/*.js')
    .pipe(gulp.dest('dist/js'))
  gulp.src('app/json/*.js')
    .pipe(gulp.dest('dist/json'));
  gulp.src('app/pdf/*')
    .pipe(gulp.dest('dist/pdf'));
});

//injecting partials
gulp.task('inject', function () {
  return gulp.src('app/*.html')
    .pipe(injectPartials())
    .pipe(gulp.dest('./app'));
});

gulp.task('clean:dist', function() {
  return del.sync('dist');
});

//watching
gulp.task('watch', ['browserSync', 'sass'], function() {
  gulp.watch('app/scss/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/*.js', browserSync.reload);
});

gulp.task('build', function(callback) {
  runSequence('clean:dist', ['sass', 'move', 'minify-css'], callback);
});
