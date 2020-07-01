var this_js_script = $('script[src*=somefile]');

var time = 0;
// compare two adjacent values for bubble sort
function compare(j){
  if ((bars[j]) < (bars[j-1])){
    var x = bars[j];
    bars[j] = bars[j-1];
    bars[j-1] = x;
    var ind1 = '#' + (bars[j]);
    var ind2 = '#' + (bars[j-1]);
    setTimeout(function(){
      $(ind2).css("background-color", "red");
      $(ind1).css("background-color", "red");
    }, time);
    time+=25;
    setTimeout(function(){
      $(ind2).insertBefore(ind1);
    }, time);
    time+=25;
    setTimeout(function(){
      $(ind1).css("background-color", "#0066ff");
      $(ind2).css("background-color", "#0066ff");
    }, time);
  }
}

var mergeTime = 0;
// rearrange the bars so that it is like the array for merge sort
function mergeRearrange(array, i){
  var ind1 = '#' + array[i];
  var ind2 = '#' + array[i+1];
  setTimeout(function(){
    $(ind2).css("background-color", "red");
    $(ind1).css("background-color", "red");
  }, mergeTime);
  mergeTime+=25;
  setTimeout(function(){
    $(ind1).insertBefore(ind2);
  }, mergeTime);
  mergeTime+=25;
  setTimeout(function(){
    $(ind1).css("background-color", "#0066ff");
    $(ind2).css("background-color", "#0066ff");
  }, mergeTime);
}

// merge two array in ascending order
function merge(array1, array2){
  var sorted = [];
  while (array1.length && array2.length) {
    if (array1[0] < array2[0]){
      sorted.push(array1.shift());
    } else {
      sorted.push(array2.shift());
    }
  };
  sorted = sorted.concat(array1.slice().concat(array2.slice()));
  for (var i = sorted.length-2; i >= 0; i--){
    mergeRearrange(sorted, i);
  }
  return sorted;
};

// merge sort function
function mergeSort(array){
  if (array.length <= 1) return array;
  var mid = Math.floor(array.length / 2),
      left = mergeSort(array.slice(0, mid)),
      right = mergeSort(array.slice(mid));
  return merge(left, right);
};

var quickTime = 0;
// place the bar at i before the pivot
function quickRearrangeLeft(array, pivot, i){
  var ind1 = '#' + array[i];
  var ind2 = '#' + pivot;
  setTimeout(function(){
    $(ind2).css("background-color", "red");
    $(ind1).css("background-color", "red");
  }, quickTime);
  quickTime+=25;
  setTimeout(function(){
    $(ind1).insertBefore(ind2);
  }, quickTime);
  quickTime+=25;
  setTimeout(function(){
    $(ind1).css("background-color", "#0066ff");
    $(ind2).css("background-color", "#0066ff");
  }, quickTime);
}

// place the bar at i after the pivot
function quickRearrangeRight(array, pivot, i){
  var ind1 = '#' + array[i];
  var ind2 = '#' + pivot;
  setTimeout(function(){
    $(ind2).css("background-color", "red");
    $(ind1).css("background-color", "red");
  }, quickTime);
  quickTime+=25;
  setTimeout(function(){
    $(ind1).insertAfter(ind2);
  }, quickTime);
  quickTime+=25;
  setTimeout(function(){
    $(ind1).css("background-color", "#0066ff");
    $(ind2).css("background-color", "#0066ff");
  }, quickTime);
}

// function for quick sort
function quickSort(array) {
	if (array.length <= 1) {
		return array;
	} else {
		var left = [];
		var right = [];
		var newArray = [];
		var pivot = array.pop();
		var length = array.length;
		for (var i = 0; i < length; i++) {
			if (array[i] <= pivot) {
				left.push(array[i]);
        quickRearrangeLeft(array, pivot, i);
			} else {
				right.push(array[i]);
        quickRearrangeRight(array, pivot, i);
			}
		}
		return newArray.concat(quickSort(left), pivot, quickSort(right));
	}
}

