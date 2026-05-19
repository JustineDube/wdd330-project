// ProductList.mjs
import { renderListWithTemplate } from "./utils.mjs";

/**
 * Template function that returns an HTML string for one product card.
 * @param {Object} product - A single product data object.
 * @returns {string} An <li> HTML string for the product card.
 */
function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/?product=${product.Id}">
      <img
        src="${product.Image}"
        alt="Image of ${product.NameWithoutBrand}"
      />
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.NameWithoutBrand}</h3>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

/**
 * ProductList manages fetching a category's products and rendering them
 * as a list of product cards inside a given HTML element.
 */
export default class ProductList {
  /**
   * @param {string} category - The product category (e.g. 'tents').
   * @param {Object} dataSource - An instance of ProductData for fetching data.
   * @param {HTMLElement} listElement - The <ul> or container to render cards into.
   */
  constructor(category, dataSource, listElement) {
    // Store constructor params so they are accessible throughout the class.
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  /**
   * Fetches the product list and renders it.
   * Async so that we can await the Promise returned by getData().
   */
  async init() {
    const list = await this.dataSource.getData();
    this.renderList(list);
  }

  /**
   * Uses the shared renderListWithTemplate utility to build and insert
   * product card HTML for every item in the list.
   * @param {Array} list - Array of product data objects.
   */
  renderList(list) {
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      list,
      "afterbegin",
      true, // clear any static/placeholder items before rendering
    );
  }
}
