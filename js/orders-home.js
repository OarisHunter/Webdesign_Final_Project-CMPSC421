var cart_modal_btn = document.getElementById("cart_icon");
var cart_modal = document.getElementById("cart_modal");
var sticky = cart_modal_btn.offsetTop;
var modal_close = document.getElementsByClassName('close')[0];

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

var cart = [];
var cart_elements = [];

// Calls
cart_modal_btn.onclick = function () {
    // convert items added to cart to
    // [[item index, frequency], [item index, frequency], ...]
    var order = getOrder(cart);
    // Populate modal with html elements
    cart_elements = populateCartModal(order);
    // Populate order input field
    inputOrder(order);
    // Fill Cart Total Element
    populateCartTotal(order);
    // Show modal
    cart_modal.style.display = "block";
}

modal_close.onclick = function () {
    // Hide modal
    cart_modal.style.display = "none";
    // Clear elements from modal
    clearCartModal(cart_elements);
}

window.onclick = function (event) {
    if (event.target === cart_modal) {
        // Hide modal
        cart_modal.style.display = "none";
        // Clear elements from modal
        clearCartModal(cart_elements);
    }
}

window.onscroll = function() {cartScroll()};

// Functions
function cartScroll() {
    // Fix cart icon to top of screen when scrolling
    if(window.pageYOffset > sticky) {
        cart_modal_btn.classList.add("fixed_cart");
    }
    else {
        cart_modal_btn.classList.remove("fixed_cart");
    }
}

function addToCart(value) {
    console.log("Pushing: " + menu[value] + " to cart | Menu Index: " + value);
    // Push cart item index to cart array
    cart.push(value);
}

function getOrder(cart) {
    // Make 2 arrays of equal length
    // list of items
    // list of frequency of each item
    var items = [], freq = [], prev = -1;

    cart.sort();
    for(var i = 0; i < cart.length; i++) {
        if (cart[i] !== prev) {
            items.push(cart[i]);
            freq.push(1);
        } else {
            freq[freq.length - 1]++;
        }
        prev = cart[i];
    }

    var order = [];
    // Create array of "tuples" containing
    // (item index, frequency of item)
    for(var j = 0; j < items.length; j++) {
        order.push([items[j], freq[j]]);
    }
    console.log(order);
    return order;
}

function populateCartModal(order) {
    var modal_body = document.getElementsByClassName("modal_body")[0];

    var cart_elements = [];
    for(var i = 0; i < order.length; i++) {
        // Create elements for modal body
        var cart_item_cont = document.createElement('div');
        var cart_item = document.createElement('p');
        var cart_item_quant = document.createElement('p');

        // Give item container its class
        cart_item_cont.setAttribute('class', 'modal_cart_item');

        // Give item container elements their text
        cart_item.textContent = menu[order[i][0]];  // Menu Item
        cart_item_quant.textContent = order[i][1];              // Quantity

        // Set Children
        cart_item_cont.appendChild(cart_item);
        cart_item_cont.appendChild(cart_item_quant);
        modal_body.appendChild(cart_item_cont);

        // Append element to list of elements
        cart_elements.push([cart_item_cont, [cart_item, cart_item_quant]]);
    }

    // Return list of document elements in the cart following the format:
    // [ [ Cart Item Container, [ Cart Item Name, Cart Item Quantity ] ] ]
    return cart_elements;
}

function clearCartModal(cart_elements) {
    var modal_body = document.getElementsByClassName("modal_body")[0];

    for(var i = 0; i < cart_elements.length; i++) {
        // Remove Cart item name and quantity elements
        cart_elements[i][0].removeChild(cart_elements[i][1][0]);
        cart_elements[i][0].removeChild(cart_elements[i][1][1]);

        // Remove cart item container
        modal_body.removeChild(cart_elements[i][0]);
    }
}

function inputOrder(order) {
    var order_input = document.getElementById("checkout_order");

    // Stringify order for input field to preserve array format
    order_input.value = JSON.stringify(order);
}

function populateCartTotal(order) {
    var total_field = document.getElementById("cart_order_total");
    var total = 0;

    // Calculate order total (all prices are the same currently)
    for(var i =0; i < order.length; i++) {
        total += 20.35;
    }

    // Fix floating point precision
    total = total.toFixed(2)

    // Check for if cart is empty
    if(total == 0) {
        total_field.textContent = "Total: $0.00";
    }
    else {
        total_field.textContent = "Total: $" + total;
    }
    return total;
}