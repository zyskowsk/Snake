SnakeGame.Utilities = (function () {

  var Utilities = {};

  Utilities.dirVector = function (array1, array2) {
    return [array1[0] - array2[0], array1[1]- array2[1]];
  }
  
  Utilities.arrayDifference = function (array1, array2) {
    var diffArray = [];
    _.each(array1, function(elem) {
      if (!Utilities.includes(array2, elem)) {
        diffArray.push(elem);
      }
    });

    return diffArray;
  }

  Utilities.areEqualArrays = function(array1, array2) {
    var sameLength = array1.length == array2.length;
    var equalElements = true;

    for(var i = 0, len = array1.length; i < len; i++) {
      if (array1[i] !== array2[i]) {
        equalElements = false;
      }
    }

    return sameLength && equalElements;
  } 

  Utilities.includes = function(array, element) {
    var includes = false;
    for (var i = 0, len = array.length; i < len; i++) {
      if(Utilities.areEqualArrays(array[i], element)) {
        includes = true;
      }
    }

    return includes;
  }

  Utilities.arrayIndex = function(array, subarray) {
    var index = null; 
    _(array).each(function (sub, idx) {
      if (SnakeGame.Utilities.areEqualArrays(sub, subarray)) {
        index = idx;
      }
    });

    return index;
  }

  return Utilities;
})();
