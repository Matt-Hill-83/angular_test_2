// Monkey patch in new function on String.prototype to format currency numbers
String.prototype.insertComma = function() {
  // Remove number past decimal.
  var arr  = this.split(".");
  var newStr = arr[0];

  // Insert commas at appropriate locations.
  if (newStr.length > 6) {
    return (newStr.slice(0,-6) + "," + newStr.slice(-6, -3) + "," + newStr.slice(-3));
  } else if (newStr.length > 3) {
    return (newStr.slice(0,-3) + "," + newStr.slice(-3));
  }else{
    return newStr.slice(0);
  }
};
