import { getLocalStorage, setLocalStorage } from './utils.mjs';
import { updateCartCount } from './ProductDetails.mjs';

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart') || [];

  if (cartItems.length === 0) {
    document.querySelector('.product-list').innerHTML =
      '<li class="cart-card divider"><p>Your cart is empty.</p></li>';
    // Keep footer hidden and clear total
    return;
  }

  // Render items
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');

  // Attach remove listeners to each X button
  document.querySelectorAll('.cart-card__remove').forEach((btn) => {
    btn.addEventListener('click', removeFromCart);
  });

  // Show total
  const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
  const cartFooter = document.querySelector('.cart-footer');
  cartFooter.classList.remove('hide');
  cartFooter.querySelector('.cart-total').innerHTML = `Total: $${total.toFixed(2)}`;
}

function cartItemTemplate(item) {
  const isDiscounted = item.FinalPrice < item.SuggestedRetailPrice;
  const savings = (item.SuggestedRetailPrice - item.FinalPrice).toFixed(2);

  return `<li class="cart-card divider">
  <button class="cart-card__remove" data-id="${item.Id}" aria-label="Remove item">✕</button>
  <a href="#" class="cart-card__image">
    <img src="${item.Image}" alt="${item.Name}" />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  ${isDiscounted ? `<p class="cart-card__discount">Sale! You save $${savings}</p>` : ''}
</li>`;
}

function removeFromCart(e) {
  const idToRemove = e.target.dataset.id;
  let cartItems = getLocalStorage('so-cart') || [];
  // Remove only the first matching item (in case of duplicates)
  const idx = cartItems.findIndex((item) => item.Id === idToRemove);
  if (idx !== -1) cartItems.splice(idx, 1);
  setLocalStorage('so-cart', cartItems);
  // Re-render
  renderCartContents();
  updateCartCount();
}

// Initial render
renderCartContents();
updateCartCount();