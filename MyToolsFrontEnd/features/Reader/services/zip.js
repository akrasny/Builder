angular.module('MyTools').factory('zip', [function () {
    //private variables


    //private methods
    var read = function (file) {
            var reader = new FileReader();

            // Closure to capture the file information.
            reader.onload = (function (theFile) {
                return function (e) {
                    try {
                        // read the content of the file with JSZip
                        var zip = new JSZip(e.target.result);
                    } catch (e) {
                        $log.error("Error reading " + theFile.name + " : " + e.message);
                    }
                }
            })(file);

            // read the file !
            // readAsArrayBuffer and readAsBinaryString both produce valid content for JSZip.
            reader.readAsArrayBuffer(file);
            // reader.readAsBinaryString(f);
    }

    //public methods
    return {
        read: read
    }
}]);