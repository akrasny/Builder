angular.module('MyTools').controller('LoginCtrl', ['$scope', '$http', '$log', '$location', 'AuthSvc', function ($scope, $http, $log, $location, AuthSvc) {
    $scope.rememberMe = false;
    $scope.submitted = false;
    $scope.submitInProgress = false;
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
        $scope.submitted = true;
        if ($scope.loginForm.$valid) {
            $scope.submitInProgress = true;
            //$http.post('/api/Account/Register', $scope.user).
            //  success(function (data, status, headers, config) {
            //      $location.path('/');
            //  }).
            //  error(function (data, status, headers, config) {
            //      $log.error("RegistrationCtrl.register error. Status=" + status);
            //  }).finally(function () {
            //      $scope.submitInProgress = false;
            //  });;
        }
    };

}]);
