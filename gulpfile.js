const gulp = require('gulp');
const imageMin = require('gulp-imagemin');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const htmlReplace = require('gulp-html-replace');
const uglify = require('gulp-uglify');
const usemin = require('gulp-usemin');
const cssmin = require('gulp-cssmin');
const browserSync = require('browser-sync');
const jshint = require('gulp-jshint');
const jshintStyle = require('jshint-stylish');
const cssLint = require('gulp-csslint');
const autoPrefixer = require('gulp-autoprefixer')

gulp.task('copy', ['clean'], function() {
	return gulp.src('src/**/*').pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
	return gulp.src('dist').pipe(clean());
});

gulp.task('build-img', function() {
	gulp.src('dist/img/**/*').pipe(imageMin()).pipe(gulp.dest('dist/img'));
});

// gulp.task('build-js', function() {
// 	gulp.src(['dist/js/jquery.js', 'dist/js/home.js', 'dist/js/produto.js'])
// 		.pipe(concat('all.js'))
// 		.pipe(uglify())
// 		.pipe(gulp.dest('dist/js'));
// });

// gulp.task('build-html', function() {
// 	gulp.src('dist/**/*.html')
// 		.pipe(htmlReplace({
// 			js: 'js/all.js'
// 		}))
// 		.pipe(gulp.dest('dist'));
// });

gulp.task('usemin', function() {
	gulp.src('dist/**/*.html')
		.pipe(usemin({
			'js': [uglify],
			'css': [cssmin]
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('server', function() {
	browserSync.init({
		server: {
			baseDir: 'src'
		}
	});

	gulp.watch('src/js/*.js').on('change', function (event){
		gulp.src(event.path)
			.pipe(jshint())
			.pipe(jshint.reporter(jshintStyle));
	});

	gulp.watch('src/css/*.css').on('change', function (event){
		gulp.src(event.path)
			.pipe(cssLint())
			.pipe(jshint.reporter());
	});

	gulp.watch('src/**/*').on('change', browserSync.reload);
});


gulp.task('default', ['copy'], function() {
	gulp.start('build-img', 'usemin');
});
