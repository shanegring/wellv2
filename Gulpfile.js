var gulp        = require('gulp')
  , prefix      = require('gulp-autoprefixer')
  , gulpHelp    = require('gulp-help')
  , sass        = require('gulp-sass')
  , sourcemaps  = require('gulp-sourcemaps')
  , browserSync = require('browser-sync').create()

gulp = gulpHelp(gulp)


//------------------------------------------------------------------------------
// Path configs

var src = {
    scss     : 'style/scss/**/*.scss'
  , scssMain : 'style/scss/main.scss',
}

var build = {
    css : 'build/css'
}


//------------------------------------------------------------------------------
// Build tasks

gulp.task('scss', 'compiles scss', function() {
  return gulp.src(src.scssMain)
    .pipe(sass({outputStyle: 'expanded' }).on('error', sass.logError))
    .pipe(prefix({browsers: ['last 2 versions']}))
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(gulp.dest(build.css))
    .pipe(browserSync.stream())
})


gulp.task('build', ['scss'])

//------------------------------------------------------------------------------
// Watch tasks

// Watch All the Things
gulp.task('watch', ['build'], function() {
  gulp.watch(src.scss, ['scss'])
})


// Serve the page builders at localhost:3000 and reload/recompile on changes
gulp.task('default', ['watch'], function() {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  })

  gulp.watch('**/*.html').on('change', browserSync.reload)
})