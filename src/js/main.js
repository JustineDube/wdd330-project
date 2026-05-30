// main.js — home page entry point
import { loadHeaderFooter } from "./utils.mjs";
import { updateCartCount } from "./ProductDetails.mjs";
import Alert from "./Alert.js";

// Load dynamic header and footer; pass updateCartCount as callback
// so the cart badge is updated after the header HTML is in the DOM.
loadHeaderFooter(updateCartCount);

// Show alerts
const alert = new Alert();
alert.init();