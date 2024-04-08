const getProductData = async (id: string) => {
    try {
        const response = await fetch(
            "http://localhost:3000/api/stripe/list-product",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: id }),
            }
        );
        const item = await response.json();
        return item;
    } catch (error) {
        console.log("Error fetching item:", error);
        return [];
    }
};

export default getProductData;
