"use strict";

// Load plugins
const autoprefixer = require("gulp-autoprefixer");
const browsersync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const gulp = require("gulp");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify-es").default;
const gulpif = require('gulp-if');
const lazypipe = require('lazypipe');
const sourcemaps = require("gulp-sourcemaps");
const concat = require('gulp-concat');
const babel = require('gulp-babel');

// BrowserSync
function browserSync(done) {
  browsersync.init({
    proxy: "http://drupal.szpitalstaszow.localhost"
  });
  done();
}

// BrowserSync reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// CSS task
function css() {
  const productionCss = lazypipe()
    .pipe(rename, {
      suffix: ".min"
    })
    .pipe(cleanCSS)
    .pipe(gulp.dest, "./css")

  return gulp
    .src('./src/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass({
      outputStyle: "expanded",
      includePaths: "./node_modules",
    }))
    .on("error", sass.logError)
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest("./css"))
    .pipe(gulpif(process.env.NODE_ENV === 'production', productionCss()))
    .pipe(browsersync.stream());
}

// JS task
function js() {
  const productionJs = lazypipe()
    .pipe(rename, {
      suffix: '.min'
    })
    .pipe(sourcemaps.init)
    .pipe(uglify)
    .pipe(sourcemaps.write) // Inline source maps.
    .pipe(gulp.dest, './js')

  return gulp
    .src([
      './src/js/**/*.js',
      './node_modules/bootstrap/dist/js/bootstrap.js'
    ])
    .pipe(babel({
      presets: [
        [
          '@babel/env',
          {
            modules: "umd"
          }
        ]
      ]
    }))
    .pipe(gulp.dest('./js'))
    .pipe(gulpif(process.env.NODE_ENV === 'production', productionJs()))
    .pipe(browsersync.stream())
}

// Watch files
function watchFiles() {
  gulp.watch("./scss/**/*", css);
  gulp.watch(["./js/**/*", "!./js/**/*.min.js"], js);
  gulp.watch("./**/*.html.twig", browserSyncReload);
}

// Define complex tasks
const build = gulp.parallel(css, js)
const watch = gulp.series(build, gulp.parallel(watchFiles, browserSync));

// Export tasks
exports.css = css;
exports.js = js;
exports.build = build;
exports.watch = watch;
exports.default = build;
