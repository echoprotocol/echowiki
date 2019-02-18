const gulp           = require('gulp');
const browserSync    = require('browser-sync').create();
const postcss        = require('gulp-postcss');
const sorting 	     = require('postcss-sorting');
const reporter       = require('postcss-reporter');
const syntax_scss    = require('postcss-scss');
const stylelint      = require('stylelint');
const minify 		 = require('gulp-minify');
const cssmin         = require('gulp-cssmin');
const imagemin       = require('gulp-imagemin');
const autoprefixer   = require('gulp-autoprefixer');
const sass           = require('gulp-sass');
const concat         = require('gulp-concat');
const reload         = browserSync.reload;

var src = {
	html     :   'app/**/*.html',
	scss     :   'app/scss/style.scss',
	fonts    :   'app/fonts/**/*.*',
	img      :   'app/img/**/*.*',
	js       :   'app/js'
};

var dist = {
	root	 :	 'dist/',
	css		 :	 'dist/css/',
	js	     :	 'dist/js',
	img		 :   'dist/img',
	fonts	 : 	 'dist/fonts',
}

var watch = {
	scss	 :   'app/scss/**/*.scss',
	js		 :   'app/js/**/*.js',
	html 	 :   'app/**/*.html',
	img  	 :   'app/img/**/*.*'
}

gulp.task('run',
  [

    'concat-js',
	'scss-lint',
    'html',
    'fonts-dist',
	'img-min',
	'watch'	
  ], function() {
  browserSync.init({
    server: "./dist"
  });
});

gulp.task("watch", ["watch:scss", "watch:html", "watch:js", "watch:img"]);

gulp.task('watch:scss', function(){
	gulp.watch(watch.scss, ['scss']);
});

gulp.task('watch:html', function(){
	gulp.watch(watch.html, ['html']);
});

gulp.task('watch:js', function(){
	gulp.watch(watch.js, ['concat-js']);
});

gulp.task('watch:img', function(){
	gulp.watch(watch.img, ['img-min']);
});


gulp.task('html', function () {
  gulp.src(src.html)
	  .pipe(gulp.dest(dist.root))
	  .pipe(reload({stream: true }));
});

gulp.task('scss-sorting', function () {
	return gulp.src('./app/scss/*.scss').pipe(
		postcss([sorting()])
	).pipe(
		gulp.dest('./app/scss')
	);
});

gulp.task("scss-lint", function() {

	var processors = [
	  stylelint(),
	  reporter({
		clearMessages: true,
		throwError: true
	  })
	];
  
	return gulp.src(
		[
			'./app/scss/**/*.scss',
			// Ignore linting vendor assets
			// '!scss/vendors/**/*.scss'
		]
	  )
	  .pipe(postcss(processors, {syntax: syntax_scss}))
	  .on('end', function() {
		gulp.start('scss')
	  });
});

// Converting scss files to css files
gulp.task('scss', function(){
  return gulp.src(src.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(dist.css))
    .on('end', function() {
    	gulp.start('autopref')
    });
});

// css autoprefixer
gulp.task('autopref', function() {
  gulp.src(dist.css + '**/*.css')
  .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
  }))
  .pipe(gulp.dest(dist.css))
  .on('end', function() {
    gulp.start('minify-css')
  });
});

// css minimization
gulp.task('minify-css', function(){
  return gulp.src(dist.css + '**/*.css')
    .pipe(cssmin())
    .pipe(gulp.dest(dist.css))
    .pipe(reload({stream: true }));    
});


// js concat

gulp.task('concat-js', function() {
	return gulp.src
	  ([
		  src.js+'/libs/jquery.min.js',
		  src.js+'/main.js'
	  ])
	  .pipe(concat('main.js'), {newLine: ';'})
	  .pipe(gulp.dest(dist.js))
	  .on('end', function() {
		gulp.start('minify-js')
	  });
});

// js minimization

gulp.task('minify-js', function() {
	gulp.src('dist/js/main.js')
		.pipe(minify({
			ext:{
				min:'.min.js'
			},
			ignoreFiles: ['.min.js']
		}))
		.pipe(gulp.dest(dist.js))
		.pipe(reload({stream: true }));

});

// img minimization
gulp.task('img-min', function() {
  gulp.src(src.img)
  .pipe(imagemin())
  .pipe(gulp.dest(dist.img));
});

gulp.task('fonts-dist', function() {
  	gulp.src(src.fonts)
	.pipe(gulp.dest(dist.fonts))
	.pipe(reload({stream: true }));
});

gulp.task('default', ['run']);