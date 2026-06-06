// ExternalServices.mjs

const baseURL = import.meta.env.VITE_SERVER_URL;

// Individual Activity W04: Refactored to return detailed error from server
async function convertToJson(res) {
    const jsonResponse = await res.json();
    if (res.ok) {
        return jsonResponse;
    } else {
        // Send back the full server error body instead of a generic message
        throw { name: 'servicesError', message: jsonResponse };
    }
}

export default class ExternalServices {
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

    // Team Activity W04: POST order to checkout endpoint
    async checkout(payload) {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        };
        const response = await fetch(`${baseURL}checkout`, options);
        return await convertToJson(response);
    }
}
