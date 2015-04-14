'use strict';

angular.module('myApp', ['testService', 'subModule'])
.controller('TestController', ['currencyConverter', function(currencyConverter) {
  this.qty = 1;
  this.cost = 2;
  this.inCurr = 'EUR';
  this.currencies = currencyConverter.currencies;

  this.input1 = 53;

  this.output1 = function output1(input1){
    return input1 * 2;

  }

  this.total = function total(outCurr) {
    return currencyConverter.convert(this.qty * this.cost, this.inCurr, outCurr);
  };
  this.pay = function pay() {
    window.alert("Thanks!");
  };

  this.results = monthlyResults;



}]);
