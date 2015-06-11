angular.module('Builder').controller('RegistrationCtrl', ['$scope', '$http', 'AuthSvc', function ($scope, $http, AuthSvc) {
    $scope.agree = false;
    $scope.firstName = '';
    $scope.lastName = '';
    $scope.displayName = '';
    $scope.email = '';
    $scope.password = '';
    $scope.confirmPassword = '';
    $scope.register = function () {
        //var data = {
        //    Email: self.registerEmail(),
        //    Password: self.registerPassword(),
        //    ConfirmPassword: self.registerPassword2()
        //};

        $http.get('/api/values').
          success(function (data, status, headers, config) {
              // this callback will be called asynchronously
              // when the response is available
          }).
          error(function (data, status, headers, config) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
          });

        //$.ajax({
        //    type: 'POST',
        //    url: '/api/Account/Register',
        //    contentType: 'application/json; charset=utf-8',
        //    data: JSON.stringify(data)
        //}).done(function (data) {
        //    self.result("Done!");
        //}).fail(showError);
    };
    $scope.signIn = function () {
    };
}]);