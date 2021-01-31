//Create variables here
var dog,dogimage,dogimage1
var database
var foods,foodstock
var fedtime,lastfed
var feed,addfood
var foodobj
function preload()
{
  //load images here
  dogimage=loadImage("images/dogImg.png")
  dogimage1=loadImage("images/dogImg1.png")
  
}

function setup() {
  database=firebase.database()
	createCanvas(1000, 400);
  dog=createSprite(250,300,150,150)
  dog.addImage(dogimage);
  dog.scale=0.15
  foodstock=database.ref('Food')
  foodstock.on("value",readstock)
  textSize(20)
  foodobj=new Food()
  feed= createButton("feed the dog")
  feed.position(700,95)
  feed.mousepressed(feeddog)
  addfood=createButton("add food")
  addfood.position(800,95)
  addfood.mousepressed(addfood)
}


function draw() {  
background(46,139,87)
foodobj.display()
fedtime=database.ref('FeedTime')
fedtime.on("value",function(data){

lastfed=data.val()

})

fill(255,255,254);
textSize(15)
if(lastfed>=12){

text("last feed:"+lastfed%12+"PM",350,30)

} else if(lastfed==0){

  text("last feed:12 AM",350,30)
  
  } else {

    text("last feed:"+lastfed+"AM",350,30)
    
    } 

drawSprites();

}
function readstock(data){

foods=data.val()
foodobj.updatefoodStock(foods)

}
//Function to read values from DB
function feeddog(){

dog.addImage(dogimage1)
if(foodobj.getfoodStock()<=0){

foodobj.updatefoodStock(foodobj.getfoodStock()*0)

}
 else{

  foodobj.updatefoodStock(foodobj.getfoodStock()-1)

}
database.ref('/').update({

Food:foodobj.getfoodStock(),
FeedTime:hour()

})
}
function addfood(){

foods++
database.ref('/').update({

Food:foods

})

}
 





