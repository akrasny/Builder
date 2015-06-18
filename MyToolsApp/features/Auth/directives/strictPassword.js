angular.module('MyTools').directive('strictPassword', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$validators.strictPassword = function (modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    // consider empty models to be valid
                    return true;
                }

                var regexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/;

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