angular.module('MyTools').factory('CommonUtilsSvc', ['$http', function ($http) {
    //private variables


    //private methods
    var isFieldInalid = function (submitted, f) {
        return (f.$invalid && f.$dirty && f.$touched) ||
               (submitted && f.$invalid);
    }

    

    //public methods
    return {
        isFieldInalid: isFieldInalid
    }
}]);