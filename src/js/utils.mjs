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
  if (clear) parentElement.innerHTML = "";
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}

export function renderWithTemplate(template, parentElement, data, callback) {
  parentElement.innerHTML = template;
  if (callback) callback(data);
}

export async function loadTemplate(path) {
  const res = await fetch(path);
  return await res.text();
}

export async function loadHeaderFooter(callback) {
  const headerTemplate = await loadTemplate("/partials/header.html");
  const footerTemplate = await loadTemplate("/partials/footer.html");

  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement, null, callback);
  renderWithTemplate(footerTemplate, footerElement);

  // Feature 1: Attach search form handler after header loads
  attachSearchHandler();
}

// Feature 1: Search — navigates to product-listing page with search query
function attachSearchHandler() {
  const form = document.getElementById("search-form");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const query = document.getElementById("search-input").value.trim();
    if (query) {
      window.location.href = `/product-listing/?search=${encodeURIComponent(query)}`;
    }
  });
}
