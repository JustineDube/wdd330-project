// main.js — home page entry point
import { loadHeaderFooter } from "./utils.mjs";
import { updateCartCount } from "./ProductDetails.mjs";
import Alert from "./Alert.js";
import { initNewsletterSignup } from "./newsletter.mjs";
import { initRegistrationModal } from "./registrationModal.mjs";
import { updateWishlistCount } from "./wishlist.mjs";

// Load dynamic header and footer; pass updateCartCount as callback
// so the cart badge is updated after the header HTML is in the DOM.
loadHeaderFooter(() => {
    updateCartCount();
    updateWishlistCount();
});

// Show alerts
const alert = new Alert();
alert.init();

// Newsletter sign-up box
initNewsletterSignup();

// First-visit registration modal
initRegistrationModal();