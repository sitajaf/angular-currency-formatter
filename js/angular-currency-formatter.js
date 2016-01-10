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
                var formattedValue = $filter('currency')(element.val(), '', 0);
                controller.$setViewValue(formattedValue);
                controller.$render();
            });

            element.on('input', function (event) {
                var value = String(toNumber(element.val()));

                if (value.length > maxLength) {
                    var newValue = value.substring(0, maxLength);
                    controller.$setViewValue($filter('currency')(newValue, '', 0));
                    controller.$render();
                }
            });

            controller.$parsers.push(function (value) {
                return toNumber(value);
            });

            function toNumber(value) {
                return Number(value.replace(/,/g, ''));
            }
        }

    }
    ]);
