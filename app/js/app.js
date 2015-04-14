'use strict';

angular.module('myApp', ['testService', 'subModule'])
.controller('solarCtrl', ['solarCalculator', function(solarCalculator) {
  this.results = monthlyResults;

  this.inputsArray = solarCalculator.initializeInputsDisplays();
  this.inputsHash = solarCalculator.createInputsHash(this.inputsArray);
  this.annualIncome = solarCalculator.calcAnnualIncome(this.inputsHash);
  this.annualExpensesTotal = solarCalculator.calcAnnualExpenses();

  this.calcAnnualExpenses = function calcAnnualExpenses(){
    this.annualExpensesTotal = solarCalculator.calcAnnualExpenses().toFixed(0);
    this.annualIncome = solarCalculator.calcAnnualIncome(this.inputsHash);
    this.subExpensesArray = solarCalculator.calcAnnualSubExpenses();
  };
}]);
