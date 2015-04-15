// Monkey patch in new function on String.prototype to format currency numbers
String.prototype.insertComma = function() {
  // Remove number past decimal.
  var arr  = this.split(".");
  var newStr = arr[0];

  // Insert commas at appropriate locations.
  if (newStr.length > 6) {
    return (newStr.slice(0,-6) + "," + newStr.slice(-6, -3) + "," + newStr.slice(-3));
  } else if (newStr.length > 3) {
    return (newStr.slice(0,-3) + "," + newStr.slice(-3));
  }else{
    return newStr.slice(0);
  }
};



'use strict';

angular.module('myApp', ['testService', 'subModule'])
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
