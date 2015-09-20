'use strict';

var app = angular.module('MyTools', ['ngRoute', 'validation.match']);

//config routs 
app.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/registration', {
            templateUrl: 'features/Auth/templates/registration.htm',
            controller: 'RegistrationCtrl'
        }).when('/login', {
            templateUrl: 'features/Auth/templates/login.htm',
            controller: 'LoginCtrl'
        }).when('/profile', {
            templateUrl: 'features/Auth/templates/profile.htm',
            controller: 'ProfileCtrl'
        });
  }]);

//AppCfg service
app.value('AppCfg', {});

// Cache the app configuration file in AppCfg service
app.config(['AppCfgProvider', function (AppCfgProvider) {
    AppCfgProvider.$get().configuration = {
            "webApiURL": "http://localhost:53333",
            "clientLogging":
                {
                    "log": true,
                    "info": true,
                    "debug": true,
                    "warn": true,
                    "error": true,
                    "insertDate": false
                },
            "tokenKey": "accessToken"
    }
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

// Get base url for ajax requests from the file and build the full url, add Authorization header
app.config(['$httpProvider', '$provide', 'AppCfgProvider',
  function ($httpProvider, $provide, AppCfgProvider) {
    var cfg = AppCfgProvider.$get().configuration;

    $provide.factory('modifyReqInterceptor', ['$q', '$location', function ($q, $location) {
        return {
            request:
                function (config) {
                    var api = config.url.indexOf('api/') == 0,
                        slashApi = config.url.indexOf('/api/') == 0,
                        tkn = config.url.indexOf('/Token') == 0;

                    if (tkn) {
                        config.url = cfg.webApiURL + '/Token';
                    }
                    else {
                        if (api || slashApi) {
                            var token = sessionStorage.getItem(cfg.tokenKey);

                            if (token) {
                                config.headers.Authorization = 'Bearer ' + token;
                            }

                            if (api) {
                                config.url = cfg.webApiURL + '/' + config.url;
                            }
                            else {
                                config.url = cfg.webApiURL + config.url;
                            }
                        }
                    }

                    return config;
                },
            responseError: function (rejection) {
                if (rejection.status === 401) {
                    var token = sessionStorage.getItem(cfg.tokenKey);
                    if (token) {
                        sessionStorage.removeItem(cfg.tokenKey);
                        $location.path('/login');
                    }
                }
                return $q.reject(rejection);
            }
        };
    }]);

    $httpProvider.interceptors.push('modifyReqInterceptor');
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
