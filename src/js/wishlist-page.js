// wishlist-page.js — entry point for the wish list page
import { loadHeaderFooter } from './utils.mjs';
import { updateCartCount } from './ProductDetails.mjs';
import { renderWishlistPage, updateWishlistCount } from './wishlist.mjs';

loadHeaderFooter(() => {
    updateCartCount();
    updateWishlistCount();
});

renderWishlistPage();

// Re-update cart count when an item is moved to cart
document.addEventListener('wishlist:cartUpdated', () => {
    updateCartCount();
    updateWishlistCount();
});