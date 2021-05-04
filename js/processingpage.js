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

function getOrderStatus() {
  var email = document.getElementById("email").value;
  if (!email || !email.length){
    alert('Please enter e-mail to query');
    return;
  }

  var xmlhttp = new XMLHttpRequest();
  var url = "http://localhost:3001/get/order/status?email=" + encodeURIComponent(email);

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      console.log(this.responseText);
      let resObj = JSON.parse(this.responseText);
      let order = resObj.order;
      if (!resObj || !resObj.order) {
        alert("No Order Found with that e-mail address");
        return;
      }
      var displayOrder = "\n";
      for(var i = 0; i < Object.keys(order).length; i++) {
        var key = Object.keys(order)[i];
        console.log("Key: " + key + " | Value: " + order[key]);
        displayOrder += order[key] + " " + menu[key] + "\n";
      }

      document.getElementById("orderName").innerText = displayOrder;
      document.getElementById("orderStatus").innerText = getOrderStatusString(resObj.orderStatus);
    }
    else {
      console.log('status', xmlhttp.status)
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();

}

function getOrderStatusString(statusNumber) {
  if (statusNumber == 0) {
    return "Cooking";
  } else if(statusNumber == 1) {
    return "Completed";
  }
  return "Unknown";
}

