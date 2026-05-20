// main.js
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { updateCartCount } from "./ProductDetails.mjs";
import Alert from "./Alert.js";

// Render product list
const dataSource = new ProductData("tents");
const listElement = document.querySelector(".product-list");
const myList = new ProductList("tents", dataSource, listElement);
myList.init();

// Show cart count badge on page load
updateCartCount();

// Show alerts
const alert = new Alert();
alert.init();