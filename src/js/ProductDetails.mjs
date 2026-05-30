// ProductDetails.mjs
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

// Feature 5: Pick image based on screen width
function getImageSrc(product) {
  if (!product.Images) return product.Image || "";
  if (window.innerWidth < 500) return product.Images.PrimarySmall || product.Image;
  if (window.innerWidth < 900) return product.Images.PrimaryMedium || product.Image;
  return product.Images.PrimaryLarge || product.Image;
}

// Feature 7: Discount flag on product detail
function productDetailsTemplate(product) {
  const isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;
  const savings = (product.SuggestedRetailPrice - product.FinalPrice).toFixed(2);
  const discountPct = Math.round(
    ((product.SuggestedRetailPrice - product.FinalPrice) / product.SuggestedRetailPrice) * 100
  );
  const imgSrc = getImageSrc(product);

  return `
    <section class="product-detail">
      <h3>${product.Brand.Name}</h3>
      <h2 class="divider">${product.NameWithoutBrand}</h2>
      ${isDiscounted ? `
        <div class="product-detail__discount-flag">
          <span class="discount-pct">${discountPct}% OFF</span>
          <span class="discount-savings">Save $${savings}</span>
        </div>` : ''}
      <img class="divider" src="${imgSrc}" alt="${product.NameWithoutBrand}" />
      <p class="product-card__price">
        $${product.FinalPrice}
        ${isDiscounted ? `<span class="product-card__was-price">Was: $${product.SuggestedRetailPrice}</span>` : ''}
      </p>
      <p class="product__color">${product.Colors[0].ColorName}</p>
      <p class="product__description">${product.DescriptionHtmlSimple}</p>
      <div class="product-detail__add">
        <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
      </div>
    </section>`;
}

export function updateCartCount() {
  const cartItems = getLocalStorage("so-cart") || [];
  // Feature 2: total quantity (sum of all item quantities)
  const count = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
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

  // Feature 4: Duplicate check — increment quantity if already in cart
  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    const existing = cartItems.find((item) => item.Id === this.product.Id);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + 1;
    } else {
      this.product.quantity = 1;
      cartItems.push(this.product);
    }
    setLocalStorage("so-cart", cartItems);
    updateCartCount();
    // Visual feedback
    const btn = document.getElementById("addToCart");
    btn.textContent = existing ? "Quantity Updated!" : "Added!";
    setTimeout(() => { btn.textContent = "Add to Cart"; }, 1500);
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
