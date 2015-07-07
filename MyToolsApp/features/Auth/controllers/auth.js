angular.module('MyTools').controller('AuthCtrl', ['$scope', 'AuthSvc', '$location', 'AppCfg', function ($scope, AuthSvc, $location, AppCfg) {
    var cfg = AppCfg.configuration;
    $scope.authenticated = AuthSvc.isAuthenticated;
    $scope.logout = function () {
        sessionStorage.removeItem(cfg.tokenKey);
    }
}]);