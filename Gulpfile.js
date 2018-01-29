var gulp        = require('gulp')
  , prefix      = require('gulp-autoprefixer')
  , gulpHelp    = require('gulp-help')
  , sass        = require('gulp-sass')
  , sourcemaps  = require('gulp-sourcemaps')
  , sprite      = require('gulp-svg-sprite')
  , browserSync = require('browser-sync').create()

gulp = gulpHelp(gulp)


//------------------------------------------------------------------------------
// Path configs

var src = {
    scss     : 'style/scss/**/*.scss'
  , scssMain : 'style/scss/main.scss'
  , svg      : 'assets/svg/**/*.svg'
}

var build = {
    css : 'build/css'
    , js  : 'build/js'    
    , svg : 'build/svg'
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

gulp.task('svg', function () {
  config = {
    shape         : {
      dest        : './raw'
    },
    mode          : {
      inline      : true,
      "symbol"    : {
        "sprite"  : "styleguide.svg"
      }
    }
  }

gulp.src(src.svg)
      .pipe(sprite(config)
        .on('error', function(e){ console.error(e) }))
      .pipe(gulp.dest(build.svg))
})

gulp.task('build', ['scss', 'svg'])



//------------------------------------------------------------------------------
// Watch tasks

// Watch All the Things
gulp.task('watch', ['build'], function() {
  gulp.watch(src.scss, ['scss'])
  gulp.watch(src.svg + '**/*.svg', ['svg'])
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