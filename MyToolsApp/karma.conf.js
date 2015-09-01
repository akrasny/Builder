module.exports = function (config) {
    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['mocha'],
        files: [
            "bower_components/angular/angular.js",
            "bower_components/angular-route/angular-route.js",
            "bower_components/angular-input-match/dist/angular-input-match.js",
            "node_modules/chai/chai.js",

            //"features/**/*.js",
            //"scripts/app/app.js",
            //"scripts/app/directives/*.js",
            //"scripts/app/services/*.js",
            "test/**/*.js"

        ],
        singleRun: true,
        reporters: ['mocha']
    });
}