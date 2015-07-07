angular.module('MyTools').controller('LoginCtrl', ['$scope',  '$log', '$location', 'AuthSvc', 'AppCfg', function ($scope, $log, $location, AuthSvc, AppCfg) {
    $scope.rememberMe = false;
    $scope.submitted = false;
    $scope.submitInProgress = false;
    $scope.isServerError = false;
    $scope.serverErrorDescription = '';
    $scope.user = {
        UserName: '',
        Password: ''
    };

    $scope.isUserNameInvalid = function () {
        return $scope.loginForm.user_name.$invalid &&
               $scope.loginForm.user_name.$dirty &&
               $scope.loginForm.user_name.$touched ||
               ($scope.submitted &&
               $scope.loginForm.user_name.$invalid);
    };

    $scope.isPasswordInvalid = function () {
        return ($scope.loginForm.password.$invalid &&
               $scope.loginForm.password.$dirty &&
               $scope.loginForm.password.$touched) ||
               ($scope.submitted &&
               $scope.loginForm.password.$invalid);
    };

    $scope.signIn = function () {
        var cfg = AppCfg.configuration;
        $scope.submitted = true;
        $scope.isServerError = false;
        if ($scope.loginForm.$valid) {
            $scope.submitInProgress = true;

            AuthSvc.signIn($scope.user.UserName, $scope.user.Password, {
                success: function (data) {
                    sessionStorage.setItem(cfg.tokenKey, data.access_token);
                    $location.path('/');
                },
                error: function (data, status) {
                    $scope.isServerError = true;
                    $scope.serverErrorDescription = data && data.error_description ? data.error_description : 'Error occurred';
                    $log.error("LoginCtrl.signIn error. Status=" + status);
                },
                finished: function () {
                    $scope.submitInProgress = false;
                }
            });
        }
    };

}]);
