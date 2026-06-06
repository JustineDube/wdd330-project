// checkout.js — checkout page entry point
import { loadHeaderFooter, getLocalStorage } from "./utils.mjs";
import { updateCartCount } from "./ProductDetails.mjs";
import CheckoutProcess from "./Checkoutprocess.mjs";

loadHeaderFooter(updateCartCount);

const checkout = new CheckoutProcess();
checkout.displayItemSubtotal();

// Calculate totals when zip code is filled in
document.getElementById('zip').addEventListener('blur', () => {
    checkout.calculateOrderTotal();
});

// Handle form submission
document.getElementById('checkout-form').addEventListener('submit', (e) => {
    e.preventDefault();
    checkout.checkout(e.target);
});