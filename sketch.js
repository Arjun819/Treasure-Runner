var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg,endImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

var coinFrame = 200
var diamondFrame = 320
var jewelFrame = 600
var swordFrame = 400
var seeBool = false

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadImage("gameOver.png");
}

function setup(){
  createCanvas(400,600)
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;

boy = createSprite(70,580,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;

gameOver = createSprite(200,200,50,50)
gameOver.addImage(endImg);
gameOver.scale = 0.9
gameOver.visible = false
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}
function draw() {

  if(gameState===PLAY){
  background(0);
  if(keyDown("right")){
    boy.x += 5 
  }
  if(keyDown("left")){
    boy.x -= 5
  }
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  if(path.y > 400 ){
    path.y = height/2;
  }

    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection+50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection+200

    }else if(jwelleryG.isTouching(boy)) {
      treasureCollection = treasureCollection + 500
    }
  }
    if(swordGroup.isTouching(boy)) {
      cashG.setVelocityYEach(0)
      cashG.destroyEach()
      
      diamondsG.setVelocityYEach(0)
      diamondsG.destroyEach()
      
      jwelleryG.setVelocityYEach(0)
      jwelleryG.destroyEach()
      
      swordGroup.setVelocityYEach(0)
      swordGroup.destroyEach()

      gameState = END
          }
if(gameState === END){
   gameOver.visible = true
}
  drawSprites();
  textSize(20);
  fill(255);
  text("Cash: "+ treasureCollection,50,30);
  }


function createCash() {
  if (World.frameCount % coinFrame == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % diamondFrame == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % jewelFrame == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % swordFrame == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}