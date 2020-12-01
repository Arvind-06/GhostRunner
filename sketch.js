var tow,towI;
var door,doorI;
var climb,climbI;
var ghost,ghostI;
var spike;
var gameState="play";
var sound,soundL;
function preload(){
  towI=loadImage("tower.png");
  
  doorI=loadImage("door.png");
  
  climbI=loadImage("climber.png");
  
  ghostI=loadImage("ghost-standing.png");
  
  soundL=loadSound("spooky.wav");
}
function setup(){
  createCanvas(600,600);
  
   soundL.loop();
  
  tow=createSprite(300,300,20,20);
  tow.addImage(towI);
  tow.velocityY=2;
  
  ghost=createSprite(300,300,20,20);
  ghost.addImage(ghostI);
  ghost.scale=0.4;
  

  doorGroup=createGroup();
  climbGroup=createGroup();
  spikeGroup=createGroup();
}
function draw(){
  background("black");
  
  
  
  if(gameState==="play"){
  Door();
  Climb();
  
    
  if(keyDown("space")){
    ghost.velocityY=-12; 
  }
  
  if(keyDown("left")){
    ghost.x=ghost.x-1.8;
  }
  
  if(keyDown("right")){
    ghost.x=ghost.x+1.8;
  }
  
  if(climbGroup.isTouching(ghost)){
    ghost.velocityY=0;  
  }
  
  if(spikeGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gameState="end";
  }
  
  ghost.velocityY=ghost.velocityY+0.8
  if(tow.y>410){
    tow.y=300;
  }
  drawSprites();
  }
  
  if(gameState==="end"){
   stroke("red");
   fill("red");
   textSize(50);
   text("GAME OVER",125,300);
  }
}

function Door(){
  if(frameCount%250===0){
    
  
  door=createSprite(250,-10,20,20);
    door.x=Math.round(random(120,400))
  door.addImage(doorI);
  door.velocityY=2;
  
  
  door.lifetime=300;
  
  doorGroup.add(door);
    
    ghost.depth=door.depth;
  ghost.depth=ghost.depth+1;
  }
}

function Climb(){
  if(frameCount%250===0){
    
  
  climb=createSprite(250,45,20,20);
    climb.x=door.x
  climb.addImage(climbI);
  climb.velocityY=2;
   climb.lifetime=300;
  
  climbGroup.add(climb);
    
 
    
  
  spike=createSprite(250,50,20,20);
  spike.x=door.x
  spike.velocityY=2;
  spike.width=climb.width; 
  
  spike.lifetime=300;
  spikeGroup.add(spike);
    spike.visible=false;  

  }
  
}