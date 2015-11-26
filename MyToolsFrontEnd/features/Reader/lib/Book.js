var SmartEpub = SmartEpub || {};

SmartEpub.Book = function (zipFileHandler) {
    this.zipFileHandler = zipFileHandler;
}

SmartEpub.Book.prototype = function () {
    //private 
    var _getToc = function () {
        var tocFile = this.zipFileHandler.getTocFile();
    },
    _open = function (successCb, errorCb) {
        zipFileHandler.openZip(
            function () {
                if (successCb) {
                    successCb();
                }
            }, //success callback
            function (msg) {
                if (errorCb) {
                    errorCb(msg);
                }
            }); //error callback
    }

    //public
    return {
        getToc: _getToc,
        open: _open
    }
}();