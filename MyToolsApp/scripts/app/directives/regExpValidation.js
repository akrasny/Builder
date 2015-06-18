angular.module('MyTools').directive('regExpValidation', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        scope: {
            regExpValidation: '@'
        },
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$validators.regExpValidation = function (modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    // consider empty models to be valid
                    return true;
                }

                if (new RegExp(scope.regExpValidation).test(viewValue)) {
                    // it is valid
                    return true;
                }

                // it is invalid
                return false;
            };
        }
    };
});