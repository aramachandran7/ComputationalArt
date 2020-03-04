// recursive color gradient triangle image generation, via P5.JS (based on
// Processing.)

// RGB  colors

var r = 255
var g = 128
var b = 0

// Math for lengths

const xlength = 60
const xsize = xlength*10
const ysize = xlength*1.73205080757*10/2


const ylength = xlength*1.73205080757/2

function setup() {
  createCanvas(xsize, ysize);
  noStroke();
  noLoop();
}


// draws a bunch of objects iteratively, then recursively.

function draw() {
  // iteratively loop through the triangles in the image.
  // Grayscale integer value
  background(51);
  for (i=0; i < xsize/xlength; i ++){
    // create color gradient by changing reference R, G, and B values
    // for every new column.
    r-=15
    g-=15
    b+=15
    for (z=0; z<ysize/ylength; z++){
      // drawing triangles with 5 levels of recursion
      drawTriangle(i*xlength, z*ylength, xlength, ylength, 4)
    }
  }
}


// recursive draw triangle function
function drawTriangle(xpos, ypos, xlen, ylen, level) {
  if (level == 1) {
    console.log('done')
  } else {
    // change fill and stroke values
    stroke('#222222');
    strokeWeight(3);
    fill(r, g-level*15, b+level*20)

    beginShape(TRIANGLES);
    vertex(xpos, ypos);
    vertex(xpos + xlen / 2, ypos + ylen);
    vertex(xpos + xlen, ypos);
    endShape();

    //recursively call drawTriangle with shifted position and size.
    drawTriangle(xpos+xlen/2, ypos-ylen/4,xlen*3/4, ylen*3/4,level-1 )

  }
}
