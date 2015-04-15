angular.module('subModule', [])
.factory('solarCalculator', function() {

  this.inputsArray = [];
  this.inputsHash = {};
  this.annualIncome = 0;
  this.subExpensesArray = [];
  this.annualExpensesTotal;
  this.annualExpensesTotalStr;
  this.chart;
  this.chartdata;
  this.options;

  this.setGraphOptions = function(){
    this.options = {
      pieHole: 0.6,
      'legend':'none',
      backgroundColor: 'transparent',
      pieSliceTextStyle: {
      color: 'transparent',
      },
    };
  };

  this.initSubExpensesDisplays = function(){
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

    this.subExpensesArray.push(r1);
    this.subExpensesArray.push(r2);
    this.subExpensesArray.push(r3);
    this.subExpensesArray.push(r4);
  }

  this.initInputsDisplays = function(){
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

  this.createInputsHash = function(inputsArray) {
    for(var i = 0; i < inputsArray.length; i++){
      var inputObject = inputsArray[i];
      this.inputsHash[inputObject.name] = inputObject.value;
    }
    return this.inputsHash;
  };

  // This is just a dummy calc for a test.
  this.calcAnnualIncome = function (inputsHash){
    this.annualIncome = parseInt(inputsHash['projectCost']) +
                       parseInt(inputsHash['ownerEquity']) +
                       parseInt(inputsHash['interestRate']);
    return (this.annualIncome);
  };

  this.calcAnnualExpenses = function(){
    this.createInputsHash(this.inputsArray);
    // Breakout of monthly payment calculation
    var projectCost = this.inputsHash.projectCost;
    var ownerEquity = this.inputsHash.ownerEquity;
    var monthlyInterestRate = this.inputsHash.interestRate/12/100;
    var termInYears = 1;

    var loanAmount = projectCost - (ownerEquity/100)*projectCost;

    var numerator = monthlyInterestRate *(Math.pow(1.0 + monthlyInterestRate, 12.0 * termInYears));
    var denominator = Math.pow((1 + monthlyInterestRate), (12.0 * termInYears)) - 1.0;
    var numOverDenom = numerator/denominator;
    this.annualExpensesTotal = loanAmount * numOverDenom/10;
    this.annualExpensesTotalStr = this.annualExpensesTotal.toFixed(0).insertComma();

    return this.annualExpensesTotal;
  };

  this.calcAnnualSubExpenses = function(){
    // Create and display broken out subpayments
    for(var i = 0; i<this.subExpensesArray.length; i++){
      r = this.subExpensesArray[i];
      r.value = r.fixedCost + this.annualExpensesTotal * r.fractionOfProjectSize;
    };
    return this.subExpensesArray;
  };

  this.parseDataForPieChart = function(){
    // Create pie chart labels and values
    var dataArray = [];
    // Add headers.
    dataArray.push(['Expense', 'Per Year']);

    for(var i = 0; i<this.subExpensesArray.length; i++){
      r = this.subExpensesArray[i];
      var dataElement = [r.name, r.value ]
      dataArray.push(dataElement);
    };
    this.chartData = google.visualization.arrayToDataTable(dataArray);
  };

  this.updatePieChart = function(){
    this.chart = new google.visualization.PieChart(document.getElementById('donutchart2'));
    this.chart.draw(this.chartData, this.options);
  }

  return {
    calcAnnualIncome: this.calcAnnualIncome,
    initSubExpensesDisplays: this.initSubExpensesDisplays,
    initInputsDisplays: this.initInputsDisplays,
    createInputsHash: this.createInputsHash,
    calcAnnualExpenses: this.calcAnnualExpenses,
    inputsHash: this.inputsHash,
    inputsArray: this.inputsArray,
    subExpensesArray: this.subExpensesArray,
    calcAnnualSubExpenses: this.calcAnnualSubExpenses,
    parseDataForPieChart: this.parseDataForPieChart,
    updatePieChart: this.updatePieChart,
    setGraphOptions: this.setGraphOptions
  };

});
