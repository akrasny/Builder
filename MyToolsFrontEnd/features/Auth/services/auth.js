angular.module('MyTools').factory('AuthSvc', ['$http', function ($http) {
    //private variables
    var tokenKey = 'accessToken';

    //private methods
    var isAuthenticated = function () {
        return sessionStorage.getItem(tokenKey) ? true : false;
    },
    _signIn = function (username, password) {
        return $http({
            method: 'POST',
            url: '/Token',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'X-Requested-With': 'XMLHttpRequest'
            },
            data: 'grant_type=password&username=' + encodeURIComponent(username) +
                '&password=' + encodeURIComponent(password)
        });
    },
    signIn = function (username, password, cb) {
        handleHttpPromises(cb, _signIn(username, password));
    },
    handleHttpPromises = function (cb, p) {
        p.success(function (data, status, headers, config) {
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
    },
    checkUsername = function (username, cb) {
        handleHttpPromises(cb, $http.get('/api/Account/UsernameExists', { params: { username: username } }));
    },
    checkEmail = function (email, cb) {
        handleHttpPromises(cb, $http.get('/api/Account/EmailExists', { params: { email: email } }));
    },
    register = function (user, cbRegister, cbSignIn) {
        $http.post('/api/Account/Register', user).
          success(function (data, status, headers, config) {
              if (cbRegister && cbRegister.success) {
                  cbRegister.success(data, status, headers, config);
              }
              handleHttpPromises(cbSignIn, _signIn(user.UserName, user.Password));
          }).
          error(function (data, status, headers, config) {
              if (cbRegister && cbRegister.error) {
                  cbRegister.error(data, status, headers, config);
              }
          });
    }

    //public methods
    return {
        isAuthenticated: isAuthenticated,
        register: register,
        signIn: signIn,
        checkUsername: checkUsername,
        checkEmail: checkEmail
    }
}]);