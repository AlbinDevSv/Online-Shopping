const getAllProducts = async () => {
    try {
        const response = await fetch(
            "http://localhost:3000/api/stripe/list-all-products",
            {
                method: "GET",
            }
        );
        const items = await response.json();
        return items;
    } catch (error) {
        console.log("Error fetching items:", error);
        return [];
    }
};

export default getAllProducts;
