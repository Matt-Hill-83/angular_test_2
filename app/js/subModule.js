angular.module('subModule', [])
.factory('solarCalculator', function() {

  this.inputsArray = [];
  this.inputsHash = {};
  this.annualIncome = 0;
  this.resultsArray = [];
  this.monthlyPayment;
  this.monthlyPaymentStr;

  this.calcAnnualIncome = function (inputsHash){
    this.annualIncome = inputsHash['projectCost'] +
                       inputsHash['ownerEquity'] +
                       inputsHash['interestRate'];
    return this.annualIncome;
  };

  this.createInputsHash = function(inputsArray) {
    // Is this necessary?
    that = this;
    for(var i = 0; i < inputsArray.length; i++){
      var inputObject = inputsArray[i];
      that.inputsHash[inputObject.name] = inputObject.value;
    }
    return this.inputsHash;
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

    this.resultsArray.push(r1);
    this.resultsArray.push(r2);
    this.resultsArray.push(r3);
    this.resultsArray.push(r4);
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

    this.inputsArray.push(i1);
    this.inputsArray.push(i2);
    this.inputsArray.push(i3);

    return this.inputsArray;
  }

  this.calcMonthlyPayment = function calcMonthlyPayment(){
    this.createInputsHash(this.inputsArray);
    // Breakout of monthly payment calculation
    var projectCost = this.inputsHash.projectCost;
    var ownerEquity = this.inputsHash.ownerEquity;
    var monthlyInterestRate = this.inputsHash.interestRate/12/100;
    var termInYears = 1;

    // var monthlyInterestRate = this.interestRate/12/100;

    var loanAmount = projectCost - (ownerEquity/100)*projectCost;

    var numerator = monthlyInterestRate *(Math.pow(1.0 + monthlyInterestRate, 12.0 * termInYears));
    var denominator = Math.pow((1 + monthlyInterestRate), (12.0 * termInYears)) - 1.0;
    var numOverDenom = numerator/denominator;
    this.monthlyPayment = loanAmount * numOverDenom/10;
    this.monthlyPaymentStr = this.monthlyPayment.toFixed(0).insertComma();
    console.log(this.monthlyPayment);

    return this.monthlyPayment;
  };


  return {
    calcAnnualIncome: this.calcAnnualIncome,
    initializeInputsDisplays: this.initializeInputsDisplays,
    createInputsHash: this.createInputsHash,
    calcMonthlyPayment: this.calcMonthlyPayment,
    inputsHash: this.inputsHash,
    inputsArray: this.inputsArray,
    resultsArray: this.resultsArray
    // calcResults: this.calcResults
  };

});
