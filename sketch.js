var bgimg,bgsprite;
var gunsprite,gunimg;
var bullet,bulletimg;
var a1img,a2img,alien;
var randomy,alrand;
var score,alGG,alBG,bulletGroup;
var expl1,expl2,expl3,expl4,expl5;
var bombimg,bomb;
var life,lifeimg,lifeCount;
function preload(){
 bgimg = loadImage("images/background.png");
 gunimg = loadImage("images/gun.png");
 bulletimg = loadImage("images/bullet.png");
 a1img = loadImage("images/alien1.png");
 a2img = loadImage("images/alien2.png");
 expl1 = loadImage("images/expl1.png");
 expl2 = loadImage("images/expl2.png");
 expl3 = loadImage("images/expl3.png");
 expl4 = loadImage("images/expl4.png");
 expl5 = loadImage("images/expl5.png");
 bombimg = loadAnimation("images/expl1.png","images/expl2.png","images/expl3.png","images/expl4.png","images/expl5.png");
 lifeimg = loadImage("images/life.png");
}
function setup() {
  createCanvas(displayWidth-12, displayHeight-125);
  bgsprite = createSprite(displayWidth/2,displayHeight/2,1000,600);
  bgsprite.addImage(bgimg);
  bgsprite.velocityX = -10
  bgsprite.scale = 2.1;
  gunsprite = createSprite(90,(displayHeight/2)-40,40,40);
  gunsprite.addImage(gunimg);
  bulletGroup = new Group();
  alGG = new Group();
  alBG = new Group();
  score = 0;
  lifeCount = 3;
  lifes();
}

function draw() {
  background("black");
  if (bgsprite.x <0){
    bgsprite.x = displayWidth/2;
  }
  if (keyIsDown(DOWN_ARROW)){
    gunsprite.y = gunsprite.y+10;
  }
  if (keyIsDown(UP_ARROW)){
    gunsprite.y = gunsprite.y-10;
  }
  if (keyIsDown(32)){
  Shooting();
  }
  if (frameCount%25==0){
    alienSpawn();
  }
  //bomb shooting
  if (score>7&&keyIsDown(66)){
    bomb = createSprite(gunsprite.x,displayHeight/2,50,50);
    bomb.velocityX = 7
    alGG.destroyEach();
    alBG.destroyEach();
    score = score-7;
    //bomb.addAnimation("bomb",expl1);
    bomb.addAnimation("bombblast",bombimg);
    /*if (bomb.x=bomb.x){
      bomb.changeAnimation("bombblast")
      console.log("hi")
    }*/
    bomb.scale = 1.9
  }
  aldestroy();
  drawSprites();
  textSize(20);
  text("Score : " + score,displayWidth-150,60);
  
}
function Shooting(){
  if (frameCount%10==0){
    bullet = createSprite(gunsprite.x+95,gunsprite.y,50,10);
    bullet.velocityX = 5
    bullet.addImage(bulletimg);
    bullet.scale = .05
    bullet.lifetime = (displayWidth/bullet.velocityX);
    bulletGroup.add(bullet);
  }
}
function alienSpawn(){
  randomy = Math.round(random(80,displayHeight-80));
  alrand = Math.round(random(1,2));
  alien = createSprite(displayWidth,randomy,40,60);
  alien.velocityX = -10
  if (alrand == 1){
    alien.addImage(a1img);
    alien.scale = .5
    alGG.add(alien);
  }
  else{
    alien.addImage(a2img);
    alien.scale = .5
    alBG.add(alien);
  }
  alien.lifetime = (displayWidth/alien.velocityX);
}
function aldestroy(){
  for(var i=0;i<alGG.maxDepth();i=i+1){
    var al1=alGG.get(i);
    if(al1!=null&&bulletGroup.isTouching(al1)){
      al1.destroy();
      score=score+1;
      bulletGroup.destroyEach();
    }
  }
  for(var i=0;i<alBG.maxDepth();i=i+1){
    var al2=alBG.get(i);
    if(al2!=null&&bulletGroup.isTouching(al2)){
      al2.destroy();
      score=score+2;
      bulletGroup.destroyEach();
    }
  }
}
function lifes(){
  var xpos = 30
  for (var i = 0;i<lifeCount;i=i+1){
    life = createSprite(xpos,20,20,20);
    xpos = xpos + 50
    life.addImage(lifeimg);
    life.scale = .3
  }
}