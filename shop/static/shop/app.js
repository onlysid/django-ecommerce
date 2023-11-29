// Get cart icon
var cartIcon = document.querySelector('#cartIcon');

// get cart quantity
function getCartQuantity() {
    var cart = localStorage.getItem('cart');
    if(cart == null) {
        cart = {};
    } else {
        cart = JSON.parse(cart);
    }
    var total = 0;
    Object.values(cart).forEach(item => {
        total += item.quantity;
    })
    return total;
}

// Get cart quantity
var totalCartQuantity = getCartQuantity();

// Set cart quantity
function setCartQuantity() {
    cartIcon.querySelector('#cartCount').innerText = totalCartQuantity;
}
setCartQuantity();

// add item to cart
function addToCart(id) {
    // Define cart
    var cart = localStorage.getItem('cart');
    if(cart == null) {
        cart = {};
    } else {
        cart = JSON.parse(cart);
    }
    if(cart[id] != null) {
        cart[id].quantity += 1;
        cart[id].name = document.querySelector(`#itemName${id}`).innerText;
    } else {
        cart[id] = {quantity: 1, name: document.querySelector(`#itemName${id}`).innerText};
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update cart with item names and quantities
function updateCart() {
    var cart = localStorage.getItem('cart');
    if(cart == null) {
        cart = {};
    } else {
        cart = JSON.parse(cart);
    }
    var cartDropdown = document.querySelector('#cartItems');
    // If there are no items in the cart, set the dropdown to empty
    if(Object.keys(cart).length != 0) {
        
        cartDropdown.innerHTML = '';
        Object.keys(cart).forEach(id => {
            var item = cart[id];
            var itemHTML = `<div class="cart-item flex gap-3 w-full justify-center">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-quantity">${item.quantity}</div>
            </div>`;
            cartDropdown.innerHTML += itemHTML;
        })
        cartDropdown.innerHTML += `<div id="checkout" class="flex justify-center px-3 py-2 rounded-lg bg-blue-800 text-white">
            <a href="/checkout" class="btn btn-primary">View Cart</a>
        </div>`;
    }
}
updateCart();

// on button click, trigger function
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        addToCart(this.dataset.id);
        // console log the whole cart
        var cart = localStorage.getItem('cart');
        totalCartQuantity = getCartQuantity();
        setCartQuantity();
        updateCart();
    })
})

// Open cart dropdown on click
cartIcon.addEventListener('click', function() {
    // Set cart as active
    cartDropdown.classList.toggle('active');
})