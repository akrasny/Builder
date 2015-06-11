'use strict';

var app = angular.module('Builder', ['ngRoute']);

app.config(['$routeProvider',
  function ($routeProvider) {
      $routeProvider.
        when('/registration', {
            templateUrl: 'features/Auth/templates/registration.htm',
            controller: 'RegistrationCtrl'
        });
  }]);

app.value('Globals', {
        webApiURL: 'http://localhost:43555'
    }
);

app.config(['$httpProvider', '$provide', 'GlobalsProvider',
  function ($httpProvider, $provide, globals) {
      $provide.factory('baseURLInterceptor', function () {
          return {
              request:
                  function (config) {
                      var api = config.url.indexOf('api/') == 0,
                          slashApi = config.url.indexOf('/api/') == 0;

                      var g = globals.$get();

                      if (api)
                      {
                          config.url = g.webApiURL + '/' + config.url;
                      }
                      else
                      {
                          if (slashApi) {
                              config.url = g.webApiURL + config.url;
                          }
                      }
                      return config;
                  }
          };
      });

      $httpProvider.interceptors.push('baseURLInterceptor');
  }]);
