angular.module('MyTools').controller('AuthCtrl', ['$scope', 'AuthSvc',  'AppCfg', function ($scope, AuthSvc, AppCfg) {
    var cfg = AppCfg.configuration;
    $scope.authenticated = AuthSvc.isAuthenticated;
    $scope.logout = function () {
        sessionStorage.removeItem(cfg.tokenKey);
    }
}]);