const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world, backgroundImg;
var canvas, angle, tower, ground, cannon;
var cannonBall;
balls = [];
boats = [];

function preload() {
  backgroundImg = loadImage("./assets/background.gif");
  towerImage = loadImage("./assets/tower.png");
}

function setup() {
  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;

  angleMode(DEGREES);
  angle = 15;
  tower = new Tower(160, 350, 160, 310);
  ground = new Ground(600, 590, 1200, 10);
  cannon = new Cannon(180, 110, 130, 100, angle);
}

function draw() {
  background(189);
  image(backgroundImg, 0, 0, width, height);

  Engine.update(engine);
  tower.display();
  cannon.display();
  //ground.display();
  displayCannonBall();
  generateBoats();
}

function keyReleased() {
  if (keyCode === DOWN_ARROW) {
    balls[balls.length - 1].shoot();
  }
}

function keyPressed() {
  if (keyCode === DOWN_ARROW) {
    cannonBall = new CannonBall(cannon.x, cannon.y);
    balls.push(cannonBall);
  }
}

function displayCannonBall() {
  for (var i = 0; i < balls.length; i = i + 1) {
    balls[i].display();
  }
}

function generateBoats() {
  if (boats.length === 0) {
    boat = new Boat(1130, 530, 170, 170, -80);
    boats.push(boat)
  }
  else {
    if ( boats[boats.length - 1] === undefined || boats[boats.length - 1].body.position.x < width - 300 )
    {
      var positions = [-40,-60,-70,-20]
      var p = random(positions)
      boat = new Boat(1130, 530, 170, 170, p);
      boats.push(boat)
    }
    for(var i = 0; i<boats.length; i=i+1){
      Matter.Body.setVelocity(boats[i].body, { x: -0.9, y: 0 });
      boats[i].display()
    }
  }
}
