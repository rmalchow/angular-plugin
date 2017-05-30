var gulp = require('gulp');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var watch = require('gulp-watch');

var target = "dist";

gulp.task('build', function() {
    return gulp.src(
    		[
    			'src/main/js/module.js',
    			'src/main/js/src/**/*.js'
    		]
    	)
        .pipe(concat('js/angular-plugin.js'))
        .pipe(gulp.dest(target));
	}
);

gulp.task('clean', function () {
    return gulp.src('./dist/', {read: false}).pipe(clean());
});

gulp.task('default', ['build']);

gulp.task('watch', ['build'], function () {
    gulp.watch("src/**/*.js", ['build']);
    gulp.watch("src/**/*.html", ['build']);
});