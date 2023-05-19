let particles = [];

let res = 8;

let img;

function preload() {
  img = loadImage("/ant.png");  
}

function setup() {
  createCanvas(500,500);
  placeParticles();
  noStroke();
}

function draw() {
  let c = color(255);
  background(c);
  
  for(let i = 0; i < particles.length; i ++) {
    particles[i].update();
    particles[i].draw();
  }
  
  // image(img, 0, 0, width, height);
}

function placeParticles() {
  for(let i = 0; i < width; i += res) {
    for(let j = 0; j < height; j += res) {
      let x = (i/width) * img.width;
      let y = (j/height) * img.height;
      let c = img.get(x, y);
      
      // if(c[3] != 0) {
      if(c[0] + c[1] + c[2] != 255 * 3) {
        particles.push(new Particle(i, j, c))
      }
      
    }
  }
}

class Particle {
  constructor(x, y, c) {
    this.x = x;
    this.y = y;
    
    this.c = c;
    
    this.homeX = x;
    this.homeY = y;
  }
  
  update() {
    
    // mouse
    let mouseD = dist(this.x, this.y, mouseX, mouseY);
    let mouseA = atan2(this.y - mouseY, this.x - mouseX);
    
    // home
    let homeD = dist(this.x, this.y, this.homeX, this.homeY);
    let homeA = atan2(this.homeY - this.y, this.homeX - this.x);
    
    // forces
    let mouseF = constrain(map(mouseD, 0, 100, 10, 0), 0, 10);
    let homeF = map(homeD, 0, 100, 0, 10);
    
    let vx = cos(mouseA) * mouseF;
    vx += cos(homeA) * homeF;
    
    let vy = sin(mouseA) * mouseF;
    vy += sin(homeA) * homeF;
    
    
    this.x += vx;
    this.y += vy;
  }
  
  draw() {
    // fill(0, 40);
    // stroke(0, 40);
    // ellipse(this.homeX, this.homeY, 5, 5);
    // line(this.x, this.y, this.homeX, this.homeY);
    // noStroke();
    fill(this.c);
    ellipse(this.x, this.y, res, res);
  }
}
