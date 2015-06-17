'use strict';

var app = angular.module('MyTools', ['ngRoute']);

//config routs 
app.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/registration', {
            templateUrl: 'features/Auth/templates/registration.htm',
            controller: 'RegistrationCtrl'
        });
  }]);

//AppCfg service
app.value('AppCfg', {});

// Cache the app configuration file in AppCfg service
app.config(['AppCfgProvider', function (AppCfgProvider) {
    $.ajax({
        method: "GET",
        url: "app.json",
        dataType: 'json',
        async: false
    }).done(function (appCfg) {
        var cfg = angular.fromJson(appCfg);
        AppCfgProvider.$get().configuration = cfg;
    }).fail(function (jqXHR, textStatus) {
        alert("AppCfgProvider failed: " + textStatus);
    });
}]);

// Get base url for ajax requests from the file and use an interceptor to build the full url
app.config(['$httpProvider', '$provide', 'AppCfgProvider',
  function ($httpProvider, $provide, AppCfgProvider) {
    var cfg = AppCfgProvider.$get().configuration;

    $provide.factory('baseURLInterceptor', function () {
        return {
            request:
                function (config) {
                    var api = config.url.indexOf('api/') == 0,
                        slashApi = config.url.indexOf('/api/') == 0;

                    if (api) {
                        config.url = cfg.webApiURL + '/' + config.url;
                    }
                    else {
                        if (slashApi) {
                            config.url = cfg.webApiURL + config.url;
                        }
                    }
                    return config;
                }
        };
    });

    $httpProvider.interceptors.push('baseURLInterceptor');

  }]);

//extend logging
app.config(['$provide', '$logProvider', 'AppCfgProvider', function ($provide, $logProvider, AppCfgProvider) {
    var cfg = AppCfgProvider.$get().configuration;

    $logProvider.debugEnabled(true);

    $provide.decorator('$log', ['$delegate', function ($delegate) {
        var orig = {
            log: $delegate.log,
            info: $delegate.info,
            debug: $delegate.debug,
            warn: $delegate.warn,
            error: $delegate.error
        };

        var getDateString = function () {
            var dt = new Date();
            return [dt.getUTCFullYear(), ':', dt.getUTCMonth(), ':', dt.getUTCDate(), ' - ',
                    dt.getUTCHours(), ':', dt.getUTCMinutes(), ':', dt.getUTCSeconds(), '.',
                    dt.getUTCMilliseconds()].join('');
        },

        logFn = function (name) {
            $delegate[name] = function () {
                if (cfg.clientLogging[name]) {
                    var args = [].slice.call(arguments);
                    args[0] = (cfg.clientLogging.insertDate ? getDateString() + ' Message: ' : '') + args[0];

                    orig[name].apply(null, args);
                }
            }
        };

        logFn('log');
        logFn('info');
        logFn('debug');
        logFn('warn');
        logFn('error');

        return $delegate;
    }]);
}]);
