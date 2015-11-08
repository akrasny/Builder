angular.module('MyTools').controller('LocalBookCtrl', ['$scope', '$log', 'zip', function ($scope, $log, zip) {
    $scope.path = '';
    $scope.files = null;
    $scope.filesSelected = function (files) {
        $scope.files = files;
    }
    $scope.read = function () {
        zip.read($scope.files[0]);
    }
}]);