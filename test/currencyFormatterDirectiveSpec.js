describe('ng-currency-formatter directive', function(){
    var scope,
        compile,
        element,
        directiveScope;

    beforeEach(function(){
        module('ngCurrencyFormatterApp');

        inject(function($compile, $rootScope){
            scope = $rootScope.$new();
            compile = $compile;
        });

        var html = '<input ng-currency-formatter ng-model="currencyValue">';
        element = compile(html)(scope);
        scope.$digest();
        directiveScope = element.isolateScope();
    });

    it('should display a view value with commas while maintaining the model value as number', function(){
        scope.currencyValue = 23000;
        scope.$apply();

        var input = angular.element(element);

        expect(input.val()).toBe('23,000');
        expect(scope.currencyValue).toEqual(23000);
    });

    it('should set the view value to number upon gaining focus', function(){
        scope.currencyValue =1329219;
        scope.$apply();

        var input = angular.element(element);
        input.triggerHandler('focus');

        expect(input.val()).toEqual('1329219');

    });

});