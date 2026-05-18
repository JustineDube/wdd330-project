// utils.mjs individual


/**
 * Retrieves a named parameter from the current URL query string.
 * @param {string} param - The name of the URL parameter to retrieve.
 * @returns {string|null} The value of the parameter, or null if not present.
 */
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

/**
 * Saves a value to localStorage under the given key.
 * @param {string} key - The localStorage key.
 * @param {*} value - The value to store (will be JSON-stringified).
 */
export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Retrieves and parses a value from localStorage.
 * @param {string} key - The localStorage key.
 * @returns {*} The parsed value, or null if not found.
 */
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

/**
 * Renders a list of items into a parent element using a template function.
 * @param {Function} templateFn - A function that accepts one item and returns an HTML string.
 * @param {HTMLElement} parentElement - The DOM element to insert rendered HTML into.
 * @param {Array} list - The array of data items to render.
 * @param {string} [position="afterbegin"] - The insertAdjacentHTML position string.
 * @param {boolean} [clear=false] - Whether to clear the parent element before rendering.
 */
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false,
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}
