var gulp = require('gulp');
var browserSync = require('browser-sync');

gulp.task('serve-test', function () {
    browserSync.init({
        notify: false,
        port: 8081,
        server: {
            baseDir: ['test'],
            routes: {
                '/bower_components': 'bower_components',
                '/features': 'features',
                '/test': 'test',
                '/scripts': 'scripts',
                '/app.json': 'app.json'
            }
        }
    });

    gulp.watch(['app/**/*.*']).on('change', browserSync.reload);
});