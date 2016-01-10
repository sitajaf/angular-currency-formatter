angular.module('ngCurrencyFormatterApp', [])
    .controller('currencyController', ['$scope', function ($scope) {
        $scope.value = 24400;
    }])
    .directive('ngCurrencyFormatter', ['$filter', function ($filter) {
        return {
            restrict: 'A',
            link: link,
            require: 'ngModel',
            scope: {
                value: '='
            }
        };

        function link(scope, element, attrs, controller) {
            var maxLength = attrs.maxLength;

            controller.$formatters.push(function (value) {
                return $filter('currency')(value, '', 0);
            });

            element.on('focus', function (event) {
                element.val(toNumber(element.val()));
            });

            element.on('blur', function (event) {
                var formattedValue = toCurrency(element.val());
                controller.$setViewValue(formattedValue);
                controller.$render();
            });

            element.on('input', function (event) {
                var value = String(toNumber(element.val()));

                if (!isNaN(value) && value.length > maxLength) {
                    var newValue = value.substring(0, maxLength);
                    controller.$setViewValue(toCurrency(newValue));
                    controller.$render();
                }
            });

            controller.$parsers.push(function (value) {
                return toNumber(value);
            });

            function toNumber(value) {
                return Number(value.replace(/,/g, ''));
            }

            function toCurrency(value){
                return $filter('currency')(value, '', 0);
            }
        }

    }
    ]);
