angular.module('MyTools').controller('LocalBookCtrl', ['$scope', '$log', '$sce', 'zip', function ($scope, $log, $sce, zip) {
    $scope.path = '';
    $scope.files = null;
    $scope.zipContent = null;
    $scope.filesSelected = function (files) {
        $scope.files = files;
    }
    $scope.read = function () {
        var zipFileHandler = new SmartEpub.ZipFileHandler($scope.files[0]),
            book = new SmartEpub.Book(zipFileHandler);

        zipFileHandler.openZip(function () {
            //$scope.zipContent = $sce.trustAsHtml(zipFileHandler.getReadingOrderFile());
            //zipFileHandler.getContainer();
            //$scope.zipContent = $sce.trustAsHtml(zipFileHandler.getTocFile());
            var toc = new SmartEpub.TOC(zipFileHandler.getTocFile());
            $scope.zipContent = $sce.trustAsHtml(toc.getDocTitle());
            $scope.$apply();
        });

        //zip.read($scope.files[0], function (res) {
        //    $scope.zipContent = $sce.trustAsHtml(res);
        //    $scope.$apply();
        //});
    }
}]);