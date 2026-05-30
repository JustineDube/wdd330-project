// product-listing.js — product listing page entry point
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";
import { updateCartCount } from "./ProductDetails.mjs";

loadHeaderFooter(updateCartCount);

const category = getParam("category");

// Map URL category param to the exact API category name
const categoryMap = {
    "tents": "tents",
    "backpacks": "backpacks",
    "sleeping-bags": "sleeping-bags",
    "hammocks": "hammocks",
};

const apiCategory = categoryMap[category] || category;

// Update page title
const titleEl = document.querySelector(".product-list-title");
if (titleEl && category) {
    const displayName = category
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
    titleEl.textContent = `Top Products: ${displayName}`;
}

const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");
const myList = new ProductList(apiCategory, dataSource, listElement);
myList.init();