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

const stripeCheckout = () => {
    fetch("http://localhost:3000/api/stripe/create-checkout-session", {
        method: "POST",
    });
};

const HomePage = () => {
    return (
        <main>
            <button
                style={{ width: "200px", height: "100px" }}
                onClick={() => stripeCheckout()}
            >
                Checkout
            </button>
        </main>
    );
};

export default HomePage;
