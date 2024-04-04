const storeItems = async () => {
    const response = await fetch(
        "http://localhost:3000/api/stripe/storeItems",
        {
            method: "GET",
        }
    );

    const data = await response.json();
    console.log(data);
};

const stripeCheckout = async () => {
    const response = await fetch("http://localhost:3000/api/stripe/checkout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: [] }),
    });

    const data = await response.json();
    console.log(data);
};

const HomePage = () => {
    return (
        <main>
            <button
                style={{ width: "200px", height: "100px" }}
                onClick={() => storeItems()}
            >
                Checkout
            </button>
        </main>
    );
};

export default HomePage;
