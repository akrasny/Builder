angular.module('MyTools').directive('buttonCheckbox', function () {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            tabindex: '@',
            text: '@',
            color: '@',
            state: '='
        },
        template: '<span class="button-checkbox">' +
                      '<button type="button" class="btn" data-color="{{color}}" tabindex="{{tabindex}}">{{text}}</button>' +
                  '</span>',
        link: function (scope, element, attrs) {
            if (!angular.isDefined(scope.tabindex)) {
                scope.tabindex = '-1';
            }

            if (!angular.isDefined(scope.text)) {
               scope.text = 'Button';
            }

            if (!angular.isDefined(scope.color)) {
                scope.color = 'info';
            }

            if (!angular.isDefined(scope.state)) {
                scope.state = false;
            }

            $('.button-checkbox').each(function () {
                // Settings
                var $widget = $(this),
                    $button = $widget.find('button'),
                    color = scope.color,
                    settings = {
                        on: {
                            icon: 'glyphicon glyphicon-check'
                        },
                        off: {
                            icon: 'glyphicon glyphicon-unchecked'
                        }
                    };

                // Event Handlers
                $button.on('click', function () {
                    updateDisplay(true);
                    scope.state = $button.data('state') == 'on' ? true : false;
                    scope.$apply();
                });

                // Actions
                function updateDisplay(toggle) {
                    var isChecked = scope.state;
                    if (toggle) {
                        isChecked = !isChecked;
                    }

                    // Set the button's state
                    $button.data('state', (isChecked) ? "on" : "off");

                    // Set the button's icon
                    $button.find('.state-icon')
                        .removeClass()
                        .addClass('state-icon ' + settings[$button.data('state')].icon);

                    // Update the button's color
                    if (isChecked) {
                        $button
                            .removeClass('btn-default')
                            .addClass('btn-' + color + ' active');
                    }
                    else {
                        $button
                            .removeClass('btn-' + color + ' active')
                            .addClass('btn-default');
                    }
                }

                // Initialization
                function init() {
                    updateDisplay(false);

                    // Inject the icon if applicable
                    if ($button.find('.state-icon').length == 0) {
                        $button.prepend('<i class="state-icon ' + settings[$button.data('state')].icon + '"></i>');
                    }
                }
                init();
            });
        }
    };
});