angular.module('MyTools').factory('UtilsSvc', function () {
    //private variables

    //private methods
    var createValidationRule = function (name, regexp) {
        var app = angular.module('MyTools');
        app.directive(name, function () {
            return {
                require: 'ngModel',
                link: function (scope, elm, attrs, ctrl) {
                    ctrl.$validators[name] = function (modelValue, viewValue) {
                        if (ctrl.$isEmpty(modelValue)) {
                            // consider empty models to be valid
                            return true;
                        }

                        if (regexp.test(viewValue)) {
                            // it is valid
                            return true;
                        }

                        // it is invalid
                        return false;
                    };
                }
            };
        });
    }

    //public methods
    return {
        createValidationRule: createValidationRule
    }
});