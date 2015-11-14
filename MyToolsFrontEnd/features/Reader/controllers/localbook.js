angular.module('MyTools').controller('LocalBookCtrl', ['$scope', '$log', '$sce', 'zip', function ($scope, $log, $sce, zip) {
    $scope.path = '';
    $scope.files = null;
    $scope.zipContent = null;
    $scope.filesSelected = function (files) {
        $scope.files = files;
    }
    $scope.read = function () {
        var book = new Book(new ZipFileHandler($scope.files[0]));
        book.open();
        //zip.read($scope.files[0], function (res) {
        //    $scope.zipContent = $sce.trustAsHtml(res);
        //    $scope.$apply();
        //});
    }
}]);