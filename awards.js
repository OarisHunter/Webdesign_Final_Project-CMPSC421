var menu =  {
  1 : "Buffalo Tots",
  2 : "Tots in a blanket",
  3 : "Loaded Tots",
  4 : "Tot Nachos",
  5 : "Beer Fried Tots",
  6 : "True tater salad",
  7 : "Reverse tater salad",
  8 : "Grilled chicken tater salad",
  9 : "Tiny tater salad",
  10 : "Singular tot",
  11 : "Chicken Tot Pie",
  12 : "Pulled Pork Tots",
  13 : "Steak and Tots",
  14 : "Tot Burrito",
  15 : "Tot tacos",
  16 : "Tater Pizza",
  17 : "Chicken Fried tots",
  18 : "Classic Tater burger",
  19 : "The Big Tater burger",
  20 : "Tater Roma",
  21 : "Philly Cheese Tater",
  22 : "Captain Tot",
  23 : "The Seven Tots",
  24 : "Tots",
  25 : "Tater Chips",
  26 : "Hash Browns",
  27 : "Waffle Tots",
  28 : "Bottled Water",
  29 : "Soda Water",
  30 : "Coors Light"
}

var acart = [];
var points





function send(){
  var XHR = new XMLHttpRequest();
  XHR.onreadystatechange =function (req,req) {
    if(this.status == 200 && this.readyState==4) {
    }

  }
  var cemail= document.getElementById("email").value;
  XHR.open("POST", "http://localhost:3002/Process_Order");
  XHR.setRequestHeader("Content-Type",'application/json');
  XHR.send(JSON.stringify({email:cemail}));
  get();
}

function get() {

  var XHR = new XMLHttpRequest();

  XHR.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      var hold = this.response;
      hold = hold * 50;
      document.getElementById("points").textContent = hold
      console.log(this.responseText);
    }
  }

  XHR.open("GET", "http://localhost:3000/get");
  XHR.send()

}


function addToCart1(value) {
  console.log("Pushing: " + menu[value] );
  // Push cart item index to cart array
  var holder = document.getElementById("points").textContent
  var points = Number(holder);
  if(points<50)
    return 0;

  else
    cart.push(value);
  points = points - 50;
  points.toString()
  document.getElementById("points").textContent = points
}

function addToCart2(value) {
  console.log("Pushing: " + menu[value] );
  // Push cart item index to cart array
  var holder = document.getElementById("points").textContent
  var points = Number(holder);
  if(points<100)
    return 0;

  else
    cart.push(value);
  points = points - 100;
  points.toString()
  document.getElementById("points").textContent = points
}


function addToCart3(value) {
  console.log("Pushing: " + menu[value] );
  // Push cart item index to cart array
  var holder = document.getElementById("points").textContent
  var points = Number(holder);
  if(points<150)
    return 0;

  else
    cart.push(value);
  points = points - 150;
  points.toString()
  document.getElementById("points").textContent = points
}


function addToCart4(value) {
  console.log("Pushing: " + menu[value] );
  // Push cart item index to cart array
  var holder = document.getElementById("points").textContent
  var points = Number(holder);
  if(points<150)
    return 0;

  else
    cart.push(value);
  points = points - 150;
  points.toString()
  document.getElementById("points").textContent = points
}

function sendOrder()  {

  var XHR = new XMLHttpRequest();

  XHR.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      console.log("Sending order to backend");
    }
  }

  var email = document.getElementById("email").value;

  var data = {email: email, order: acart, orderStatus: 0, total: 0};

  console.log(data);

  XHR.open("POST", "http://localhost:3000/Process_Order");
  XHR.setRequestHeader("Content-Type",'application/json');
  XHR.send(JSON.stringify(data));




}