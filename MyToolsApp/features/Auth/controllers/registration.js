angular.module('MyTools').controller('RegistrationCtrl', ['$scope', '$log', '$location', 'AuthSvc', 'AppCfg', 'CommonUtilsSvc', function ($scope, $log, $location, AuthSvc, AppCfg, CommonUtilsSvc) {
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
                    $log.error("RegistrationCtrl.checkUsername error. Status=" + status);
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
                    $log.error("RegistrationCtrl.checkEmail error. Status=" + status);
                },
                finished: function () {
                    $scope.emailCheckInProgress = false;
                }
            });
        }
    };

    $scope.register = function () {
        var cfg = AppCfg.configuration;
        $scope.submitted = true;
        if ($scope.registrationForm.$valid && !$scope.emailExists && !$scope.usernameExists) {
            $scope.submitInProgress = true;
            $scope.isServerError = false;

            AuthSvc.register($scope.user, { //on register
                success: function () {
                    $scope.submitInProgress = true;
                },
                error: function (data, status) {
                    $scope.submitInProgress = false;
                    $scope.isServerError = true;
                    $scope.serverErrorDescription = data && data.error_description ? data.error_description : 'Registration failed';
                    $log.error("RegistrationCtrl.register error. Status=" + status);
                }
            }, { //on sign in
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
            })
        }
    };
}]);
