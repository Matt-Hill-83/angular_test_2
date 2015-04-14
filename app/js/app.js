'use strict';

angular.module('myApp', ['testService', 'subModule'])
.controller('solarCtrl', ['solarCalculator', function(solarCalculator) {
  this.results = monthlyResults;
  this.inputsArray = [];
  this.inputsHash = {};

  this.getResults = function getResults(){
    var inputsHash = {
      'input1': parseInt(this.input1),
      'input2': parseInt(this.input2),
      'input3': parseInt(this.input3),
      'input4': parseInt(this.input4),
    };

    return solarCalculator.calcAnnualIncome(inputsHash);
  };

  this.inputsArray = solarCalculator.initializeInputsDisplays();
  this.inputsHash = solarCalculator.createInputsHash(this.inputsArray);
  // console.log(solarCalculator.calcAnnualIncome());
}]);