var heapTime = 0;
// swap the elements at positions i and j of the array
function heapSwap(array, i, j){
  var ind1 = '#' + array[j];
  var ind2 = '#' + array[i];
  var temp1 = $(ind1).clone();
  var temp2 = $(ind2).clone();
  setTimeout(function(){
    $(ind2).css("background-color", "red");
    $(ind1).css("background-color", "red");
  }, heapTime);
  heapTime+=25;
  setTimeout(function(){
    $(ind1).replaceWith(temp2);
    $(ind2).replaceWith(temp1);
  }, heapTime);
  heapTime+=25;
  setTimeout(function(){
    $(ind1).css("background-color", "#0066ff");
    $(ind2).css("background-color", "#0066ff");
  }, heapTime);
}

var array_length;
//
function heap_root(array, i) {
  var left = 2 * i + 1;
  var right = 2 * i + 2;
  var max = i;
  if (left < array_length && array[left] > array[max]) {
    max = left;
  }
  if (right < array_length && array[right] > array[max]) {
    max = right;
  }
  if (max != i) {
    heapSwap(array, i, max);
    [array[i], array[max]] = [array[max], array[i]];
    heap_root(array, max);
  }
}

var insertionTime = 0;
// rearrange the bars so that it resembles the array.
function insertionRearrange(array, i, key){
  var ind1 = '#' + array[i];
  var ind2 = '#' + key;
  setTimeout(function(){
    $(ind2).css("background-color", "red");
    $(ind1).css("background-color", "red");
  }, insertionTime);
  insertionTime+=25;
  setTimeout(function(){
    $(ind2).insertBefore(ind1);
  }, insertionTime);
  insertionTime+=25;
  setTimeout(function(){
    $(ind1).css("background-color", "#0066ff");
    $(ind2).css("background-color", "#0066ff");
  }, insertionTime);
}

// function for insertion sort.
function insertionSort(array){
  var n = array.length;
  for (var i = 1; i < n; i++){
    var key = array[i];
    let j = i-1;
    while (j >= 0 && key < array[j]){
      insertionRearrange(array, j, key);
      array[j+1] = array[j];
      j--;
    }
    array[j+1] = key;
  }
}

$(document).ready(function(obj){
  $("#bubbleSort").click(function(){
    $("#bubbleSort").attr("disabled", true);
    $("#insertionSort").attr("disabled", true);
    $("#mergeSort").attr("disabled", true);
    $("#heapSort").attr("disabled", true);
    $("#quickSort").attr("disabled", true);
    var n = bars.length;
    console.log(bars);
    for (var i = 0; i < n; i++){
      for (var j = n-1; j > i; j-=1){
        compare(j);
      }
    }
  });

  $("#insertionSort").click(function(){
    $("#bubbleSort").attr("disabled", true);
    $("#insertionSort").attr("disabled", true);
    $("#mergeSort").attr("disabled", true);
    $("#heapSort").attr("disabled", true);
    $("#quickSort").attr("disabled", true);
    var n = bars.length;
    insertionSort(bars);
  });

  $("#mergeSort").click(function(){
    $("#bubbleSort").attr("disabled", true);
    $("#insertionSort").attr("disabled", true);
    $("#mergeSort").attr("disabled", true);
    $("#heapSort").attr("disabled", true);
    $("#quickSort").attr("disabled", true);
    bars = mergeSort(bars);
  });

  $("#quickSort").click(function(){
    $("#bubbleSort").attr("disabled", true);
    $("#insertionSort").attr("disabled", true);
    $("#mergeSort").attr("disabled", true);
    $("#heapSort").attr("disabled", true);
    $("#quickSort").attr("disabled", true);
    bars = quickSort(bars);
  });

  $("#heapSort").click(function(){
    $("#bubbleSort").attr("disabled", true);
    $("#insertionSort").attr("disabled", true);
    $("#mergeSort").attr("disabled", true);
    $("#heapSort").attr("disabled", true);
    $("#quickSort").attr("disabled", true);
    array_length = bars.length;
    for (var i = Math.floor(array_length / 2); i >= 0; i -= 1)      {
      heap_root(bars, i);
    }
    for (i = bars.length - 1; i > 0; i--) {
      heapSwap(bars, 0, i);
      [bars[i], bars[0]] = [bars[0], bars[i]];
      array_length--;
      heap_root(bars, 0);
    }
    console.log(bars);
  });
});
