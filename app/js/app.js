'use strict';

angular.module('myApp', ['testService', 'subModule'])
.controller('solarCtrl', ['solarCalculator', function(solarCalculator) {
  this.results = monthlyResults;

  this.inputsArray = solarCalculator.initializeInputsDisplays();
  this.inputsHash = solarCalculator.createInputsHash(this.inputsArray);
  this.annualIncome = solarCalculator.calcAnnualIncome(this.inputsHash);
  // this.resultsArray = solarCalculator.calcResults();
  console.log(this.annualIncome);
}]);
