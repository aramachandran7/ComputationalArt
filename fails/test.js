// OG affinity code. 

const worldSize = 800;
const nEntities = 600;
const viewRadius = 60;
const cellDiam = 3.0;
const dt = 3.0;
const speedRange = 0.4;
const affinitySkew = 0.125;

const worldRad = worldSize / 2;
const viewRad2 = viewRadius * viewRadius;
const collDist2 = 4 * cellDiam * cellDiam;
let entities = [];

function createEntity() {
  this.px = random( worldSize );
  this.py = random( worldSize );
  this.hue = random( 1.0 );
  this.maxSpeed = random( 1.0-speedRange, 1.0 );
  this.clr = color( this.hue, 0.7, this.maxSpeed );
  let speed = this.maxSpeed;
  let dir = random( TAU );
  this.vx = speed * cos( dir );
  this.vy = speed * sin( dir );
}

function setup() {
  let canvasSize = min( windowWidth, windowHeight );
  createCanvas( canvasSize, canvasSize );
  colorMode( HSB, 1 );
  frameRate( 60 );

  for( let i=0; i<nEntities; i++ ) {
    entities.push( new createEntity );
  }
}

function windowResized() {
  let canvasSize = min( windowWidth, windowHeight );
  resizeCanvas( canvasSize, canvasSize );
}

function updateEntities() {
  for( let i=1; i<entities.length; i++ ) {
    let e = entities[i];
    for( let j=0; j<i; j++ ) {
      let e2 = entities[j];
      let dx = (e2.px-e.px+3*worldRad) % worldSize - worldRad;
      let dy = (e2.py-e.py+3*worldRad) % worldSize - worldRad;
      let d2 = sq( dx ) + sq( dy );
      if( d2 < collDist2 ) {
        // avoid collisions
        e.vx -= dx / (d2 + 10);
        e.vy -= dy / (d2 + 10);
        e2.vx += dx / (d2 + 10);
        e2.vy += dy / (d2 + 10);
      } else if( d2 < viewRad2 ) {
        // chase or flee from others
        var affinity = cos( (e2.hue - e.hue + affinitySkew) * TAU );
        e.vx += affinity * dx / (d2 + 1000);
        e.vy += affinity * dy / (d2 + 1000);
        affinity = cos( (e.hue - e2.hue + affinitySkew) * TAU );
        e2.vx -= affinity * dx / (d2 + 1000);
        e2.vy -= affinity * dy / (d2 + 1000);
      }
    }
  }
  for( let i=0; i<entities.length; i++ ) {
    // clamp the max speed
    let e = entities[i];
    let dir = atan2( e.vy, e.vx );
    let speed = sqrt( e.vx*e.vx+e.vy*e.vy );
    if( speed > e.maxSpeed ) speed = e.maxSpeed;
    e.vx = speed * cos( dir );
    e.vy = speed * sin( dir );
    e.px = (e.px + e.vx * dt + worldSize) % worldSize;
    e.py = (e.py + e.vy * dt + worldSize) % worldSize;
  }
}

function draw() {
  updateEntities();

  background( 0.33, 1, 0.1, 0.18 );
  scale( min( width, height ) / worldSize );
  strokeWeight( cellDiam );
  for( let i=0; i<entities.length; i++ ) {
    let e = entities[i];
    stroke( e.clr );
    line( e.px, e.py, e.px-dt*e.vx, e.py-dt*e.vy );
  }
}
