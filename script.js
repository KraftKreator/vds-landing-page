import { Cart } from "./cart.js";

const _cart = new Cart();
const _cartBtn = document.getElementById("cart-btn");

function updateCartBadge() {
  if (!_cartBtn) return;
  const count = _cart.getProducts().length;
  _cartBtn.textContent = count > 0 ? `+ cart (${count})` : "+ cart";
}

updateCartBadge();

// burger service menu
const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu-wrapper');

burger.addEventListener('click', () => {
  menu.classList.toggle('active');
});

// size advisor
document.querySelector('form').addEventListener('submit', function(e) {
e.preventDefault();
const quantity = parseInt(document.querySelector('input[name="quantity"]').value);
let size = '';
                        
if (quantity >= 50 && quantity <= 100) size = 'Size S';
else if (quantity >= 101 && quantity <= 108) size = 'Size M';
else if (quantity >= 109 && quantity <= 115) size = 'Size L';
                        
 document.getElementById('result').innerHTML = size ? `<p>${size}</p>` : '<p>Invalid quantity</p>';
 });

 


// Collapsible functionality
const collapsibles = document.querySelectorAll('.collapsible');

collapsibles.forEach(collapsible => {
  collapsible.addEventListener('click', function() {
    // Toggle active class on button
    this.classList.toggle('active');
    
    // Get the content element that follows this button
    const content = this.nextElementSibling;
    
    if (content && content.classList.contains('content')) {
      // If content is hidden, show it
      if (content.style.maxHeight === '' || content.style.maxHeight === '0px') {
        content.style.maxHeight = content.scrollHeight + 'px';
      } else {
        // If content is shown, hide it
        content.style.maxHeight = '0px';
      }
    }
  });
});

// Buy buttons → add to cart, update badge, navigate to basket
document.querySelectorAll('.buy-btn').forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    const size = button.getAttribute('data-size');
    try {
      _cart.addProduct({
        id: `ultimate-black-hoodie-${size.toLowerCase()}`,
        name: `Ultimate Black Hoodie – Size ${size}`,
        price: parseInt(button.getAttribute('data-price'), 10),
        currency: "pln",
        images: [`${window.location.origin}/images/ultimate-hoodie.jpg`],
        metadata: { size },
      });
    } catch { /* already in cart */ }
    updateCartBadge();
    window.location.href = "basket.html";
  });
});

