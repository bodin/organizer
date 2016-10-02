// build dependencies
var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var cleanCSS = require('gulp-clean-css');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
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

var production = (process.env.NODE_ENV === 'production');

gulp.task('js-app', function() {
	return bundleJs(false);
});

gulp.task('sass', function() {
	
	var scss = {
		style: 'expanded',
	    includePaths: ['./node_modules/bootstrap-sass/assets/stylesheets']		  
	};
	
	return gulp.src(sourcePublic + '/sass/*.scss')
	.pipe(sass(scss))
	.pipe(cleanCSS({compatibility: 'ie8'}))
	.pipe(rename({ suffix: '.min' }))	
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
	bundleJs(true)
	gulp.watch('./bin/**/*.class', ['classes-bin'])	//helper for eclipse
});

gulp.task('setup', ['js-app', 'html', 'sass', 'vendor']);

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
	
	bundler.transform(babelify, {presets: ["es2015", "react"]})	
	
	bundler.external('material-ui');
	
	function rebundle() {
		var startTime = new Date().getTime();		
		return bundler
		.bundle()
		.on("error", function(err) {
			gutil.log(err.toString());
        })
		.on('end', function (options) {
			var time = (new Date().getTime() - startTime) / 1000;
			gutil.log('Browserified in: ' + time + 's');
		})
		.pipe(source(destination))
		.pipe(gulp.dest(buildPublic + '/js'))
		.pipe(livereload())
		;		
	}

	//	this is for watchify
	bundler.on('update', function(f) {
		gutil.log('Rebundling [' + f + ']');
		rebundle();
	});

	gutil.log('Done bundling');
	return rebundle();
}

