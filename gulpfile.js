"use strict";

// Load plugins
const autoprefixer = require("gulp-autoprefixer");
const browsersync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const gulp = require("gulp");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
const concat = require('gulp-concat');
const babel = require('gulp-babel');

// BrowserSync
function browserSync(done) {
  browsersync.init({
    proxy: "http://drupal9.localhost"
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
  return gulp
    .src("./scss/**/*.scss")
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
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest("./css"))
    .pipe(browsersync.stream());
}

// JS task
function js() {
  return gulp
    .src([
      './js/**/*.js',
      '!./js/*.min.js',
      // './node_modules/jquery/dist/jquery.js', // we load jquery in Drupal
      './node_modules/popper.js/dist/popper.js',
      './node_modules/bootstrap/dist/js/bootstrap.js'
    ])
    .pipe(concat({
      path: 'main.js'
    }))
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
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./js'))
    .pipe(browsersync.stream());
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
