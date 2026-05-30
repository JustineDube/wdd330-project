// checkout.js — checkout page entry point
import { loadHeaderFooter } from "./utils.mjs";
import { updateCartCount } from "./ProductDetails.mjs";

loadHeaderFooter(updateCartCount);