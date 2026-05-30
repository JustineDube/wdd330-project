// product-listing.js
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";
import { updateCartCount } from "./ProductDetails.mjs";

loadHeaderFooter(updateCartCount);

const category = getParam("category");
const searchQuery = getParam("search");

const dataSource = new ProductData();
const listElement = document.querySelector(".product-list");
const myList = new ProductList(category || "search", dataSource, listElement);

// Feature 6: Breadcrumb
function renderBreadcrumb(label, count) {
    const breadcrumb = document.querySelector(".breadcrumb");
    if (!breadcrumb) return;
    breadcrumb.innerHTML = `<a href="/index.html">Home</a> &rsaquo; ${label}${count !== undefined ? ` <span class="breadcrumb-count">(${count} items)</span>` : ""}`;
}

// Feature 3: Sort controls
function attachSortHandler() {
    const sortSelect = document.getElementById("sort-select");
    if (!sortSelect) return;
    sortSelect.addEventListener("change", () => {
        myList.sort(sortSelect.value);
    });
}

async function init() {
    if (searchQuery) {
        // Feature 1: Search results
        const titleEl = document.querySelector(".product-list-title");
        if (titleEl) titleEl.textContent = `Search results for: "${searchQuery}"`;
        const results = await dataSource.searchProducts(searchQuery);
        await myList.initWithProducts(results);
        renderBreadcrumb(`Search: "${searchQuery}"`, results.length);
    } else if (category) {
        // Normal category listing
        const displayName = category
            .split("-")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ");
        const titleEl = document.querySelector(".product-list-title");
        if (titleEl) titleEl.textContent = `Top Products: ${displayName}`;
        await myList.init();
        // Feature 6: Breadcrumb with count
        renderBreadcrumb(displayName, myList.allProducts.length);
    }

    attachSortHandler();
}

init();