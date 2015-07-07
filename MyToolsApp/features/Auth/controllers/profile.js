angular.module('MyTools').controller('ProfileCtrl', ['$scope', 'AppCfg', 'AuthSvc', function ($scope, AppCfg, AuthSvc) {
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
        Phone: '',
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

    $scope.isPhoneInvalid = function () {
        return ($scope.registrationForm.phone.$invalid &&
               $scope.registrationForm.phone.$dirty &&
               $scope.registrationForm.phone.$touched) ||
               ($scope.submitted &&
               $scope.registrationForm.phone.$invalid);
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

            AuthSvc.checkUsername(username, {
                success: function (data) {
                    $scope.usernameExists = data;
                },
                error: function (data, status) {
                    $log.error("ProfileCtrl.checkUsername error. Status=" + status);
                },
                finished: function () {
                    $scope.usernameCheckInProgress = false;
                }
            });
        }
    };

    $scope.checkEmail = function (email) {
        if ($scope.registrationForm.email.$valid) {
            $scope.emailCheckInProgress = true;

            AuthSvc.checkEmail(email, {
                success: function (data) {
                    $scope.emailExists = data;
                },
                error: function (data, status) {
                    $log.error("ProfileCtrl.checkEmail error. Status=" + status);
                },
                finished: function () {
                    $scope.emailCheckInProgress = false;
                }
            });
        }
    };

    $scope.save = function () {
        var cfg = AppCfg.configuration;
        $scope.submitted = true;
    };

    $scope.cancel = function () {
    };
}]);