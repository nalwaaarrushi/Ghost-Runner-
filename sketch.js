var tower, towerImage; 
var ghost, ghostImage; 
var door, doorImage, doorGrp;  
var climber, climberImage, climberGrp; 
var invisibleClimber, invisibleClimberGrp; 
var PLAY =1; 
var END = 0;
var gameState = PLAY; 
var spookySound; 

function preload () { 
towerImage = loadImage("tower.png"); 
ghostImage = loadImage("ghost-jumping.png"); 
doorImage = loadImage("door.png"); 
climberImage = loadImage("climber.png"); 
spookySound = loadSound("spooky.wav"); 




}


function setup() { 
createCanvas(600, 600) 

tower = createSprite (300, 300, 600, 600);
tower.addImage("ti", towerImage); 
tower.velocityY = 1; 

//create the ghost 
ghost = createSprite (200, 400, 60, 80); 
ghost.addImage(ghostImage); 
ghost.scale = 0.4; 

doorGrp = new Group(); 
climberGrp = new Group(); 

invisibleClimberGrp = new Group; 

//spookySound.loop(); 
  


}




function draw() { 
background(0); 
if(gameState === PLAY){ 
  if(tower.y>600) { 
  tower.y = 300;  
  }
  
  if(keyDown("space")) { 
  ghost.velocityY = -5;
  }
  
  ghost.velocityY = ghost.velocityY+0.3; 
  
  if(keyDown("right")) { 
  ghost.x = ghost.x+5; 
  }
  
 if(keyDown("left")) { 
  ghost.x = ghost.x-5; 
  }
   
  if(climberGrp.isTouching(ghost)){ 
  ghost.velocityY = 0; 
  
  }

  doors(); 
  
if(invisibleClimberGrp.isTouching(ghost) || ghost.y> 600){ 
gameState = END; 
}
} 
  
  if(gameState === END){ 
  ghost.destroy(); 
  climberGrp.destroyEach(); 
  invisibleClimberGrp.destroyEach(); 
  tower.destroy(); 
  doorGrp.destroyEach(); 
  textSize(50); 
  fill("yellow"); 
  text("GAME OVER", 250, 300); 

  
  
  
  }
  




 


drawSprites(); 
  

}

function doors() { 
if(World.frameCount%240 === 0){ 
door = createSprite(200, 0, 20, 20); 
door.addImage(doorImage); 
door.velocityY = 1; 
door.x = Math.round(random(100, 500)); 
door.lifetime = 600; 
doorGrp.add(door); 
  
climber = createSprite(200, 0, 20, 20); 
climber.addImage(climberImage); 
climber.velocityY = 1; 
climber.x = door.x; 
climber.y= door.y +50; 
climber.lifetime = 600; 
climberGrp.add(climber); 
 
ghost.depth = climber.depth+2; 
  
invisibleClimber = createSprite(200, 0, 60, 20); 
invisibleClimber.velocityY = 1; 
invisibleClimber.x = door.x; 
invisibleClimber.y= door.y +65; 
invisibleClimber.lifetime = 600; 
invisibleClimberGrp.add(invisibleClimber); 

invisibleClimber.visible = false; 
  
  
} 


}








