const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;

var ground;
var corda;
var melancia;
var backgroundimage
var melanciaimage
var coelhoimage
var coelho
var botao
var botao2
var botao3
var pisca
var come
var chorando
var comendosound
var cortandosound
var sadsound
var somdefundosound
var airsound
var botaodosom
function preload(){
backgroundimage=loadImage("assets/background.png")
melanciaimage=loadImage("assets/melon.png")
coelhoimage=loadImage("assets/Rabbit-01.png")
pisca=loadAnimation("assets/blink_1.png","assets/blink_2.png","assets/blink_3.png")
come=loadAnimation("assets/eat_0.png","assets/eat_1.png","assets/eat_2.png","assets/eat_3.png","assets/eat_4.png")
chorando=loadAnimation("assets/sad_1.png","assets/sad_2.png","assets/sad_3.png")
comendosound=loadSound("assets/eating_sound.mp3")
cortandosound=loadSound("assets/rope_cut.mp3")
somdefundosound=loadSound("assets/sound1.mp3")
sadsound=loadSound("assets/sad.wav")
airsound=loadSound("assets/air.wav")
pisca.playing=true
come.playing=true
chorando.playing=true
come.looping=false
chorando.looping=false
}
function setup() 
{
  var ismobile=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(ismobile){
    canW=displayWidth;
    canH=displayHeight;
    createCanvas(canW+80,canH)
  } else{
    canW=windowWidth;
    canH=windowHeight;
    createCanvas(canW,canH)
  }
 coelho= createSprite(canW*0.25,canH-80,100,100)
 coelho.addImage(coelhoimage)
 coelho.scale=0.2
  frameRate(80);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(canW/2,canH,canW,20);
 
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50);
  corda = new Rope(6,{x:245,y:30});
  corda2 = new Rope(7,{x:370,y:40});
  corda3 = new Rope(4,{x:400,y:225});
  var melancia_options={
    density:0.001
  }
  melancia=Bodies.circle(300,300,15,melancia_options);
  Matter.Composite.add(corda.body,melancia)
  ligacao=new Link(corda,melancia)
  ligacao2=new Link(corda2,melancia)
  ligacao3=new Link(corda3,melancia)
  imageMode(CENTER)
  botao=createImg("assets/cut_btn.png");
  botao.position(220,30);
  botao.size(50,50);
  botao.mouseClicked(caiu)
  botao2=createImg("assets/cut_btn.png");
  botao2.position(330,35);
  botao2.size(50,50);
  botao2.mouseClicked(caiu2)
  botao3=createImg("assets/cut_btn.png");
  botao3.position(360,200);
  botao3.size(50,50);
  botao3.mouseClicked(caiu3)
  pisca.frameDelay=20
  chorando.frameDelay=20
  come.frameDelay=20
  coelho.addAnimation("piscando",pisca)
  coelho.addAnimation("comendo",come)
  coelho.addAnimation("chorando",chorando)
  coelho.changeAnimation("piscando")
  somdefundosound.play();
  somdefundosound.setVolume(0.5)
  botaodosom=createImg("assets/mute.png");
  botaodosom.position(450,20);
  botaodosom.size(50,50);
  botaodosom.mouseClicked(mutar)
  botaodobalao=createImg("assets/balloon.png");
botaodobalao.position(10,250);
botaodobalao.size(150,100);
botaodobalao.mouseClicked(balao)
}

function draw() 
{
  background(51);
  image(backgroundimage,canW/2,canH/2,canW+80,canH)
  Engine.update(engine);

  ground.show();
   corda.show()
   corda2.show()
   corda3.show()
   if(melancia!=null){
    image(melanciaimage,melancia.position.x,melancia.position.y,70,70)
   }
   if(colisao(melancia,coelho)==true){
    coelho.changeAnimation("comendo")
    comendosound.play()
   }
   if(melancia!=null && melancia.position.y>=canH*0.9){
    coelho.changeAnimation("chorando")
    sadsound.play()
    melancia=null
   }
   drawSprites()
}
  function colisao (body,sprite){
if(body!=null){
  var D=dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
  if(D<80){
    World.remove(world,melancia);
    melancia=null;
    return true
  } else{
    return false
  }
}
  }
function caiu(){
  corda.break();
  ligacao.cortaacorda();
  ligacao=null
  cortandosound .play()
}
function caiu2(){
  corda2.break();
  ligacao2.cortaacorda();
  ligacao2=null
  cortandosound .play()
}
function caiu3(){
  corda3.break();
  ligacao3.cortaacorda();
  ligacao3=null
  cortandosound .play()
}
function mutar(){
  if(somdefundosound.isPlaying()){
    somdefundosound.stop()
  } else{
    somdefundosound.play()
  }
}
function balao(){
  Matter.Body.applyForce(melancia,{x:0,y:0},{x:0.01,y:0});
  airsound.play()
  airsound.setVolume(0.2)
}