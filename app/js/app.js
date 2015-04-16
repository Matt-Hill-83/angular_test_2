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
    this.annualExpensesTotalStr = solarCalculator.annualExpensesTotalStr;
    this.annualIncome = solarCalculator.calcAnnualIncome(this.inputsHash);
    this.SubExpensesDisplays = solarCalculator.calcAnnualSubExpenses();
    solarCalculator.setGraphOptions();
    solarCalculator.parseDataForPieChart();
    solarCalculator.updatePieChart();
    solarCalculator.drawStackedChart();

    // var data = [4, 8, 15, 16, 23, 42];
    //
    // var x = d3.scale.linear()
    //     .domain([0, d3.max(data)])
    //     .range([0, 420]);
    //
    // d3.select(".chart")
    //   .selectAll("div")
    //     .data(data)
    //   .enter().append("div")
    //     .style("width", function(d) { return x(d) + "px"; })
    //     .text(function(d) { return d; });
    //
    //








  };

  this.calcAnnualExpenses();
}]);
