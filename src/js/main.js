// main.js
// Entry point for the home page (index.html).
// Reads tents data and renders the product list dynamically.

import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

// Create the data source for the tents category.
const dataSource = new ProductData("tents");

// Target the <ul> element in index.html where cards will be inserted.
const listElement = document.querySelector(".product-list");

// Create a ProductList instance and initialise it.
const myList = new ProductList("tents", dataSource, listElement);
myList.init();