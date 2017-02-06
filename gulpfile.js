var gulp = require('gulp'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('autoprefixer'),
    livereload = require('gulp-livereload'),
    lost = require('lost');

var paths = {
  cssSource: 'css/',
  cssDestination: 'css/'
};


gulp.task('sass', function(){
  return gulp.src(paths.cssSource + 'main.scss')
    .pipe( sass().on('error', sass.logError) )
    .pipe(gulp.dest(paths.cssDestination));
});


gulp.task('postcss', function() {
  return gulp.src(paths.cssSource + '**/*.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([
      lost(),
      autoprefixer()
    ]))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(paths.cssDestination))
    .pipe( livereload() );
});

gulp.task('html', function(){
  return gulp.src('*.html')
    .pipe( livereload() );
});


gulp.task('watch', function() {
  livereload.listen();
  gulp.watch(paths.cssSource + '**/*.scss', ['sass']);
  gulp.watch(paths.cssSource + '**/*.css', ['postcss']);
  gulp.watch('*.html', ['html']);
});


gulp.task('default', ['sass', 'watch']);
