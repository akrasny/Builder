var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    KarmaServer = require('karma').Server,
    server = require('gulp-live-server');

gulp.task('serve', function () {
    browserSync.init({
        notify: false,
        port: 8080,
        server: {
            baseDir: [''],
            routes: {
                './node_modules': 'node_modules'
            }
        }
    });

    gulp.watch(['./**/*.*']).on('change', browserSync.reload);
});

gulp.task('serve-test', function () {
    browserSync.init({
        notify: false,
        port: 8081,
        server: {
            baseDir: ['test', ''],
            routes: {
                './node_modules': 'node_modules'
            }
        }
    });

    gulp.watch(['./**/*.*']).on('change', browserSync.reload);
});

gulp.task('test-browser', function () {
    new KarmaServer({
        configFile: __dirname + '/karma.conf.js'
    }).start();
});

gulp.task('server', function () {
    var live = new server('server.js');
    live.start();
});