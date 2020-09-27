var monkey, monkey_running;
var banana, bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var ground;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");

}



function setup() {

  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
  ground.x = ground.width / 2;
  console.log(ground.width);

  FoodGroup = createGroup();
  obstacleGroup = createGroup();

  var survivalTime = 0;

  stroke("white");
  textSize(20);
  fill("white");
  text("Socre" + score, 500, 50);

  stroke("black");
  textSize(20);
  fill("black");

}


function draw() {

  background("green");

  survivalTime = Math.ceil(frameCount / getFrameRate());
  text("Survival Time: " + survivalTime, 100, 50);

  if (ground.x < 0) {
    ground.x = ground.width / 2;
  }


  //jump when the space key is pressed
  if (keyDown("space")) {
    monkey.velocityY = -12;
  }

  if (FoodGroup.isTouching(monkey)) {
    FoodGroup.destroyEach();
  }

  if (obstacleGroup.isTouching(monkey)) {

    FoodGroup.destroyEach();
  }

  //add gravity
  monkey.velocityY = monkey.velocityY + 0.8

  monkey.collide(ground);

  spawnFood();

  obstacles();

  drawSprites();
}

function spawnFood() {

  if (frameCount % 80 === 0) {
    var banana = createSprite(400, 200, 10, 10);
    banana.y = Math.round(random(120, 200));
    banana.addImage(bananaImage);
    banana.velocityX = -3;
    banana.lifetime = 200;
    banana.scale = 0.1;

    FoodGroup.add(banana);
  }
}

function obstacles() {

  if (frameCount % 300 === 0) {
    var obstacle = createSprite(250, 325, 10, 10);
    obstacle.addImage(obstaceImage);
    obstacle.velocityX = -3;
    obstacle.lifetime = 200;
    obstacle.scale = 0.1

    obstacleGroup.add(obstacle);
  }
}