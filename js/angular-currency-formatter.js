angular.module('ngCurrencyFormatterApp', [])
    .controller('currencyController', ['$scope', function ($scope) {
        $scope.value = 24400;
    }])
    .directive('ngCurrencyFormatter', ['$filter', function ($filter) {
        return {
            restrict: 'A',
            link: link,
            require: 'ngModel'
        };

        function link(scope, element, attrs, controller) {
            var maxLength = attrs.maxLength;
            var decimalPlaces = isNaN(attrs.decimalPlaces) ? 0 : Number(attrs.decimalPlaces);

            controller.$formatters.push(function (value) {
                return toCurrency(value);
            });

            controller.$parsers.push(function (value) {
                return toNumber(value);
            });

            element.on('focus', onFocus);
            element.on('keypress', onKeypress);
            element.on('blur', onBlur);
            element.on('input', onInput);


            function onBlur(event) {
                controller.$setViewValue(toCurrency(element.val()));
                controller.$render();
            }

            function onInput(event) {
                var value = String(toNumber(element.val()));

                if (value.length > maxLength) {
                    var newValue = value.substring(0, maxLength);
                    controller.$setViewValue(newValue);
                    controller.$render();
                }
            }

            function onFocus(event) {
                element.val(toNumber(element.val()));
            }

            function onKeypress(event) {
                if (element.val().length >= maxLength) {
                    event.defaultPrevented = true;
                    event.stopPropagation();
                }
            }

            function toNumber(value) {
                return Number(value.replace(/,/g, ''));
            }

            function toCurrency(value) {
                return $filter('currency')(value, '', decimalPlaces);
            }
        }

    }
    ]);
