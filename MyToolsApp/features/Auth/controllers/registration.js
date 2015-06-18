angular.module('MyTools').controller('RegistrationCtrl', ['$scope', '$http', '$log', '$location', 'AuthSvc', 'UtilsSvc', function ($scope, $http, $log, $location, AuthSvc, UtilsSvc) {
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

// Register strict-password directive
angular.module('MyTools').config(['UtilsSvcProvider', function (UtilsSvcProvider) {
    UtilsSvcProvider.$get().createValidationRule('strictPassword', /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/);
}]);