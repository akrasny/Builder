angular.module('MyTools').directive('file', function () {
    return {
        restrict: 'E',
        replace: false,
        scope: {
            textBoxClass: '@',
            buttonClass: '@',
            placeholder: '@',
            textBoxTabindex: '@',
            buttonTabindex: '@',
            buttonText: '@',
            state: '='
        },
        template: '<div class="row"><div class="col-md-10"><input type="text" class="{{textBoxClass}}"' +
                  ' placeholder="{{placeholder}}" tabindex="{{tabindex}}"' + ' readonly /> </div>' +
                  '<div class="col-md-1"><a href="#" class="{{buttonClass}}">{{buttonText}}</a></div></div>',
        link: function (scope, element, attrs) {
            var button = $(angular.element(element.children()[0])).find('a'),
                textBox = $(angular.element(element.children()[0])).find('input');

            if (!angular.isDefined(scope.textBoxClass)) {
                scope.textBoxClass = 'form-control input-lg';
            }

            if (!angular.isDefined(scope.buttonClass)) {
                scope.buttonClass = 'btn btn-primary btn-block btn-lg';
            }

            if (!angular.isDefined(scope.placeholder)) {
                scope.placeholder = 'Select file...';
            }

            if (!angular.isDefined(scope.textBoxTabindex)) {
                scope.textBoxTabindex = '-1';
            }

            if (!angular.isDefined(scope.buttonTabindex)) {
                scope.buttonTabindex = '-1';
            }

            if (!angular.isDefined(scope.buttonText)) {
                scope.buttonText = 'Browse...';
            }

            button.click(function (e) {
                alert('dfbnxcv');
                e.preventDefault();
            });

            //if (!angular.isDefined(scope.state)) {
            //    scope.state = false;
            //}

            //$('.button-checkbox').each(function () {
            //    // Settings
            //    var $widget = $(this),
            //        $button = $widget.find(scope.name + '_a'),
            //        color = scope.color,
            //        settings = {
            //            on: {
            //                icon: 'glyphicon glyphicon-check'
            //            },
            //            off: {
            //                icon: 'glyphicon glyphicon-unchecked'
            //            }
            //        };

            //    // Event Handlers
            //    $button.on('click', function () {
            //        updateDisplay(true);
            //        scope.state = $button.data('state') == 'on' ? true : false;
            //        scope.$apply();
            //    });

            //    // Actions


            //    // Initialization
            //    function init() {
            //    }
            //    init();
            //});
        }
    };
});