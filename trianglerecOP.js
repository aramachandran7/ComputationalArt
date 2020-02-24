// recursive color gradient triangle image generation, via P5.JS (based on
// Processing.)

// RGB  colors

var r = 255
var g = 128
var b = 0

// Math for lengths

const xlength = 60
const xsize = xlength * 10
const ysize = xlength * 1.73205080757 * 10 / 2


const ylength = xlength * 1.73205080757 / 2

function setup() {
  createCanvas(xsize, ysize);
  noStroke();
  noLoop();
}


// draws a bunch of objects iteratively, then recursively.

function draw() {
  // iteratively loop through the triangles in the image.
  for (i = 0; i < xsize / xlength; i++) {
    // create color gradient by changing reference R, G, and B values
    // for every new column.
    r -= 15
    g -= 15
    b += 15
    for (z = 0; z < ysize / ylength; z++) {
      // drawing triangles with 5 levels of recursion
      let drawAngle = 0
      while (drawAngle < 60){
        drawFinal(i * xlength, z * ylength, xlength, ylength, drawAngle, 5)
        drawAngle += 5
      }
    }
  }
}



// 4 ways to draw a shape from different persespectives.

// NEED TO FIGURE OUT ROTATION. lol

function drawR1(xpos, ypos, xlen, ylen, drawAngle, level){

  let dAngle = radians(drawAngle);
  beginShape(TRIANGLES);
  vertex(xpos + cos(dAngle), ypos + sin(dAngle));
  vertex(xpos + xlen / 2 + cos(dAngle), ypos + ylen+ sin(dAngle));
  vertex(xpos + xlen + cos(dAngle), ypos+ sin(dAngle));
  endShape();
}

function drawR2(xpos, ypos, xlen, ylen, drawAngle, level){
  let dAngle = radians(drawAngle);
  beginShape(TRIANGLES);
  vertex(xpos + cos(dAngle), ypos + sin(dAngle));
  vertex(xpos + xlen / 2 + cos(dAngle), ypos + ylen+ sin(dAngle));
  vertex(xpos + xlen + cos(dAngle), ypos+ sin(dAngle));
  endShape();
}
function drawR3(xpos, ypos, xlen, ylen, drawAngle, level){
  let dAngle = radians(drawAngle);
  beginShape(TRIANGLES);
  vertex(xpos + cos(dAngle), ypos + sin(dAngle));
  vertex(xpos + xlen / 2 + cos(dAngle), ypos + ylen+ sin(dAngle));
  vertex(xpos + xlen + cos(dAngle), ypos+ sin(dAngle));
  endShape();
}
function drawR4(xpos, ypos, xlen, ylen, drawAngle, level){
  let dAngle = radians(drawAngle);
  beginShape(TRIANGLES);
  vertex(xpos + cos(dAngle), ypos + sin(dAngle));
  vertex(xpos + xlen / 2 + cos(dAngle), ypos + ylen+ sin(dAngle));
  vertex(xpos + xlen + cos(dAngle), ypos+ sin(dAngle));
  endShape();
}

const drawChoices = [drawR1, drawR2, drawR3, drawR4]

// recursive draw triangle function
function drawFinal(xpos, ypos, xlen, ylen, drawAngle, level) {
  if (level == 1) {
    console.log('done')
  } else {
    // change fill and stroke values
    stroke('#222222');
    strokeWeight(3);
    fill(r, g - level * 15, b + level * 20)

    // randomly choosing the shape to draw
    let drawFunc = drawChoices[Math.floor(Math.random() * drawChoices.length)];
    console.log(drawFunc) // logging the choice
    drawFunc(xpos, ypos, xlen, ylen, drawAngle, level)
    //recursively call drawFinal with shifted position and size.
    // drawFinal(xpos + xlen / 2, ypos - ylen / 4, xlen * 3 / 4, ylen * 3 / 4, level - 1)

  }
}
