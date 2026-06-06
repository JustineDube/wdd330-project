// wishlist.mjs — Wish List feature
// Stores wish list items in localStorage under 'so-wishlist'.
// No user login system exists, so the list is browser-local.

import { getLocalStorage, setLocalStorage } from './utils.mjs';

const WISHLIST_KEY = 'so-wishlist';

export function getWishlist() {
  return getLocalStorage(WISHLIST_KEY) || [];
}

export function addToWishlist(product) {
  const list = getWishlist();
  if (!list.find((item) => item.Id === product.Id)) {
    list.push(product);
    setLocalStorage(WISHLIST_KEY, list);
  }
}

export function removeFromWishlist(productId) {
  const list = getWishlist().filter((item) => item.Id !== productId);
  setLocalStorage(WISHLIST_KEY, list);
}

export function isInWishlist(productId) {
  return getWishlist().some((item) => item.Id === productId);
}

export function moveWishlistItemToCart(productId) {
  const list = getWishlist();
  const product = list.find((item) => item.Id === productId);
  if (!product) return;

  // Add to cart
  const cart = getLocalStorage('so-cart') || [];
  const existing = cart.find((item) => item.Id === productId);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }
  setLocalStorage('so-cart', cart);

  // Remove from wish list
  removeFromWishlist(productId);
}

/** Render a wish-list page inside a <ul class="wishlist-list"> element. */
export function renderWishlistPage() {
  const container = document.querySelector('.wishlist-list');
  if (!container) return;

  const items = getWishlist();

  if (items.length === 0) {
    container.innerHTML = '<li class="wishlist-empty"><p>Your wish list is empty.</p></li>';
    return;
  }

  container.innerHTML = items.map(wishlistItemTemplate).join('');

  container.querySelectorAll('.wishlist__move-to-cart').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;
      moveWishlistItemToCart(id);
      renderWishlistPage();
      // update cart badge if available
      const event = new CustomEvent('wishlist:cartUpdated');
      document.dispatchEvent(event);
    });
  });

  container.querySelectorAll('.wishlist__remove').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;
      removeFromWishlist(id);
      renderWishlistPage();
    });
  });
}

function wishlistItemTemplate(item) {
  const imgSrc = item.Image || (item.Images && item.Images.PrimaryMedium) || '';
  return `<li class="wishlist-card divider">
    <button class="wishlist__remove" data-id="${item.Id}" aria-label="Remove from wish list">✕</button>
    <div class="wishlist-card__image">
      <img src="${imgSrc}" alt="${item.Name}" />
    </div>
    <div class="wishlist-card__info">
      <h2 class="card__name">${item.Name}</h2>
      <p class="wishlist-card__price">$${item.FinalPrice}</p>
      <button class="wishlist__move-to-cart" data-id="${item.Id}">
        🛒 Move to Cart
      </button>
    </div>
  </li>`;
}

/** Update the wishlist count badge in the header (if present). */
export function updateWishlistCount() {
  const count = getWishlist().length;
  const badge = document.querySelector('.wishlist-count');
  if (badge) {
    badge.textContent = count > 0 ? count : '';
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
}
