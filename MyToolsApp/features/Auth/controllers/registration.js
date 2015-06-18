angular.module('MyTools').controller('RegistrationCtrl', ['$scope', '$http', '$log', '$location', 'AuthSvc', function ($scope, $http, $log, $location, AuthSvc) {
    $scope.agree = false;
    $scope.inProgress = false;
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
