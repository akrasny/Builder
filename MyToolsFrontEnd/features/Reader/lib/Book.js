var SmartEpub = SmartEpub || {};

SmartEpub.Book = function (zipFileHandler) {
    this.zipFileHandler = zipFileHandler;
}

SmartEpub.Book.prototype = function () {
    //private 
    var _getToc = function () {

    },
    _open = function () {
        zipFileHandler.openZip(
            function () {
            }, //success callback
            function (msg) {
            }); //error callback
    }

    //public
    return {
        getToc: _getToc,
        open: _open
    }
}();