angular.module('testService', [])
.factory('otherFunc', function() {
  // var currencies = ['USD', 'EUR', 'CNY'];
  // var usdToForeignRates = {
  //   USD: 1,
  //   EUR: 0.74,
  //   CNY: 6.09
  // };
  // var convert = function (amount, inCurr, outCurr) {
  //   return amount * usdToForeignRates[outCurr] / usdToForeignRates[inCurr];
  // };
  //

  // Grab names from global variable
  var names = myNames;

// console.log(myNames);

  return {
    // currencies: currencies,
    // convert: convert,
    names: names

  };
});
