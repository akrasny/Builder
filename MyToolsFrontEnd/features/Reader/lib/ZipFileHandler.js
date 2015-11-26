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

        reader.readAsArrayBuffer(this.file);
    },
    _getTocFile = function () {
        var readingOrderFile = _getReadingOrderFile(),
            $xmlDoc = $($.parseXML(readingOrderFile)),
            tocId = $xmlDoc.find('spine').attr('toc'),
            tocFileName,
            tocFullPath;

        $xmlDoc.find('manifest').first().find('item').each(function () {
            if ($(this).attr('id') == tocId) {
                tocFileName = $(this).attr('href');
            }
        });

        if (tocFileName) {
            $.each(_zip.files, function (index, zipEntry) {
                if (zipEntry.name.indexOf(tocFileName) != -1) {
                    tocFullPath = zipEntry.name;
                }
            });
        }

        return _checkIfFileExistsAndReturnAsText(tocFullPath);
    },
    _checkIfFileExistsAndReturnAsText = function (path) {
        if (path) {
            var zPath = _zip.file(path);
            if (zPath) {
                return zPath.asText();
            }
        }
        return null;
    },
    _getMimetypeFile = function () {
        return _checkIfFileExistsAndReturnAsText('mimetype');
    },
    _getContainerFile = function () {
        return _checkIfFileExistsAndReturnAsText('META-INF/container.xml');
    },
    _getReadingOrderFileName = function () {
        var container = _getContainerFile(),
        $xmlDoc = $($.parseXML(container)),
        opfFullPath = $xmlDoc.find('rootfiles').first().find('rootfile').first().attr('full-path');

        return opfFullPath;
    },
    _getReadingOrderFile = function () {
        return _checkIfFileExistsAndReturnAsText(_getReadingOrderFileName());
    }

    //public
    return {
        openZip: _openZip,
        getTocFile: _getTocFile,
        getMimetypeFile: _getMimetypeFile,
        getContainerFile: _getContainerFile,
        getReadingOrderFile: _getReadingOrderFile,
        getFile: _checkIfFileExistsAndReturnAsText
    }
}();