export async function getProducts(params = {}) {

    const query = new URLSearchParams(params).toString();

    try {
        const res = await fetch(
            `https://panda-market-api.vercel.app/products?${query}`
        );
        if(!res.ok) {
            throw new Error(`HTTP ERROR: ${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error(`fetch error`, error);
        throw error;
    }
}