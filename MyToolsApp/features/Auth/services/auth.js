angular.module('MyTools').factory('AuthSvc', ['$http', function ($http) {
    //private variables
    var tokenKey = 'accessToken';

    //private methods
    var isAuthenticated = function () {
        return sessionStorage.getItem(tokenKey) ? true : false;
    },
    signIn = function (username, password, cb) {
        $http({
            method: 'POST',
            url: '/Token',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'X-Requested-With': 'XMLHttpRequest'
            },
            data: 'grant_type=password&username=' + encodeURIComponent(username) +
                '&password=' + encodeURIComponent(password)
        }).
          success(function (data, status, headers, config) {
              if (cb && cb.success) {
                  cb.success(data, status, headers, config);
              }
          }).
          error(function (data, status, headers, config) {
              if (cb && cb.error) {
                  cb.error(data, status, headers, config);
              }
          }).finally(function () {
              if (cb && cb.finished) {
                  cb.finished();
              }
          });
    }

    //public methods
    return {
        isAuthenticated: isAuthenticated,
        signIn: signIn
    }
}]);