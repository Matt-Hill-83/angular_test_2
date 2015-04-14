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
  this.inputsArray = [];

  this.getResults = function getResults(){
    var inputsHash = {
      'input1': parseInt(this.input1),
      'input2': parseInt(this.input2),
      'input3': parseInt(this.input3),
      'input4': parseInt(this.input4),
    };

    return currencyConverter.calcAnnualIncome(inputsHash);
  };


  this.initializeInputsDisplays = function initializeInputsDisplays(){

    var i1 = new Input();
    i1.name = 'projectCost';
    i1.displayName = 'Project Cost ($)';
    i1.value = 1400 * 1000;
    i1.valueString = '1,400,000';
    i1.min = 0;
    i1.max = 2000 * 1000;
    i1.step = 1;

    var i2 = new Input();
    i2.name = 'ownerEquity';
    i2.displayName = 'Owner Equity (%)';
    i2.value = 25;
    i2.valueString = 'zzz';
    i2.min = 0;
    i2.max = 100;
    i2.step = 1;

    var i3 = new Input();
    i3.name = 'interestRate';
    i3.displayName = 'Interest Rate (WACC) (%)';
    i3.value = 12;
    i3.valueString = 'xxx';
    i3.min = 0;
    i3.max = 30;
    i3.step = 1;


    this.inputsArray.push(i1);
    this.inputsArray.push(i2);
    this.inputsArray.push(i3);
  }

  this.initializeInputsDisplays();

}]);
