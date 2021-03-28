var cart_modal_btn = document.getElementById("cart_icon");
var cart_modal = document.getElementById("cart_modal");
var sticky = cart_modal_btn.offsetTop;
var span = document.getElementsByClassName('close')[0];

console.log(cart_modal_btn);
console.log(cart_modal);
console.log(sticky);
console.log(span);


cart_modal_btn.onclick = function () {
    cart_modal.style.display = "block";
}

span.onclick = function () {
    cart_modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target === cart_modal) {
        cart_modal.style.display = "none";
    }
}

window.onscroll = function() {cartScroll()};
function cartScroll() {
    if(window.pageYOffset > sticky) {
        cart_modal_btn.classList.add("fixed_cart");
    }
    else {
        cart_modal_btn.classList.remove("fixed_cart");
    }
}