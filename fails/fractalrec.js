//fractal.js

xsize = 720
ysize = 400

function setup(){
  createCanvas(xsize, ysize);
  noStroke();
  noLoop();
}

function draw(){
  // drawCircle(xpos, radius, level)
  drawTriangle(xsize/2, sidelength, 5)
}



function drawTriangle(centerPoint, sidelength, level){
  if (level==1){
    console.log('done')
  }
  else{
    drawTriangle()
  }
}




function drawCircle(xpos, radius, level){
  if (level==1){
  }
  else{
    drawCircle(xpos+radius, radius/2, level-1)
    ellipse(xpos, 200, radius/2, radius/2)
  }
}
