describe('ng-currency-formatter directive', function () {
    var scope,
        compile,
        element;

    beforeEach(function () {
        module('ngCurrencyFormatterApp');

        inject(function ($compile, $rootScope) {
            scope = $rootScope.$new();
            compile = $compile;
        });

        var html = '<form name="currencyForm" ><input name="currencyInput" ng-currency-formatter ng-model="currencyValue"></form>';
        element = compile(html)(scope);
        scope.$digest();
    });

    it('should display a view value with commas while maintaining the model value as number', function () {
        scope.currencyValue = 23000;
        scope.$apply();

        var input = angular.element(element).find('input');

        expect(input.val()).toBe('23,000');
        expect(scope.currencyValue).toEqual(23000);
    });

    it('should set the view value to number upon gaining focus', function () {
        scope.currencyValue = 1329219;
        scope.$apply();

        var input = angular.element(element).find('input');
        input.triggerHandler('focus');

        expect(input.val()).toEqual('1329219');

    });

    it('should reformat the view value with commas if focus is lost', function () {
        scope.currencyValue = 24504000;
        scope.$apply();

        var input = angular.element(element).find('input');

        input.triggerHandler('focus');
        expect(input.val()).toEqual('24504000');

        input.triggerHandler('blur');
        expect(input.val()).toEqual('24,504,000');
    });

    it('should maintain the model value as a number', function () {
        var input = angular.element(element).find('input');

        input.val('35,400,340');
        input.triggerHandler('input');

        expect(scope.currencyForm.currencyInput.$viewValue).toEqual('35,400,340');
        expect(scope.currencyForm.currencyInput.$modelValue).toEqual(35400340);

    });


});