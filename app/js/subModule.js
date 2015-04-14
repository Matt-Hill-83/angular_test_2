angular.module('subModule', [])
.factory('solarCalculator', function() {

  var inputsArray = [];
  var inputsHash = {};
  var annualIncome = 0;

  this.calcAnnualIncome = function (inputsHash){
    annualIncome = inputsHash['projectCost'] +
                       inputsHash['ownerEquity'] +
                       inputsHash['interestRate'];
    return annualIncome;
  };

  this.createInputsHash = function(inputsArray) {
    // debugger
    for(var i = 0; i < inputsArray.length; i++){
      var inputObject = inputsArray[i];
      inputsHash[inputObject.name] = inputObject.value;
    }
    return inputsHash;
  };



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
  };

});
