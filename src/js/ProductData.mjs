// ProductData.mjs

function convertToJson(res) {
  if (res.ok) return res.json();
  throw new Error("Bad Response");
}

export default class ProductData {
  constructor() { }

  async getData(category) {
    const response = await fetch(`/json/${category}.json`);
    return await convertToJson(response);
  }

  async findProductById(id) {
    const categories = ["tents", "backpacks", "sleeping-bags", "hammocks"];
    for (const category of categories) {
      try {
        const products = await this.getData(category);
        const found = products.find((item) => item.Id === id);
        if (found) return found;
      } catch (e) { /* continue */ }
    }
    return null;
  }

  // Feature 1: Search across all categories
  async searchProducts(query) {
    const categories = ["tents", "backpacks", "sleeping-bags", "hammocks"];
    const q = query.toLowerCase();
    let results = [];
    for (const category of categories) {
      try {
        const products = await this.getData(category);
        const matches = products.filter(
          (p) =>
            p.NameWithoutBrand.toLowerCase().includes(q) ||
            p.Brand.Name.toLowerCase().includes(q) ||
            (p.DescriptionHtmlSimple && p.DescriptionHtmlSimple.toLowerCase().includes(q))
        );
        results = results.concat(matches);
      } catch (e) { /* continue */ }
    }
    return results;
  }
}
