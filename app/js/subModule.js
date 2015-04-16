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
    i1.min = 0;
    i1.max = 2000000;
    i1.step = 100;

    var i2 = new Input();
    i2.name = 'ownerEquity';
    i2.displayName = 'Owner Equity (%)';
    i2.value = 25;
    i2.min = 0;
    i2.max = 100;
    i2.step = 1;

    var i3 = new Input();
    i3.name = 'interestRate';
    i3.displayName = 'Interest Rate (WACC) (%)';
    i3.value = 12;
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
    this.chart = new google.visualization.PieChart(document.getElementById('donutchart'));
    this.chart.draw(this.chartData, this.options);
  };


  this.createStackedChartData = function(){
    //  My test data
    this.data = [
      {State: "Base Case", OandM: 5000, Inverters: 4000},
      {State: "Base Case2", OandM: 5000, Inverters: 1000},
      {State: "Base Case3", OandM: 5000, Inverters: 1000},
      {State: "Base Case4", OandM: 5000, Inverters: 1000},
      {State: "Start +60days", OandM: 5000, Inverters: 1000}
    ];
  };

  this.drawStackedChart = function(){

    this.createStackedChartData();

    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 200 - margin.left - margin.right,
        height = 350 - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .rangeRound([height, 0]);

    var color = d3.scale.ordinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(d3.format(".2s"));

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var data = this.data;
      color.domain(d3.keys(data[0]).filter(function(key) { return key !== "State"; }));

      data.forEach(function(d) {
        var y0 = 0;
        d.ages = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
        d.total = d.ages[d.ages.length - 1].y1;

      data.forEach(function(d) {
        var y0 = 0;
        d.ages = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
        d.total = d.ages[d.ages.length - 1].y1;
      });

      data.sort(function(a, b) { return b.total - a.total; });

      x.domain(data.map(function(d) { return d.State; }));
      y.domain([0, d3.max(data, function(d) { return d.total; })]);

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Population");

      var state = svg.selectAll(".state")
          .data(data)
        .enter().append("g")
          .attr("class", "g")
          .attr("transform", function(d) { return "translate(" + x(d.State) + ",0)"; });

      state.selectAll("rect")
          .data(function(d) { return d.ages; })
        .enter().append("rect")
          .attr("width", x.rangeBand())
          .attr("y", function(d) { return y(d.y1); })
          .attr("height", function(d) { return y(d.y0) - y(d.y1); })
          .style("fill", function(d) { return color(d.name); });

      var legend = svg.selectAll(".legend")
          .data(color.domain().slice().reverse())
        .enter().append("g")
          .attr("class", "legend")
          .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

      legend.append("rect")
          .attr("x", width - 18)
          .attr("width", 18)
          .attr("height", 18)
          .style("fill", color);

      legend.append("text")
          .attr("x", width - 24)
          .attr("y", 9)
          .attr("dy", ".35em")
          .style("text-anchor", "end")
          .text(function(d) { return d; });

    });

  };

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
    setGraphOptions: this.setGraphOptions,
    annualExpensesTotalStr: this.annualExpensesTotalStr,
    drawStackedChart: this.drawStackedChart,
    createStackedChartData: this.createStackedChartData,
    data: this.data
  };

});
