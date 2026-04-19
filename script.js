
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

 
// picture container hover to switch images
const pictureContainers = document.querySelectorAll('.picture-container');

pictureContainers.forEach(container => {
  const img = container.querySelector('img');
  const originalSrc = img.src;
  const alternateSrc = img.dataset.hover || originalSrc; // Get alternate image from data-hover attribute

  container.addEventListener('mouseenter', () => {
    if (img.dataset.hover) {
      img.src = img.dataset.hover;
    }
  });

  container.addEventListener('mouseleave', () => {
    img.src = originalSrc;
  });
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

// Interactive purchase-list size selection
const sizeButtons = document.querySelectorAll('.size-btn');
const sizeItems = document.querySelectorAll('.size-item');

sizeButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default link behavior
    
    const selectedSize = button.getAttribute('data-size');
    
    // Remove highlight from all items
    sizeItems.forEach(item => {
      item.classList.remove('active');
    });
    
    // Highlight the matching size item
    const matchingItem = document.querySelector(`.size-item[data-size="${selectedSize}"]`);
    if (matchingItem) {
      matchingItem.classList.add('active');
      // Scroll to the selected item
      matchingItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
});
