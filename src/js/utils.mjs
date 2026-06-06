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

  attachSearchHandler();
}

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

// Individual Activity W04: Alert message utility
export function alertMessage(message, scroll = true) {
  // Remove any existing alerts first
  document.querySelectorAll('.alert').forEach((a) => a.remove());

  const alert = document.createElement('div');
  alert.classList.add('alert');
  alert.innerHTML = `<p>${message}</p><span class="alert-close">✕</span>`;

  // Remove alert when X is clicked
  alert.addEventListener('click', function (e) {
    if (e.target.classList.contains('alert-close') || e.target.tagName === 'SPAN') {
      document.querySelector('main').removeChild(this);
    }
  });

  const main = document.querySelector('main');
  main.prepend(alert);

  if (scroll) window.scrollTo(0, 0);
}
