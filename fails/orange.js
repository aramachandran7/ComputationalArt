// orange movement
// hides from mouse
// moves x, direction only. random y direction



// affinity-like code

// set up consts


var counter = 0
const worldSize = 600
const nEntities = 5
const viewRadius = 60
const dt = 3.0
const cellDiam = 3.0
const speedRange = 0.4
const affinitySkew = 0.125

const worldRad = worldSize / 2
const viewRad2 = viewRadius*viewRadius
const collDist2 = 4*cellDiam*cellDiam
let entities = []

// all of these have the same direction and speed
const dir = random(TAU)
const constMaxSpeed = random(1.0-speedRange, 1)


function createEntity(){
  this.px = random(worldSize)
  this.py = random(worldSize)
  // this.hue = random(1.0)
  this.maxSpeed = constMaxSpeed
  this.clr = color(222, 115, 0)
  let speed = this.maxSpeed

  // old color code to cross verify
  // this.clr = color(this.hue, 0.7, this.maxSpeed)

  this.vx = cos(dir)*speed
  this.vy = sin(dir)*speed
}


// mouse actions !!!


function setup(){
  let canvasSize = min(windowWidth, windowHeight)
  createCanvas(canvasSize, canvasSize)
  colorMode(HSB, 1)
  frameRate(60)

  for ( let i = 0; i < nEntities; i ++){
    entities.push(new createEntity)
  }
}


function windowResized(){
  let canvasSize =  min(windowWidth, windowHeight)
  resizeCanvas(canvasSize, canvasSize)
}


function updateEntities(){

  // big picture:
  // runs through all the possible 'interactions', doing the
  // needed calculations to find the distance between all entities.
  for ( let i = 1; i<entities.length; i++){
    let e = entities[i]
    for ( let j=0; j<i; j++){
      let e2 = entities[j]
      let dx = (e2.px-e.px+3*worldRad) % worldSize - worldRad
      let dy = (e2.py-e.py+3*worldRad) % worldSize - worldRad
      let d2 = sq(dx) + sq(dy)

      if (d2<collDist2){
        // avoid collision by changing velocities
        e.vx -= dx/(d2+10)
        e.vy -= dy/(d2+10)
        e2.vy -= dy/(d2+10)
        e2.vy -= dy/(d2+10)
      } else if (d2<viewRad2){
        // check if it's in the 'view', and 'avoid' eachother
        // also change colors cause why not. huh
        var affinity = cos((e2.hue-e.hue + affinitySkew)*TAU)
        e.vx += affinity*dx/(d2+1000)
        e.vy += affinity*dy/(d2+1000)
        affinity = cos((e.hue-e2.hue+affinitySkew)*TAU)
        e2.vy -= affinity*dx/(d2+1000)
        e2.vy -= affinity*dy/(d2+1000)
      }
    }
  }
  //checking and setting max speeds
  for ( let i=0; i < entities.length; i++){
    let e = entities[i]
    let dir = atan2(e.vy, e.vx)
    let speed = sqrt(e.vx*e.vx + e.vy*e.vy)
    if (speed>e.maxSpeed) {
      speed = e.maxSpeed;
      e.vx = speed * cos( dir );
      e.vy = speed * sin( dir );
      e.px = (e.px + e.vx * dt + worldSize) % worldSize;
      e.py = (e.py + e.vy * dt + worldSize) % worldSize;
  }
}
}



function draw(){
  updateEntities()
  counter += 1
  // entities.push(new spawnEntity)
  // console.log('hi')
  // entities.push(new createEntity)
  if (counter%5==0 && counter<1000){
    entities.push(new createEntity)
  }
  if (counter>1000){
   console.log('completed')
  }

  background(0.33, 1, 0.1, 0.18)
  scale(min(width, height)/worldSize)
  strokeWeight(cellDiam)
  for (let i = 0; i<entities.length; i ++){
    let e = entities[i]
    stroke(e.clr)
    line(e.px, e.py, e.px-dt*e.vx, e.py-dt*e.vy)
  }
}




// I want a world that can spawn entitties and leave trails

// I want a world that can spawn entitties and leave trails
