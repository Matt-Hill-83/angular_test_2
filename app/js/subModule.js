angular.module('subModule', [])
.factory('solarCalculator', function() {

  var inputsArray = [];
  var inputsHash = {};
  var annualIncome = 0;
  var resultsArray = [];

  this.calcAnnualIncome = function (inputsHash){
    annualIncome = inputsHash['projectCost'] +
                       inputsHash['ownerEquity'] +
                       inputsHash['interestRate'];
    return annualIncome;
  };

  this.createInputsHash = function(inputsArray) {
    for(var i = 0; i < inputsArray.length; i++){
      var inputObject = inputsArray[i];
      inputsHash[inputObject.name] = inputObject.value;
    }
    return inputsHash;
  };

  this.initializeResultsDisplays = function initializeResultsDisplays(){
    var r1 = new Result();
    r1.name = 'O+M';
    r1.fixedCost = 500;
    r1.fractionOfProjectSize = 0.05;

    var r2 = new Result();
    r2.name = 'Inverters';
    r2.fixedCost = 500;
    r2.fractionOfProjectSize = 0.04;

    var r3 = new Result();
    r3.name = 'Insurance';
    r3.fixedCost = 500;
    r3.fractionOfProjectSize = 0.03;

    var r4 = new Result();
    r4.name = 'Debt Service';
    r4.fixedCost = 500;
    r4.fractionOfProjectSize = 0.02;

    resultsArray.push(r1);
    resultsArray.push(r2);
    resultsArray.push(r3);
    resultsArray.push(r4);
  }




  this.initializeInputsDisplays = function initializeInputsDisplays(){
    var i1 = new Input();
    i1.name = 'projectCost';
    i1.displayName = 'Project Cost ($)';
    i1.value = 1400000;
    i1.valueString = 'xxx';
    i1.min = 0;
    i1.max = 2000000;
    i1.step = 100;

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

    inputsArray.push(i1);
    inputsArray.push(i2);
    inputsArray.push(i3);

    return inputsArray;
  }

  return {
    calcAnnualIncome: this.calcAnnualIncome,
    initializeInputsDisplays: this.initializeInputsDisplays,
    createInputsHash: this.createInputsHash
    // calcResults: this.calcResults
  };

});
