// ProductDetails.mjs
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

function productDetailsTemplate(product) {
    const isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;
    const savings = (product.SuggestedRetailPrice - product.FinalPrice).toFixed(2);
    const discountPct = Math.round(
        ((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100
    );

    return `
    <section class="product-detail">
      <h3>${product.Brand.Name}</h3>
      <h2 class="divider">${product.NameWithoutBrand}</h2>
      <img class="divider" src="${product.Image}" alt="${product.NameWithoutBrand}" />
      <p class="product-card__price">$${product.FinalPrice}
        ${isDiscounted ? `<span class="product-card__was-price">Was: $${product.SuggestedRetailPrice}</span>` : ''}
      </p>
      ${isDiscounted ? `
        <p class="product-detail__discount">
          <span class="product-card__discount-badge">Sale ${discountPct}% off</span>
          You save $${savings}!
        </p>` : ''}
      <p class="product__color">${product.Colors[0].ColorName}</p>
      <p class="product__description">${product.DescriptionHtmlSimple}</p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
      </div>
    </section>`;
}

export function updateCartCount() {
    const cartItems = getLocalStorage("so-cart") || [];
    const count = cartItems.length;
    let badge = document.querySelector(".cart-count");
    if (!badge) {
        badge = document.createElement("span");
        badge.classList.add("cart-count");
        const cartDiv = document.querySelector(".cart");
        if (cartDiv) cartDiv.appendChild(badge);
    }
    if (badge) {
        badge.textContent = count > 0 ? count : "";
        badge.style.display = count > 0 ? "flex" : "none";
    }
}

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();
        document
            .getElementById("addToCart")
            .addEventListener("click", this.addProductToCart.bind(this));
    }

    addProductToCart() {
        const cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(this.product);
        setLocalStorage("so-cart", cartItems);
        updateCartCount();
    }

    renderProductDetails() {
        const detailContainer = document.querySelector(".product-detail");
        if (detailContainer) {
            detailContainer.innerHTML = productDetailsTemplate(this.product);
        } else {
            document.querySelector("main").insertAdjacentHTML("afterbegin", productDetailsTemplate(this.product));
        }
    }
}
