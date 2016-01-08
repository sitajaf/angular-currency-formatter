angular.module('ngCurrencyFormatterApp', [])
    .directive('ngCurrencyFormatter', ['$filter', function ($filter) {
        function link(scope, element, attrs, ctrl) {
            ctrl.$formatters.push(function(value){
                return $filter('currency')(value, '', 0);
            });

            element.on('focus', function (event) {
                element.val(toNumber(element.val()));
            });

            function toNumber(value) {
                return Number(value.replace(/,/g, ''));
            }
        }

        return {
            link: link,
            require: 'ngModel'
        }
    }
    ]);
