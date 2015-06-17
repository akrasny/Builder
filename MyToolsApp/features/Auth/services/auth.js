angular.module('MyTools').factory('AuthSvc', function () {
    //private variables
    var tokenKey = 'accessToken';

    //private methods
    var isAuthenticated = function () {
        return sessionStorage.getItem(tokenKey) ? true : false;
    }

    //public methods
    return {
        isAuthenticated: isAuthenticated
    }
});