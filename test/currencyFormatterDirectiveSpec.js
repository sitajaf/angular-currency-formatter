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
        input.triggerHandler('blur');

        expect(input.val()).toEqual('7,134,000');
        expect(scope.currencyForm.currencyInput.$modelValue).toEqual(7134000);
    });

    it('should allow a maximum of 10 digits only', function () {
        var html = '<form name="currencyForm" >' +
            '<input name="currencyInput" ng-currency-formatter max-length="10" ng-model="currencyValue">' +
            '</form>';

        element = compile(html)(scope);
        scope.$digest();

        var currentInput = angular.element(element).find('input');
        currentInput.val('133022390000');
        currentInput.triggerHandler('input');
        currentInput.triggerHandler('blur');

        expect(currentInput.val()).toEqual('1,330,223,900');
        expect(scope.currencyForm.currencyInput.$modelValue).toEqual(1330223900);
    });

    it('should properly format view value with 2 zeros if 2 decimal values specified', function () {
        var html = '<form name="currencyForm" >' +
            '<input name="currencyInput" ng-currency-formatter decimal-places="2" ng-model="currencyValue">' +
            '</form>';
        var currentElement = compile(html)(scope);
        scope.$digest();
        var currentInput = angular.element(currentElement).find('input');

        scope.currencyValue = 1278000;
        scope.$digest();

        expect(currentInput.val()).toEqual('1,278,000.00');
    });

    it('should properly format view value with decimal value to the correct dps specified', function () {
        var html = '<form name="currencyForm" >' +
            '<input name="currencyInput" ng-currency-formatter decimal-places="1" ng-model="currencyValue">' +
            '</form>';

        element = compile(html)(scope);
        scope.$digest();
        var currentInput = angular.element(element).find('input');
        scope.currencyValue = 2439000.40;
        scope.$digest();

        expect(currentInput.val()).toEqual('2,439,000.4');
    });

    it('should properly format the view value to the right dps upon blur if dps specified', function(){
        var html = '<form name="currencyForm" >' +
            '<input name="currencyInput" ng-currency-formatter decimal-places="2" ng-model="currencyValue">' +
            '</form>';
        var currentElement = compile(html)(scope);
        scope.$digest();
        var currentInput = angular.element(currentElement).find('input');

        currentInput.val('2340430');

        currentInput.triggerHandler('blur');
        expect(currentInput.val()).toEqual('2,340,430.00');
    });

    it('should properly format the view value to the right dps upon on focus if dps specified', function(){
        var html = '<form name="currencyForm" >' +
            '<input name="currencyInput" ng-currency-formatter decimal-places="2" ng-model="currencyValue">' +
            '</form>';
        var currentElement = compile(html)(scope);
        scope.$digest();
        var currentInput = angular.element(currentElement).find('input');

        scope.currencyValue = 2439000.40;
        scope.$digest();

        currentInput.triggerHandler('focus');
        expect(currentInput.val()).toEqual('2439000.4')

        scope.currencyValue = 9653.78;
        scope.$digest();

        currentInput.triggerHandler('focus');
        expect(currentInput.val()).toEqual('9653.78')
    });


});