'use strict';

angular.module('myApp', ['testService', 'subModule'])
.controller('TestController', ['currencyConverter', function(currencyConverter) {
  this.qty = 1;
  this.cost = 2;
  this.inCurr = 'EUR';
  this.currencies = currencyConverter.currencies;

  this.input1 = 10;
  this.input2 = 20;
  this.input3 = 30;
  this.input4 = 40;
  this.results = monthlyResults;

  // this.output1 = function output1(input1){
  //   return input1 * 2;
  //
  // }

  this.total = function total(outCurr) {
    return currencyConverter.convert(this.qty * this.cost, this.inCurr, outCurr);
  };
  this.pay = function pay() {
    window.alert("Thanks!");
  };


  this.getResults = function getResults(){
    var inputsHash = {
      'input1': parseInt(this.input1),
      'input2': parseInt(this.input2),
      'input3': parseInt(this.input3),
      'input4': parseInt(this.input4),
    };

    // console.log(inputsHash);
    // console.log(inputsHash['input1']);
    return currencyConverter.calcAnnualIncome(inputsHash);
  };



}]);
