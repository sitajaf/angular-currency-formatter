angular.module('ngCurrencyFormatterApp', [])
    .controller('currencyController', ['$scope', function ($scope) {
        $scope. value = 24400;
    }])
    .directive('ngCurrencyFormatter', ['$filter', function ($filter) {
        return {
            link: link,
            require: 'ngModel'
        };

        function link(scope, element, attrs, controller) {
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

            function toNumber(value) {
                return Number(value.replace(/,/g, ''));
            }
        }

    }
    ]);
