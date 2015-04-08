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
  var names = [
  {name:'Jani',country:'Norway'},
  {name:'Hege',country:'Sweden'},
  {name:'Kai',country:'Denmark'}];

  var names = names;

  return {
    // currencies: currencies,
    // convert: convert,
    names: names

  };
});
