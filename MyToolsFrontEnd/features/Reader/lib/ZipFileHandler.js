var SmartEpub = SmartEpub || {};

SmartEpub.ZipFileHandler = function (file) {
    this.file = file;
}

SmartEpub.ZipFileHandler.prototype = function () {
    //private 
    var _zip,
    _openZip = function (successCb, errorCb) {
        var reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function (theFile) {
            return function (e) {
                try {
                    // read the content of the file with JSZip
                    _zip = new JSZip(e.target.result);

                    if (successCb) {
                        successCb();
                    }
                } catch (e) {
                    if (errorCb) {
                        errorCb("Error reading " + theFile.name + " : " + e.message);
                    }
                }
            }
        })(this.file);

        // read the file !
        // readAsArrayBuffer and readAsBinaryString both produce valid content for JSZip.
        reader.readAsArrayBuffer(this.file);
        // reader.readAsBinaryString(f);
    }
    //public
    return {
        openZip: _openZip
    }
}();