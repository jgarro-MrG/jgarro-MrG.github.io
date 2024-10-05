// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#apply-no-bkg").on("click", applyNoBackgroundAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here
  applyFilter(reddify);
  // applyFilter(decreaseBlue);
  // applyFilter(increaseGreenByBlue);
  

  // do not change the below line of code
  render($("#display"), image);
}

function applyNoBackgroundAndRender() {
  // Multiple TODOs: Call your apply function(s) here
  applyFilterNoBackground(reddify);
  applyFilterNoBackground(decreaseBlue);
  applyFilterNoBackground(increaseGreenByBlue);
  

  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here
function applyFilter(filterFunction) {
  filterFunction(image);
}

// TODO 7: Create the applyFilterNoBackground function
function applyFilterNoBackground(filterFunction) {
  filterFunction(image);
  var originalBkgColor = rgbStringToArray(og[0][0]);
  var currentBkgColor = rgbStringToArray(image[0][0]);
  for (var i = 0; i<image.length; i++) {
    for (var j = 0; j<image[i].length; j++) {
      var rgbPixel = rgbStringToArray(image[i][j]);
      if (rgbPixel[RED] === currentBkgColor[RED] && 
          rgbPixel[GREEN] === currentBkgColor[GREEN] && 
          rgbPixel[BLUE] === currentBkgColor[BLUE]) {       
        rgbPixel[RED] = originalBkgColor[RED];
        rgbPixel[GREEN] = originalBkgColor[GREEN];
        rgbPixel[BLUE] = originalBkgColor[BLUE];
      }
      image[i][j] = rgbArrayToString(rgbPixel);
    }  
  }
  
  
  
}

// TODO 5: Create the keepInBounds function
function keepInBounds(number) {
  return number < 0 || number > 255 ? Math.min(255,Math.max(0,number)) : number ;
}

// TODO 3: Create reddify function
function reddify(image) {
  for (var i = 0; i<image.length; i++) {
    for (var j = 0; j<image[i].length; j++) {
      var rgbString = image[i][j];
      var rgbNumbers = rgbStringToArray(rgbString);
      rgbNumbers[RED] = 200;
      rgbString = rgbArrayToString(rgbNumbers);
      image[i][j] = rgbString;
    }  
  }
}

// TODO 6: Create more filter functions
function decreaseBlue(image) {
  for (var i = 0; i<image.length; i++) {
    for (var j = 0; j<image[i].length; j++) {
      var rgbString = image[i][j];
      var rgbNumbers = rgbStringToArray(rgbString);
      rgbNumbers[BLUE] = keepInBounds(rgbNumbers[BLUE] - 50);
      rgbString = rgbArrayToString(rgbNumbers);
      image[i][j] = rgbString;
    }  
  }
}

function increaseGreenByBlue(image) {
  for (var i = 0; i<image.length; i++) {
    for (var j = 0; j<image[i].length; j++) {
      var rgbString = image[i][j];
      var rgbNumbers = rgbStringToArray(rgbString);
      rgbNumbers[GREEN] = keepInBounds(rgbNumbers[GREEN] + rgbNumbers[BLUE]);
      rgbString = rgbArrayToString(rgbNumbers);
      image[i][j] = rgbString;
    }  
  }
}

// CHALLENGE code goes below here
