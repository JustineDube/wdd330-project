// product-listing.js — product listing page entry point
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";
import { updateCartCount } from "./ProductDetails.mjs";

loadHeaderFooter(updateCartCount);

const category = getParam("category");

// Update page title to include category name
const titleEl = document.querySelector(".product-list-title");
if (titleEl && category) {
    titleEl.textContent = `Top Products: ${category.charAt(0).toUpperCase() + category.slice(1).replace("-", " ")}`;
}

const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");
const myList = new ProductList(category, dataSource, listElement);
myList.init();