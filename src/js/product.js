// product.js
import { getParam, loadHeaderFooter } from "./utils.mjs";
import { updateCartCount } from "./ProductDetails.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter(updateCartCount);

// Feature 6: Breadcrumb on product detail page
const category = getParam("category") || document.referrer.match(/category=([^&]+)/)?.[1];
if (category) {
    const displayName = category.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
    const breadcrumb = document.querySelector(".breadcrumb");
    if (breadcrumb) {
        breadcrumb.innerHTML = `<a href="/index.html">Home</a> &rsaquo; <a href="/product-listing/?category=${category}">${displayName}</a>`;
    }
}

const productId = getParam("product");
const dataSource = new ProductData();
const product = new ProductDetails(productId, dataSource);
product.init();