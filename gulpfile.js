const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const browserify = require('browserify');
const watchify = require('watchify');
const reactify = require('reactify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const browserSync = require('browser-sync');
const {server} = require('./config');
const path = require('path');

let optionsPublic = {
  entries: './src/js/public/app.js',
  cache: {},
  packageCache: {},
  transform: [reactify],
  fullPaths: true,
  debug: true,
};
let bundlerPublic = watchify(browserify(optionsPublic));

const bundlePublic = () => {
  let loadMaps = true;
  return bundlerPublic
    .bundle()
    .on('error', () => {})
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps }))
    .pipe(sourcemaps.write(path.join(__dirname, '/public/js/')))
    .pipe(gulp.dest(path.join(__dirname, '/public/js/')));
};
bundlerPublic.on('update', bundlePublic);
bundlerPublic.on('log', console.log);

let optionsAdmin = {
  entries: './src/js/admin/app.js',
  cache: {},
  packageCache: {},
  transform: [reactify],
  fullPaths: true,
  debug: true,
};
let bundlerAdmin = watchify(browserify(optionsAdmin));

const bundleAdmin = () => {
  let loadMaps = true;
  return bundlerAdmin
    .bundle()
    .on('error', () => {})
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps }))
    .pipe(sourcemaps.write(path.join(__dirname, '/admin/js/')))
    .pipe(gulp.dest(path.join(__dirname, '/admin/js/')));
};
bundlerAdmin.on('update', bundleAdmin);
bundlerAdmin.on('log', console.log);

gulp.task('default', () => {
  browserSync.init({
    'proxy': 'localhost:' + server.port
  });
  bundlePublic();
  bundleAdmin();
  gulp.watch('./src/scss/**/*.scss', ['sass', 'reload']);
  gulp.watch('./src/js/public/*.js', ['compilePublic']);
  gulp.watch('./src/js/admin/*.js', ['compileAdmin']);
  gulp.watch('./**/*.html', ['reload']);
  gulp.watch('./public/app.js', ['reload']);
  gulp.watch('./public/main.css', ['reload']);
});

gulp.task('compilePublic', bundlePublic);
gulp.task('compileAdmin', bundleAdmin);

gulp.task('sass', () => {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS({ compatibility: 'ie11' }))
    .pipe(gulp.dest('./public/'));
});

gulp.task('reload', () => {
  browserSync.reload();
});
