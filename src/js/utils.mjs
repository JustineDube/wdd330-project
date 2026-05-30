// utils.mjs

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = false) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

// ── Team Activity W03 additions ──

/**
 * Renders a single template string into a parent element.
 * Optionally calls a callback with data after rendering.
 */
export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) {
    callback(data);
  }
}

/**
 * Fetches an HTML file at the given path and returns it as a string.
 */
export async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

/**
 * Loads header and footer partials into their respective placeholder elements.
 * Accepts an optional callback for post-render work (e.g. updating cart count).
 */
export async function loadHeaderFooter(callback) {
  const headerTemplate = await loadTemplate("/partials/header.html");
  const footerTemplate = await loadTemplate("/partials/footer.html");

  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement, null, callback);
  renderWithTemplate(footerTemplate, footerElement);
}
