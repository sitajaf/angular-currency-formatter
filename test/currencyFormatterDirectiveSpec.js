describe('ng-currency-formatter directive', function () {
    var scope,
        compile,
        element,
        input;

    beforeEach(function () {
        module('ngCurrencyFormatterApp');

        inject(function ($compile, $rootScope) {
            scope = $rootScope.$new();
            compile = $compile;
        });

        var html = '<form name="currencyForm" >' +
            '<input name="currencyInput" max-length="7" ng-currency-formatter ng-model="currencyValue">' +
            '</form>';

        element = compile(html)(scope);
        scope.$digest();

        input = angular.element(element).find('input');
    });

    it('should display a view value with commas while maintaining the model value as number', function () {
        scope.currencyValue = 23000;
        scope.$apply();

        expect(input.val()).toBe('23,000');
        expect(scope.currencyForm.currencyInput.$viewValue).toEqual('23,000');
        expect(scope.currencyValue).toEqual(23000);
    });

    it('should set the view value to number upon gaining focus', function () {
        scope.currencyValue = 1329219;
        scope.$apply();

        input.triggerHandler('focus');

        expect(input.val()).toEqual('1329219');

    });

    it('should reformat the view value with commas if focus is lost', function () {
        scope.currencyValue = 24504000;
        scope.$apply();

        input.triggerHandler('focus');
        expect(input.val()).toEqual('24504000');

        input.triggerHandler('blur');
        expect(input.val()).toEqual('24,504,000');
    });

    it('should maintain the model value as a number', function () {
        input.val('35,400');
        input.triggerHandler('input');

        expect(scope.currencyForm.currencyInput.$viewValue).toEqual('35,400');
        expect(scope.currencyForm.currencyInput.$modelValue).toEqual(35400);

    });

    it('should allow a maximum of 7 digits only', function () {
        input.val('71,340,000');
        input.triggerHandler('input');

        expect(input.val()).toEqual('7,134,000');
        expect(scope.currencyForm.currencyInput.$modelValue).toEqual(7134000);
    })

    it('should allow a maximum of 10 digits only', function () {
        var html = '<form name="currencyForm" >' +
            '<input name="currencyInput" ng-currency-formatter max-length="10" ng-model="currencyValue">' +
            '</form>';

        element = compile(html)(scope);
        scope.$digest();

        var currentInput = angular.element(element).find('input');
        currentInput.val('133022390000');
        currentInput.triggerHandler('input');

        expect(currentInput.val()).toEqual('1,330,223,900');
        expect(scope.currencyForm.currencyInput.$modelValue).toEqual(1330223900);
    });


});