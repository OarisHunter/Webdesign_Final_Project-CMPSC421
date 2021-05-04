function getOrderStatus() {
  var email = document.getElementById("email").value;
  if (!email || !email.length){
    alert('Please enter e-mail to query');
    return;
  }

  var xmlhttp = new XMLHttpRequest();
  var url = "http://localhost:3000/get/order/status?email=" + encodeURIComponent(email);

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      console.log(this.responseText);
      let resObj = JSON.parse(this.responseText);
      if (!resObj || !resObj.order) {
        alert("No Order Found with that e-mail address");
        return;
      }
      document.getElementById("orderName").innerText = resObj.order
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

