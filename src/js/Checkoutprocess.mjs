// CheckoutProcess.mjs
import ExternalServices from './ExternalServices.mjs';
import { getLocalStorage, setLocalStorage, alertMessage } from './utils.mjs';

const TAX_RATE = 0.06;
const services = new ExternalServices();

// Converts cart items to the simplified form required by the server
function packageItems(items) {
  return items.map((item) => ({
    id: item.Id,
    name: item.Name,
    price: item.FinalPrice,
    quantity: item.quantity || 1,
  }));
}

// Converts a form element into a plain JS object keyed by input name
function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};
  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}

export default class CheckoutProcess {
  constructor() {
    this.cartItems = getLocalStorage('so-cart') || [];
    this.subtotal = 0;
    this.tax = 0;
    this.shipping = 0;
    this.orderTotal = 0;
  }

  // Called on page load — calculates and displays the item subtotal
  displayItemSubtotal() {
    this.subtotal = this.cartItems.reduce(
      (sum, item) => sum + item.FinalPrice * (item.quantity || 1),
      0
    );
    const el = document.getElementById('subtotal');
    if (el) el.textContent = `$${this.subtotal.toFixed(2)}`;
  }

  // Called after zip code is filled — calculates tax, shipping, order total
  calculateOrderTotal() {
    this.tax = this.subtotal * TAX_RATE;

    // $10 for first item + $2 for each additional
    const itemCount = this.cartItems.reduce(
      (sum, item) => sum + (item.quantity || 1),
      0
    );
    this.shipping = itemCount > 0 ? 10 + (itemCount - 1) * 2 : 0;

    this.orderTotal = this.subtotal + this.tax + this.shipping;

    const taxEl = document.getElementById('tax');
    const shippingEl = document.getElementById('shipping');
    const totalEl = document.getElementById('order-total');

    if (taxEl) taxEl.textContent = `$${this.tax.toFixed(2)}`;
    if (shippingEl) shippingEl.textContent = `$${this.shipping.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${this.orderTotal.toFixed(2)}`;
  }

  // Called on form submit — packages and sends the order to the server
  async checkout(form) {
    // Build order object from form fields
    const orderData = formDataToJSON(form);

    // Attach calculated values
    orderData.orderDate = new Date().toISOString();
    orderData.orderTotal = this.orderTotal.toFixed(2);
    orderData.tax = this.tax.toFixed(2);
    orderData.shipping = this.shipping;
    orderData.items = packageItems(this.cartItems);

    try {
      const response = await services.checkout(orderData);
      console.log('Order success:', response);

      // Clear cart and redirect to success page
      setLocalStorage('so-cart', []);
      window.location.href = '/checkout/success.html';
    } catch (err) {
      // Individual Activity W04: Display detailed server error to user
      console.error('Order failed:', err);
      if (err.name === 'servicesError') {
        const msg = err.message?.message || err.message?.error || JSON.stringify(err.message);
        alertMessage(`Order failed: ${msg}`);
      } else {
        alertMessage('Something went wrong. Please try again.');
      }
    }
  }
}
