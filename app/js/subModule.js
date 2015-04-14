angular.module('subModule', [])
.factory('currencyConverter', function() {
  var currencies = ['USD', 'EUR', 'CNY'];
  var usdToForeignRates = {
    USD: 1,
    EUR: 0.74,
    CNY: 6.09
  };
  var convert = function (amount, inCurr, outCurr) {
    return amount * usdToForeignRates[outCurr] / usdToForeignRates[inCurr];
  };

  var calcAnnualIncome = function (inputsHash){
    console.log(inputsHash);
    var annualIncome = inputsHash['input1'] +
                       inputsHash['input2'] +
                       inputsHash['input3'] +
                       inputsHash['input4'];
    return annualIncome;
  };













  return {
    currencies: currencies,
    convert: convert,
    calcAnnualIncome: calcAnnualIncome
  };

});
