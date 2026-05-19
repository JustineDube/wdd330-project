// ProductDetails.mjs
import { setLocalStorage } from "./utils.mjs";

/**
 * Generates the HTML markup for the product detail view.
 * Uses the product object returned from the data source.
 * @param {Object} product - The product data object.
 * @returns {string} HTML string for the product detail section.
 */
function productDetailsTemplate(product) {
    return `
    <section class="product-detail">
      <h3>${product.Brand.Name}</h3>
      <h2 class="divider">${product.NameWithoutBrand}</h2>
      <img
        class="divider"
        src="${product.Image}"
        alt="${product.NameWithoutBrand}"
      />
      <p class="product-card__price">$${product.FinalPrice}</p>
      <p class="product__color">${product.Colors[0].ColorName}</p>
      <p class="product__description">${product.DescriptionHtmlSimple}</p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
      </div>
    </section>`;
}

/**
 * ProductDetails class manages fetching and rendering a single product's details,
 * and handles adding that product to the cart via localStorage.
 */
export default class ProductDetails {
    /**
     * @param {string} productId - The ID of the product to display.
     * @param {Object} dataSource - An instance of ProductData used to fetch product info.
     */
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    /**
     * Initialises the class: fetches product data, renders the HTML, and
     * attaches the Add to Cart event listener.
     */
    async init() {
        // Resolve the product data using the provided id
        this.product = await this.dataSource.findProductById(this.productId);

        // Render the product details into the page
        this.renderProductDetails();

        // Attach the cart button listener after the HTML is in the DOM
        // .bind(this) ensures that `this` inside addProductToCart refers to
        // this class instance, not the button element.
        document
            .getElementById("addToCart")
            .addEventListener("click", this.addProductToCart.bind(this));
    }

    /**
     * Reads the current cart from localStorage, appends the current product,
     * and saves it back.
     */
    addProductToCart() {
        const cartItems = JSON.parse(localStorage.getItem("so-cart")) || [];
        cartItems.push(this.product);
        setLocalStorage("so-cart", cartItems);
    }

    /**
     * Builds the product detail HTML and inserts it into the
     * `.product-detail` wrapper element on the page.
     */
    renderProductDetails() {
        const detailContainer = document.querySelector(".product-detail");
        if (detailContainer) {
            detailContainer.innerHTML = productDetailsTemplate(this.product);
        } else {
            // Fallback: insert after the first <main> element
            document
                .querySelector("main")
                .insertAdjacentHTML("afterbegin", productDetailsTemplate(this.product));
        }
    }
}
