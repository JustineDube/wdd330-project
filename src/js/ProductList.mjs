// ProductList.mjs
import { renderListWithTemplate } from "./utils.mjs";

// Feature 5: Correct image size based on screen width
function getImageSrc(product) {
  if (!product.Images) return product.Image || "";
  if (window.innerWidth < 500) return product.Images.PrimarySmall || product.Image;
  if (window.innerWidth < 900) return product.Images.PrimaryMedium || product.Image;
  return product.Images.PrimaryLarge || product.Image;
}

function productCardTemplate(product) {
  const isDiscounted = product.FinalPrice < product.SuggestedRetailPrice;
  const imgSrc = getImageSrc(product);

  return `<li class="product-card">
    <a href="/product_pages/?product=${product.Id}">
      ${isDiscounted ? '<span class="product-card__discount-badge">Sale</span>' : ''}
      <img src="${imgSrc}" alt="Image of ${product.NameWithoutBrand}" />
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.NameWithoutBrand}</h3>
      <p class="product-card__price">$${product.FinalPrice}</p>
      ${isDiscounted ? `<p class="product-card__was-price">Was: $${product.SuggestedRetailPrice}</p>` : ''}
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.allProducts = [];
  }

  async init() {
    this.allProducts = await this.dataSource.getData(this.category);
    this.renderList(this.allProducts);
  }

  // Feature 1: init for search results
  async initWithProducts(products) {
    this.allProducts = products;
    this.renderList(products);
  }

  // Feature 3: Sort by name or price
  sort(by) {
    const sorted = [...this.allProducts];
    if (by === "name") {
      sorted.sort((a, b) => a.NameWithoutBrand.localeCompare(b.NameWithoutBrand));
    } else if (by === "price-asc") {
      sorted.sort((a, b) => a.FinalPrice - b.FinalPrice);
    } else if (by === "price-desc") {
      sorted.sort((a, b) => b.FinalPrice - a.FinalPrice);
    }
    this.renderList(sorted);
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list, "afterbegin", true);
  }
}
