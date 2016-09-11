// build dependencies
var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var cleanCSS = require('gulp-clean-css');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var reactify = require('reactify');
var browserify = require('browserify');
var watchify = require('watchify');
var livereload = require('gulp-livereload');
var es = require('event-stream');
var glob = require('glob');
var mkdirp = require('mkdirp');

//system libs
var fs = require('fs');
var path = require('path')

var sourceRoot = './src/client';
var sourcePublic = sourceRoot + '/public';
var sourceTemplates = sourceRoot + '/templates';
var buildRoot = './build/resources/main';
var buildPublic = buildRoot + '/public';
var buildTemplates = buildRoot + '/templates';

if (!fs.existsSync(buildPublic)){
	mkdirp(buildPublic);
}

gulp.task('js', function() {
	return bundleJs(false);
});

gulp.task('sass', function() {
	return gulp.src(sourcePublic + '/sass/*.scss')
	.pipe(sass({ style: 'expanded' }))
	.pipe(cleanCSS({compatibility: 'ie8'}))
	.pipe(rename({ suffix: '.min' }))	
	.pipe(gulp.dest(buildPublic + '/css'))
	.pipe(livereload());
});

gulp.task('css', function() {
	return gulp.src(sourcePublic + '/css/*.css')	
	.pipe(gulp.dest(buildPublic + '/css'))
	.pipe(livereload());
});

gulp.task('html', function() {
	return gulp.src(sourceTemplates + '/*.html')            
	.pipe(gulp.dest(buildTemplates))
	.pipe(livereload());
});

gulp.task('classes', function() {
	livereload({quiet:true});
});

gulp.task('classes-bin', function() {
	return gulp.src('./bin/**/*.class')            
	.pipe(gulp.dest('./build/classes/main'))
	.pipe(livereload({quiet:true}));
});

gulp.task('watch', function() {
	livereload.listen();
	gulp.watch(sourceTemplates + '/*.html', ['html']);
	gulp.watch(sourcePublic + '/sass/*.scss', ['sass']);
	gulp.watch(sourcePublic + '/css/*.css', ['css']);  
	bundleJs(true)
	//gulp.watch('./build/classes/main/**/*.class', ['classes'])	
	gulp.watch('./bin/**/*.class', ['classes-bin'])	//helper for eclipse
});

gulp.task('setup', ['js', 'html', 'sass', 'css']);

function bundleJs(watch) {
	return bundleOne(watch);
}

function bundleOne(watch) {
	return glob(sourcePublic + '/js/app-**.js', function(err, files) {
		var tasks = files.map(function(entry) {
			return bundleIntoOne([entry], path.basename(entry), watch)
		})
		return es.merge(tasks);
	})
}

function bundleIntoOne(files, destination, watch) {

	gutil.log('Bundling');

	var props = watchify.args;
	props.debug = true;
	props.entries = files;

	var bundler = watch ? watchify(browserify(props)) : browserify(props);
	bundler.transform(reactify)
	function rebundle() {
		var startTime = new Date().getTime();		
		return bundler
		.bundle()
		.pipe(source(destination))
		.pipe(gulp.dest(buildPublic + '/js'))			
		.on('end', function (options) {
			var time = (new Date().getTime() - startTime) / 1000;
			gutil.log('Browserified in: ' + time + 's');
		});		
	}

	//	this is for watchify
	bundler.on('update', function(f) {
		gutil.log('Rebundling [' + f + ']');
		rebundle();
	});

	gutil.log('Done bundling');
	return rebundle();
}