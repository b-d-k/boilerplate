module.exports = function() {
  var sourceDir = './src';
  var distDir = './dist';
  var tempDir = './.tmp';

  var jsDir = '/js';
  var sassDir = '/scss';
  var cssDir = '/css'

  var config = {
    // make available in Gulpfile
    distDir: distDir,
    tempDir: tempDir,

    // html
    htmlSourceDir: sourceDir + '/**/*.html',

    // js
    jsSourceDir: sourceDir + jsDir + '/**/*.js',
    jsTempDir: tempDir + jsDir,
    jsDistDir: distDir + jsDir,

    // styles
    sassSourceDir: sourceDir + sassDir +  '/**/*.scss',
    cssTempDir: tempDir + cssDir,
    cssDistDir: distDir + cssDir,
    sassDistDir: distDir + sassDir,
  }

  return config;
}
