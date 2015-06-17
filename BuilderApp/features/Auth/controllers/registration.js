angular.module('Builder').controller('RegistrationCtrl', ['$scope', '$http', '$log', '$location', 'AuthSvc', function ($scope, $http, $log, $location, AuthSvc) {
    $scope.agree = false;
    $scope.user = {
        FirstName: '',
        LastName: '',
        UserName: '',
        Email: '',
        Password: '',
        ConfirmPassword: ''
    };
    $scope.register = function () {
        // Password matching expression. Password must be at least 4 characters, no more than 8 characters, 
        // and must include at least one upper case letter, one lower case letter, and one numeric digit.
        // ^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$
        if ($scope.registrationForm.$valid) {
            $http.post('/api/Account/Register', $scope.user).
              success(function (data, status, headers, config) {
                  $location.path('/');
              }).
              error(function (data, status, headers, config) {
                  $log.error("RegistrationCtrl.register error. Status=" + status);
              });
        }
        else {
            alert('not valid');
        }
    };
    $scope.signIn = function () {
    };
}]);