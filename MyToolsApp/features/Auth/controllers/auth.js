angular.module('Builder').controller('AuthCtrl', ['$scope', 'AuthSvc', function ($scope, AuthSvc) {
    var tokenKey = 'accessToken';
    $scope.authenticated = AuthSvc.isAuthenticated();
}]);