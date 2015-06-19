angular.module('MyTools').controller('RegistrationCtrl', ['$scope', '$http', '$log', '$location', 'AuthSvc', function ($scope, $http, $log, $location, AuthSvc) {
    $scope.agree = false;
    $scope.inProgress = false;
    $scope.user = {
        FirstName: '',
        LastName: '',
        UserName: '',
        Email: '',
        Password: '',
        ConfirmPassword: '',
        isPasswordInvalid: function () {
            return $scope.registrationForm.password.$invalid && !$scope.registrationForm.password.$pristine && $scope.registrationForm.password.$touched;
        },
        isConfirmPasswordInvalid: function () {
            return $scope.registrationForm.password.$valid && $scope.registrationForm.password.$dirty && $scope.registrationForm.password_confirmation.$dirty
                                       && $scope.registrationForm.password_confirmation.$touched && $scope.user.Password != $scope.user.ConfirmPassword;
        }
    };

    $scope.register = function () {
        if ($scope.registrationForm.$valid) {
            $scope.inProgress = true;
            $http.post('/api/Account/Register', $scope.user).
              success(function (data, status, headers, config) {
                  $location.path('/');
              }).
              error(function (data, status, headers, config) {
                  $log.error("RegistrationCtrl.register error. Status=" + status);
              }).finally(function () {
                  $scope.inProgress = false;
              });;
        }
        else {
            alert('not valid');
        }
    };
    $scope.signIn = function () {
    };
}]);
