(function (JsOOP, undefined) {
    var _classes = {};

    var inheritsFrom = function (child, parent) {
        child.prototype = Object.create(parent.prototype);
    };


    JsOOP.registerClass = function (name, parent, definition) {
        _classes[name] = function () {
        }

        if (parent) {
            inheritsFrom(_classes[name], parent);
        }

        if (definition.publicVariables) {

        }

        return _classes[name];
    }

}(window.JsOOP = window.JsOOP || {}));