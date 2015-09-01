module.exports = function (config) {
    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['mocha'],
        files: [
            "node_modules/angular/angular.js",
            "node_modules/angular-route/angular-route.js",
            "node_modules/angular-input-match/dist/angular-input-match.js",
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