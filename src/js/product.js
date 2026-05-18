// product.js
// Entry point for the product detail page.
// Pulls the product ID from the URL, creates the data source and detail
// view instances, then calls init() to kick everything off.

import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const productId = getParam("product");
const dataSource = new ProductData("tents");

const product = new ProductDetails(productId, dataSource);
product.init();

