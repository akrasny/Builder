angular.module('MyTools').controller('RegistrationCtrl', ['$scope', '$http', '$log', '$location', 'AuthSvc', function ($scope, $http, $log, $location, AuthSvc) {
    $scope.agree = false;
    $scope.submitted = false;
    $scope.submitInProgress = false;
    $scope.emailCheckInProgress = false;
    $scope.usernameCheckInProgress = false;
    $scope.inProgress = function () {
        return $scope.emailCheckInProgress || $scope.usernameCheckInProgress || $scope.submitInProgress;
    };
    $scope.user = {
        FirstName: '',
        LastName: '',
        UserName: '',
        Email: '',
        Password: '',
        ConfirmPassword: ''
    };
    $scope.emailExists = false;
    $scope.usernameExists = false;

    $scope.isFirstNameInvalid = function () {
        return ($scope.registrationForm.first_name.$invalid &&
               $scope.registrationForm.first_name.$dirty &&
               $scope.registrationForm.first_name.$touched) ||
               ($scope.submitted &&
               $scope.registrationForm.first_name.$invalid);
    };

    $scope.isLastNameInvalid = function () {
        return ($scope.registrationForm.last_name.$invalid &&
               $scope.registrationForm.last_name.$dirty &&
               $scope.registrationForm.last_name.$touched) ||
               ($scope.submitted &&
               $scope.registrationForm.last_name.$invalid);
    };

    $scope.isUserNameInvalid = function () {
        return $scope.registrationForm.user_name.$invalid &&
               $scope.registrationForm.user_name.$dirty &&
               $scope.registrationForm.user_name.$touched ||
               ($scope.submitted &&
               $scope.registrationForm.user_name.$invalid);
    };

    $scope.isEmailInvalid = function () {
        return ($scope.registrationForm.email.$invalid &&
               $scope.registrationForm.email.$dirty &&
               $scope.registrationForm.email.$touched) ||
               ($scope.submitted &&
               $scope.registrationForm.email.$invalid);
    };

    $scope.isPasswordInvalid = function () {
        return ($scope.registrationForm.password.$invalid &&
               $scope.registrationForm.password.$dirty &&
               $scope.registrationForm.password.$touched) ||
               ($scope.submitted &&
               $scope.registrationForm.password.$invalid);
    };

    $scope.isConfirmPasswordInvalid = function () {
        return ($scope.registrationForm.password_confirmation.$error.match &&
               $scope.registrationForm.password_confirmation.$dirty &&
               $scope.registrationForm.password_confirmation.$touched) ||
               ($scope.submitted &&
               $scope.registrationForm.password_confirmation.$error.match);
    };

    $scope.checkUsername = function (username) {
        if ($scope.registrationForm.user_name.$valid) {
            $scope.usernameCheckInProgress = true;
            $http.get('/api/Account/UsernameExists', { params: { username: username } }).
              success(function (data, status, headers, config) {
                 $scope.usernameExists = data
              }).
              error(function (data, status, headers, config) {
                  $log.error("RegistrationCtrl.checkUsername error. Status=" + status);
              }).finally(function () {
                  $scope.usernameCheckInProgress = false;
              });;
        }
    };

    $scope.checkEmail = function (email) {
        $log.info(email);
        if ($scope.registrationForm.email.$valid) {
            $scope.emailCheckInProgress = true;
            $http.get('/api/Account/EmailExists', { params: { email: email } }).
              success(function (data, status, headers, config) {
                  $scope.emailExists = data;
              }).
              error(function (data, status, headers, config) {
                  $log.error("RegistrationCtrl.checkEmail error. Status=" + status);
              }).finally(function () {
                  $scope.emailCheckInProgress = false;
              });;
        }
    };

    $scope.register = function () {
        $scope.submitted = true;
        if ($scope.registrationForm.$valid && !$scope.emailExists && !$scope.usernameExists) {
            $scope.submitInProgress=true;
            $http.post('/api/Account/Register', $scope.user).
              success(function (data, status, headers, config) {
                  $location.path('/');
              }).
              error(function (data, status, headers, config) {
                  $log.error("RegistrationCtrl.register error. Status=" + status);
              }).finally(function () {
                  $scope.submitInProgress = false;
              });;
        }
    };

    $scope.signIn = function () {
    };

}]);
