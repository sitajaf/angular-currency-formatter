angular.module('ngCurrencyFormatterApp', [])
    .directive('ngCurrencyFormatter', ['$filter', function ($filter) {
        function link(scope, element, attrs, ctrl) {

            ctrl.$formatters.push(function(value){
                return $filter('currency')(value, '', 0);
            });
        }

        return {
            link: link,
            require: 'ngModel'
        }
    }
    ]);
