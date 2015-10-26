angular.module('MyTools').directive('file', function () {
    return {
        restrict: 'E',
        replace: false,
        scope: {
            textBoxClass: '@',
            textBoxOuterClass: '@',
            buttonClass: '@',
            buttonOuterClass: '@',
            placeholder: '@',
            textBoxTabindex: '@',
            buttonTabindex: '@',
            buttonText: '@',
            state: '='
        },
        template: '<div class="row"><input type="file" multiple accept=".epub" style="display:none">' +
                  '<div class="{{textBoxOuterClass}}"><input type="text" class="{{textBoxClass}}"' +
                  ' placeholder="{{placeholder}}" tabindex="{{tabindex}}"' + ' readonly /> </div>' +
                  '<div class="{{buttonOuterClass}}"><a href="#" class="{{buttonClass}}">{{buttonText}}</a></div></div>',
        link: function (scope, element, attrs) {
            var $widget = $(angular.element(element.children()[0]));
                $button = $widget.find('a').first(),
                $textBox = $widget.find('input[type="text"]').first(),
                $hiddenInputFile = $widget.find('input[type="file"]').first();

            if (!angular.isDefined(scope.textBoxClass)) {
                scope.textBoxClass = 'form-control input-lg';
            }

            if (!angular.isDefined(scope.textBoxOuterClass)) {
                scope.textBoxOuterClass = 'col-md-8';
            }

            if (!angular.isDefined(scope.buttonClass)) {
                scope.buttonClass = 'btn btn-primary btn-block btn-lg';
            }

            if (!angular.isDefined(scope.buttonOuterClass)) {
                scope.buttonOuterClass = 'col-md-4';
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

            $widget.find('a,input[type="text"]').click(function (e) {
                $hiddenInputFile.click();
                e.preventDefault();
            });

            //if (!angular.isDefined(scope.state)) {
            //    scope.state = false;
            //}
        }
    };
});