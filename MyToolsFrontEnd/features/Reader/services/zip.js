angular.module('MyTools').factory('zip', ['$log', function ($log) {
    //private variables


    //private methods
    var read = function (file, fnCallback) {
            var reader = new FileReader();

            // Closure to capture the file information.
            reader.onload = (function (theFile) {
                return function (e) {
                    try {
                        // read the content of the file with JSZip
                        var zip = new JSZip(e.target.result),
                            res = '';

                        $.each(zip.files, function (index, zipEntry) {
                            res += zipEntry.name + '<br/>';
                            //$fileContent.append($("<li>", {
                            //    text: zipEntry.name
                            //}));
                            // the content is here : zipEntry.asText()
                        });
                        fnCallback(res);
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