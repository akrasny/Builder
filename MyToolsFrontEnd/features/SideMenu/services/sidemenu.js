angular.module('MyTools').factory('SideMenuSvc', function ($scope) {
    //private variables
    var menuItems = [];

    //private methods
    var getMenuItems = function() {
        return menuItems;
    }

    //public methods
    return {
        getMenuItems: getMenuItems
    }
});