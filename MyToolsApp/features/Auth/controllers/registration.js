angular.module('MyTools').controller('RegistrationCtrl', ['$scope', '$http', '$log', '$location', 'AuthSvc', 'AppCfg', function ($scope, $http, $log, $location, AuthSvc, AppCfg) {
    $scope.agree = false;
    $scope.submitted = false;
    $scope.submitInProgress = false;
    $scope.isServerError = false;
    $scope.serverErrorDescription = '';
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
        var cfg = AppCfg.configuration;
        $scope.submitted = true;
        if ($scope.registrationForm.$valid && !$scope.emailExists && !$scope.usernameExists) {
            $scope.submitInProgress = true;
            $scope.isServerError = false;

            $http.post('/api/Account/Register', $scope.user).
              success(function (data, status, headers, config) {
                  $scope.submitInProgress = true;
                  AuthSvc.signIn($scope.user.UserName, $scope.user.Password, {
                      success: function (data) {
                          sessionStorage.setItem(cfg.tokenKey, data.access_token);
                          $location.path('/');
                      },
                      error: function (data, status) {
                          $scope.isServerError = true;
                          $scope.serverErrorDescription = data && data.error_description ? data.error_description : 'Sign In failed';
                          $log.error("RegistrationCtrl.signIn error. Status=" + status);
                      },
                      finished: function () {
                          $scope.submitInProgress = false;
                      }
                  });
              }).
              error(function (data, status, headers, config) {
                  $scope.submitInProgress = false;
                  $scope.isServerError = true;
                  $scope.serverErrorDescription = data && data.error_description ? data.error_description : 'Registration failed';
                  $log.error("RegistrationCtrl.register error. Status=" + status);
              });
        }
    };

    $scope.signIn = function () {
    };

}]);
