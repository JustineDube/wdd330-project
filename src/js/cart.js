// cart.js
import { getLocalStorage, setLocalStorage, loadHeaderFooter } from './utils.mjs';
import { updateCartCount } from './ProductDetails.mjs';

loadHeaderFooter(updateCartCount);

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart') || [];

  if (cartItems.length === 0) {
    document.querySelector('.product-list').innerHTML =
      '<li class="cart-card divider"><p>Your cart is empty.</p></li>';
    const cartFooter = document.querySelector('.cart-footer');
    if (cartFooter) cartFooter.classList.add('hide');
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');

  document.querySelectorAll('.cart-card__remove').forEach((btn) => {
    btn.addEventListener('click', removeFromCart);
  });

  const total = cartItems.reduce(
    (sum, item) => sum + item.FinalPrice * (item.quantity || 1),
    0
  );
  const cartFooter = document.querySelector('.cart-footer');
  cartFooter.classList.remove('hide');
  cartFooter.querySelector('.cart-total').innerHTML = `Total: $${total.toFixed(2)}`;
}

function cartItemTemplate(item) {
  const isDiscounted = item.FinalPrice < item.SuggestedRetailPrice;
  const savings = (item.SuggestedRetailPrice - item.FinalPrice).toFixed(2);
  const qty = item.quantity || 1;
  const imgSrc = item.Image || (item.Images && item.Images.PrimaryMedium) || "";

  return `<li class="cart-card divider">
  <button class="cart-card__remove" data-id="${item.Id}" aria-label="Remove item">✕</button>
  <a href="#" class="cart-card__image">
    <img src="${imgSrc}" alt="${item.Name}" />
  </a>
  <a href="#"><h2 class="card__name">${item.Name}</h2></a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: ${qty}</p>
  <p class="cart-card__price">$${(item.FinalPrice * qty).toFixed(2)}</p>
  ${isDiscounted ? `<p class="cart-card__discount">Sale! You save $${savings} each</p>` : ''}
</li>`;
}

function removeFromCart(e) {
  const idToRemove = e.target.dataset.id;
  let cartItems = getLocalStorage('so-cart') || [];
  const idx = cartItems.findIndex((item) => item.Id === idToRemove);
  if (idx !== -1) cartItems.splice(idx, 1);
  setLocalStorage('so-cart', cartItems);
  renderCartContents();
  updateCartCount();
}

renderCartContents();
updateCartCount();