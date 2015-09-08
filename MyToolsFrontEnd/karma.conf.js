module.exports = function (config) {
    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['mocha'],
        files: [
            "node_modules/angular/angular.js",
            "node_modules/angular-route/angular-route.js",
            "node_modules/angular-validation-match/dist/angular-validation-match.js",
            "node_modules/chai/chai.js",

            "features/Auth/services/auth.js",
            //"features/**/*.js",
            "scripts/app/app.js",
            //"scripts/app/directives/*.js",
            //"scripts/app/services/*.js",
            "test/features/Auth/unit/**/*.js"

        ],
        singleRun: true,
        reporters: ['mocha']
    });
}