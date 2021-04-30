function getOrderStatus() {
  var xmlhttp = new XMLHttpRequest();
  var url = "http://localhost:3000/get/order/status?orderName=drew";

  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
      console.log(this.responseText);
      let resObj = JSON.parse(this.responseText)
      document.getElementById("timeLeft").innerText = resObj.timeLeft
      document.getElementById("orderName").innerText = resObj.orderName
    }
    else {
      console.log('status', xmlhttp.status)
    }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();

}

window.onload = function () {
  getOrderStatus()
}
