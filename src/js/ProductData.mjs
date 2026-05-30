// ProductData.mjs

function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor() { }

  async getData(category) {
    const response = await fetch(`/json/${category}.json`);
    const data = await convertToJson(response);
    return data;
  }

  async findProductById(id) {
    // We don't know the category here, so try all known categories
    const categories = ["tents", "backpacks", "sleeping-bags", "hammocks"];
    for (const category of categories) {
      try {
        const products = await this.getData(category);
        const found = products.find((item) => item.Id === id);
        if (found) return found;
      } catch (e) {
        // continue to next category
      }
    }
    return null;
  }
}
