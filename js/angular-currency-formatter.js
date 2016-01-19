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
                var numberValue = String(Math.floor(toNumber(element.val())));
                var decimalValue = element.val().substring(numberValue.length + 1);

                if (decimalValue.length > decimalPlaces) {
                    console.log('manipulating input in input')
                    var newValue = numberValue + '.' + decimalValue.substring(0, 2);
                    controller.$setViewValue(newValue);
                    controller.$render();
                }
            }

            function onFocus(event) {
                element.val(toNumber(element.val()));
            }

            function onKeypress(event) {
                var charCode = event.which ? event.which : event.keyCode;
                var includesDot = element.val().includes('.');

                if ((charCode === 46 && includesDot === true) || charCode !== 44  && charCode !== 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
                    console.log('preventing default in key press');
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                }
                return true;

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
