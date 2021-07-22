var ground,groundImg
var line
var border1
var border2
var man,manImg
var bullet,bulletImg,bulletGroup
var car,carImg,carGroup
var truck,truckImg,truckGroup
var score
var gameOver,gameOverImg
var START
var END
var gamestate = "START"

function preload(){

  groundImg = loadImage("grass.jpg");
  gameOverImg = loadImage("gameisOver.png");
  manImg = loadImage("heroshoots1.png");
  carImg = loadImage("armycar1.png");
  bulletImg = loadImage("ammo.png");
  truckImg = loadImage("truck.png");
  
}

function setup() {
  
  createCanvas(600,400);
  
  ground = createSprite(300,200);
  ground.addImage(groundImg);
  ground.scale = 2.5;
 
  border1 = createSprite(300,1,600,1);
  border1.visible = false;
  
  border2 = createSprite(300,399,600,1);
  border2.visible = false;
  
  gameOver = createSprite(300,200);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 2;
  gameOver.visible = false;
  
  line = createSprite(10,200,5,400);
  
  man = createSprite(40,200,30,30);
  man.addImage(manImg);
  man.scale = 0.35
  
  score = 0;
  
  bulletGroup = new Group();
  carGroup = new Group();
  truckGroup = new Group();
  
}

function draw() {
 
  background("white");
  
  if(gamestate === "START"){
    
  spawnCar();
  spawnTruck();
  
  if(keyDown(UP_ARROW)){
    man.y = man.y - 20; 
  }
  
  if(keyDown(DOWN_ARROW)){
    man.y = man.y + 20;
  }
  
   if(man.isTouching(border1)){
     man.collide(border1);
   } 
    
  if(man.isTouching(border2)){
    man.collide(border2);
  }
    
  if(keyDown("space")){
    spawnBullet();
  }

  if(bulletGroup.isTouching(carGroup)){
    bulletGroup.destroyEach();
    carGroup.destroyEach();
    score = score + 1; 
  }
  
  if(bulletGroup.isTouching(truckGroup)){
    
    bulletGroup.destroyEach();
    truckGroup.destroyEach();
    score = score + 2;
  }
    
  if(carGroup.isTouching(line) || truckGroup.isTouching(line)){
    gamestate = "END";
  }
  }
  if(gamestate === "END"){
    
  ground.destroy();
  man.destroy();
  carGroup.destroyEach();
  truckGroup.destroyEach();
  line.destroy();
  gameOver.visible = true;
  
  textSize(50)
  fill("orange")
  text("Score: "+ score,175,300)
    
  if(keyDown("space")){
    
    gamestate = "START"
    gameOver.visible = false;
    score = 0;
    ground = createSprite(300,200);
    ground.addImage(groundImg);
    ground.scale = 2.5;
    man = createSprite(40,200,30,30);
    man.addImage(manImg);
    man.scale = 0.35;
    line = createSprite(10,200,5,400);
    
  }  
  
  }
  
  drawSprites();
  
}

function spawnBullet(){
  
  bullet = createSprite(55,man.y - 15,20,10)
  bullet.addImage(bulletImg)
  bullet.scale = 0.2;
  bullet.velocityX = 1.5;
  bullet.lifetime = 200;
  bulletGroup.add(bullet);
  
}

function spawnCar(){
  
 if(frameCount%300===0){
  
  car = createSprite(595,Math.round(random(25,375)),40,30);
  car.addImage(carImg);
  car.scale = 0.65;
  car.velocityX = -1;
  carGroup.add(car);

 }
}
function spawnTruck(){
  
  if(frameCount%400===0){
    
  truck = createSprite(595,Math.round(random(25,375)),40,30);
  truck.addImage(truckImg);
  truck.scale = 0.75;
  truck.velocityX = -1;
  truckGroup.add(truck);
    
  }
  
}