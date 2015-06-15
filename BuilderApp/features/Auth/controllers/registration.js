angular.module('Builder').controller('RegistrationCtrl', ['$scope', '$http', '$log', 'AuthSvc', 'AppCfg', function ($scope, $http, $log, AuthSvc, AppCfg) {
    $scope.agree = false;
    $scope.firstName = '';
    $scope.lastName = '';
    $scope.displayName = '';
    $scope.email = '';
    $scope.password = '';
    $scope.confirmPassword = '';
    $scope.register = function () {
        $http.get('/api/values').
          success(function (data, status, headers, config) {
              $log.log("Log Msg");
              $log.info("Info Msg");
              $log.debug("Debug Msg");
              $log.warn("Warn Msg");
              $log.error("Error Msg");
          }).
          error(function (data, status, headers, config) {
          });
    };
    $scope.signIn = function () {
    };
}]);