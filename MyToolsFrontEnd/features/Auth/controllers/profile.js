angular.module('MyTools').controller('ProfileCtrl', ['$scope', 'AppCfg', 'AuthSvc', 'CommonUtilsSvc', function ($scope, AppCfg, AuthSvc, CommonUtilsSvc) {
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
        return CommonUtilsSvc.isFieldInalid($scope.submitted, $scope.registrationForm.first_name);
    };

    $scope.isLastNameInvalid = function () {
        return CommonUtilsSvc.isFieldInalid($scope.submitted, $scope.registrationForm.last_name);
    };

    $scope.isUserNameInvalid = function () {
        return CommonUtilsSvc.isFieldInalid($scope.submitted, $scope.registrationForm.user_name);
    };

    $scope.isEmailInvalid = function () {
        return CommonUtilsSvc.isFieldInalid($scope.submitted, $scope.registrationForm.email);
    };

    $scope.isPhoneInvalid = function () {
        return CommonUtilsSvc.isFieldInalid($scope.submitted, $scope.registrationForm.phone);
    };

    $scope.isPasswordInvalid = function () {
        return CommonUtilsSvc.isFieldInalid($scope.submitted, $scope.registrationForm.password);
    };

    $scope.isConfirmPasswordInvalid = function () {
        return CommonUtilsSvc.isFieldInalid($scope.submitted, $scope.registrationForm.password_confirmation);
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