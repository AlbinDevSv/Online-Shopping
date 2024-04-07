import Button from "react-bootstrap/Button";

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
    await fetch("http://localhost:3000/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    })
        .then((response) => {
            return response.json();
        })
        .then((response) => {
            console.log(response.url);

            if (response.url) {
                window.location.assign(response.url);
            }
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

            <Button onClick={stripeCheckout} variant="primary">
                Dark
            </Button>
        </main>
    );
};

export default HomePage;
