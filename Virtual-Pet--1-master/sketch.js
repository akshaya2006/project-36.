//Create variables here
var dog, sadDog, happyDog, garden, washroom, database;
var foodS, foodStock;
var fedTime, lastFed, currentTime;
var feed, addFood;
var foodObj;
var gameState, readState;

function preload() {
  sadDog = loadImage("Images/Dog.png");
  happyDog = loadImage("Images/happy dog.png");
  garden = loadImage("Images/Garden.png");
  washroom = loadImage("Images/Wash Room.png");
  bedroom = loadImage("Images/Bed Room.png");
}

function setup() {
  database = firebase.database();
  createCanvas(1200, 500);

  foodObj = new Food();

  foodStock = database.ref("Food");
  foodStock.on("value", readStock);

  fedTime = database.ref("FeedTime");
  fedTime.on("value", function (data) {
    lastFed = data.val();
  });

  readState = database.ref("gameState");
  readState.on("value", function (data) {
    gameState = data.val();
  
  });

  dog = createSprite(200,400,150,150);
  dog.addImage(sadDog);
  dog.scale = 0.15;


  addFood = createButton("Add Food");
  addFood.position(800, 95);
  addFood.mousePressed(addFoods);

  feed = createButton("Feed the dog");
  feed.position(700, 95);
  feed.mousePressed(feedDog);

 
}

function draw() {
  background("yellow");

  foodObj.display();
  writeStock(foodS);

  if (fooS == 0){
    dog.addImage(happyDog);
    milkBottle2.visible=false;
  } else{
    dog.addImage(sadDog);
    milkBottle2.visible=true;
  }
  currentTime = hour();

  
  if (currentTime == lastFed + 1) {
    update("Playing");
    foodObj.garden();
  } else if (currentTime == lastFed + 2) {
    update("Sleeping");
    foodObj.bedroom();
  } else if (currentTime > lastFed + 2 && currentTime <= lastFed + 4) {
    update("Bathing");
    foodObj.washroom();
  } else {
    update("Hungry");
    foodObj.display();
  }

  if (gameState != "Hungry") {
    feed.hide();
    addFood.hide();
    dog.remove();
  } else {
    feed.show();
    addFood.show();
    dog.addImage(sadDog);
  }
  
if (gameState===1){
  dog.addImage(happyDog);
  dog.scale = 0.175;
  dog.y = 250;
}

if (gameState===2){
  dog.addImage(sadDog);
  dog.scale = 0.175;
  milkBottle2.visible = false;
  dog.y = 250;
}

varSleep = createButton("I am very sleepy");
Sleep.position(710,125);
if (Sleep.mousePressed(function(){
  gameState = 4;
  database.ref('/').update({'gameState':gameState});
}));

if (gameState===5){
  dog.addImage(livingroom);
  dog.scale = 1;
  milkBottle2.visible = false;
}

var Play = createButton("Lets play");
Play.position(500,160);
if (Play.mousePressed(function(){
    gameState = 5;
    database.ref('/'.update({'gameState':gameState}));
}));
if (gameState===5){
  dog.addImage(livingroom);
  dog.scale =1;
  milkBottle2.visible = false;
}


var PlayInGarden = createButton("Lets play in park");
Play.position(585,160);
if (Play.mousePressed(function(){
    gameState = 6;
    database.ref('/'.update({'gameState':gameState}));
}));
if (gameState===6){
  dog.addImage(livingroom);
  dog.scale =1;
  milkBottle2.visible = false;
}


  drawSprites();
}

function readStock(data) {

  foodS = data.val();
}

function writeStock(x){
  database.ref('/').update({
    food:x
  })
}

function feedDog() {
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
  database.ref("/").update({
    Food: foodObj.getFoodStock(),
    FeedTime: hour(),
    gameState: "Hungry",
  });
}

var button = createButton("Feed the Dog");
button.position(400,125);

if(button.mousePressed(function(){
  foodS = foodS-1;
  gameState = 1;
  database.ref('/').update({'gameState':gameState});
}))


var addFood = createButton("Add Food");
button.position(500,125);

if(button.mousePressed(function(){
  foodS = foodS=1;
  gameState=2;
  database.ref('/').update({'gameState':gameState});
}))




function addFoods() {
  foodS++;
  database.ref("/").update({
    Food: foodS,
  });
}

function update(state) {
  database.ref("/").update({
    gameState: state,
  });
}
