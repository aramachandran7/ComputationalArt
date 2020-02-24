//triangle image generation
//fractal.js

// reference colors

// coreOrange = (255, 128, 0)
// coreBlue = (66, 122, 173)
// coreDark = (36, 49, 61)
// coreWhite = (255,255,255)

const r = 255
const g = 128
const b = 0

const xlength = 100
const xsize = xlength*10
const ysize = xlength*1.73205080757*10/2


const ylength = xlength*1.73205080757/2

function setup() {
  createCanvas(xsize, ysize);
  noStroke();
  noLoop();
}


// draws a fuckton of objects iteratively, then recursivelyHmmm.

function draw() {

  drawTriangle(300, 300, 300, 300, 8)

  // iteratively loop through the triangles

  // for (i=0; i < xsize/xlength; i ++){
  //   for (z=0; z<ysize/ylength; z++){
  //     // drawSimple(i*xlength, z*ylength, xlength, ylength)
  //     drawTriangle(i*xlength, z*ylength, xlength, ylength, 6)
  //   }
  // }
}


function drawTriangle(xpos, ypos, xlen, ylen, level) {
  if (level == 1) {
    console.log('done')
  } else {


    // change fill values
    // const tt = (126 * level) / 4.0;
    // fill(tt);
    stroke('#544c4c');
    strokeWeight(.5);
    // if (level%2==1){
    //   fill(255, 128, 0);
    // }else{fill(66, 122, 173)}
    // noFill()
    fill(r, g-level*15, b+level*20)

    beginShape(TRIANGLES);
    vertex(xpos, ypos);
    vertex(xpos + xlen / 2, ypos + ylen);
    vertex(xpos + xlen, ypos);
    endShape();

    //recursively call drawTriangle
    // drawTriangle(xpos+xlen/2, ypos-ylen/4,xlen*3/4, ylen*3/4,level-1 )
    drawTriangle(xpos, ypos, xlen/2, ylen/2, level-1 )
    drawTriangle(xpos+xlen/2, ypos, xlen/2, ylen/2, level-1 )
    drawTriangle(xpos+xlen/4, ypos+ylen/2, xlen/2, ylen/2, level-1 )


  }
}
