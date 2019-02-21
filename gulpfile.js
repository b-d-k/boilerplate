///
// Gulp build file.
// Run `gulp` to process scss, copy files,
// and start a server at http://localhost:8080/ which displays the html in /guide
///

var gulp = require('gulp'),
    autoprefixer = require('autoprefixer'),
    babel = require('gulp-babel'),
    cssnano = require('cssnano'),
    del = require('del'),
    http = require('http'),
    livereload = require('gulp-livereload'),
    lost = require('lost'),
    postcss = require('gulp-postcss'),
    runSequence = require('run-sequence'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    st = require('st');

var config = require('./gulp.config')();


// Deletes all files in .tmp directory
gulp.task('clearTemp', function() {
  console.log('>>> Clearing Temp Dir');
  return del([config.tempDir + '/**/*']);
});

// Deletes all files in dist directory
gulp.task('clearDist', function() {
  console.log('>>> Clearing Dist Dir');
  return del([config.distDir + '/**/*']);
});

// JS temp tasks
gulp.task('jsTemp', function() {
  return gulp
    .src(config.jsSourceDir)
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(gulp.dest(config.jsTempDir))
    .pipe( livereload() );
});

// JS dist tasks
gulp.task('jsDist', function() {
  return gulp
    .src(config.jsSourceDir)
    .pipe(gulp.dest(config.jsDistDir));
});

// HTML temp tasks
gulp.task('htmlTemp', function() {
  return gulp
    .src(config.htmlSourceDir)
    .pipe(gulp.dest(config.tempDir))
    .pipe(livereload());
});

// HTML dist tasks
gulp.task('htmlDist', function() {
  return gulp
    .src(config.htmlSourceDir)
    .pipe(gulp.dest(config.distDir));
});

// Sass temp tasks
gulp.task('sassTemp', function() {
  return gulp
    .src(config.sassSourceDir)
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(
      postcss([
        lost(),
        autoprefixer(),
      ])
    )
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.cssTempDir))
    .pipe(livereload());
});

// Sass dist tasks
gulp.task('sassDist', function() {
  return gulp
    .src(config.sassSourceDir)
    .pipe(sass().on('error', sass.logError))
    .pipe(
      postcss([
        lost(),
        autoprefixer(),
        cssnano() // minify
      ])
    )
    .pipe(gulp.dest(config.cssDistDir));
});

// Watches for changes, triggers tasks
gulp.task('watch', ['server'], function() {
  livereload.listen();
  gulp.watch(config.htmlSourceDir, ['htmlTemp']);
  gulp.watch(config.jsSourceDir, ['jsTemp']);
  gulp.watch(config.sassSourceDir, ['sassTemp']);
});

// Move package json file to dist
gulp.task('movePackageJsonToDist', function() {
  return gulp
    .src('package.json')
    .pipe(gulp.dest(config.distDir));
});

// Run Server
gulp.task('server', function(done) {
  var mount = st({
    path: __dirname + '/.tmp',
    url: '/',
    cache: false,
    index: 'index.html',
  });
  http
    .createServer(function(req, res) {
      var stHandled = mount(req, res);
      if (stHandled) return;
      else res.end('this is not a static file');
    })
    .listen(8080, done);
  console.log('>>> Server starting on port 8080');
});


// Builds, puts stuff into dist dir
gulp.task('build', function(done) {
  runSequence('clearDist', ['sassDist', 'htmlDist', 'jsDist', 'movePackageJsonToDist'], function() {
    console.log(
      '|￣￣￣￣￣￣￣￣￣￣|\n' +
        '| Build complete!    |\n' +
        '| Files are in "dist |\n' +
        '|＿＿＿ _＿＿＿＿＿＿|\n' +
        '(\\__/) || \n' +
        '(•ㅅ•) || \n' +
        '/ 　 づ  '
    );
    done();
  });
});

// Default puts stuff into temp dir, runs server and watches/livereloads
gulp.task('default', function(done) {
  runSequence('clearTemp', ['sassTemp', 'htmlTemp', 'jsTemp', 'watch'], function() {
    console.log(
      '  =^..^=   =^..^=   =^..^=   =^..^=\n' +
       'Gulp server, watch running. Code away \n' +
      '~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~'
    );
    done();
  });
});
