var gulp = require('gulp'),
    watch = require('gulp-watch'),
    nodemon = require('gulp-nodemon'),

    bundle_script = require('./gulp-tasks/bundle-script'),
    bundle_style = require('./gulp-tasks/bundle-style'),
    script_compress = require('./gulp-tasks/script-compress'),

    config = {
        public_path: 'public/',
        assets_path: 'public/assets/',

        scripts_start_point: 'public/coffee/app.js',
        server_start_point: 'app.coffee',

        server_scripts_sources: 'protected/*.js',
        scripts_sources: 'public/coffee/**/*.js',
        styles_sources: 'public/sass/**/*.scss',

        bundle_script_name: '~.js',
        bundle_style_name: '~.css',

        bundle_min_script_name: '~.min.js',
        bundle_min_style_name: '~.min.css'
    };

gulp.task('bundle-script', bundle_script({
    bundle_name: config.bundle_script_name,
    src: config.scripts_start_point,
    dest: config.assets_path
}));
gulp.task('compress-script', script_compress({
    filename: config.bundle_min_script_name,
    src: config.assets_path + config.bundle_script_name,
    dest: config.assets_path
}));
gulp.task('bundle-style', bundle_style({
    src: config.styles_sources,
    dest: config.assets_path,
    config: {
        //outputStyle: 'compressed'
    }
}));

gulp.task('build', function() {
    gulp.run([
        'bundle-script',
        'compress-script',
        'bundle-style'
    ]);
});

gulp.task('public-files-watch', function() {
    gulp.watch(config.scripts_sources, [
        'bundle-script',
        'compress-script'
    ]);
    gulp.watch(config.styles_sources, [
        'bundle-style'
    ]);
});
gulp.task('nodemon', function() {
    nodemon({
        script: config.server_start_point,
        watch: config.server_scripts_sources,
        ext: 'js'
    });
});
gulp.task('default', [
    'public-files-watch',
    'nodemon'
]);
