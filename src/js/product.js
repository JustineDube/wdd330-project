// product.js — product detail page entry point
import { getParam, loadHeaderFooter } from "./utils.mjs";
import { updateCartCount } from "./ProductDetails.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter(updateCartCount);

const productId = getParam("product");
const dataSource = new ProductData();
const product = new ProductDetails(productId, dataSource);
product.init();