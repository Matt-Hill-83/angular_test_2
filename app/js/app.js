'use strict';

angular.module('myApp', ['subModule'])
.controller('solarCtrl', ['solarCalculator', function(solarCalculator) {

  this.inputsArray = solarCalculator.initInputsDisplays();
  this.initSubExpensesDisplays = solarCalculator.initSubExpensesDisplays();
  this.inputsHash = solarCalculator.createInputsHash(this.inputsArray);
  this.annualIncome = solarCalculator.calcAnnualIncome(this.inputsHash);
  this.annualExpensesTotal = solarCalculator.calcAnnualExpenses();

  this.calcAnnualExpenses = function calcAnnualExpenses(){
    this.annualExpensesTotal = solarCalculator.calcAnnualExpenses().toFixed(0);
    this.annualIncome = solarCalculator.calcAnnualIncome(this.inputsHash);
    this.SubExpensesDisplays = solarCalculator.calcAnnualSubExpenses();
    solarCalculator.setGraphOptions();
    solarCalculator.parseDataForPieChart();
    solarCalculator.updatePieChart();
  };
}]);
