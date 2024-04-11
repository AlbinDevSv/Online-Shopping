import { useContext } from "react";
import { Button, Modal, Container } from "react-bootstrap";
import { FaTrashAlt } from "react-icons/fa";
import { CartContext } from "./CartContext";

interface cartProductValues {
    product: productValues;
    quantity: number;
}

interface productValues {
    id: string;
    image: string;
    name: string;
    price: number;
}

const CartModal = (props: { auth: string }) => {
    console.log(props);

    const cart = useContext(CartContext);

    const stripeCheckout = async () => {
        const lineItems = cart.items;
        await fetch(
            "http://localhost:3000/api/stripe/create-checkout-session",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(lineItems),
            }
        )
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

    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h1>Shopping Cart</h1>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h1>Items:</h1>
                <ul>
                    {cart.items.map((item: cartProductValues, index) => (
                        <Modal.Body key={index}>
                            <Container className="d-flex">
                                <img
                                    src={`${item.product.image}`}
                                    alt=""
                                    style={{
                                        width: "25%",
                                        height: "6rem",
                                    }}
                                />
                                <div
                                    style={{
                                        width: "50%",
                                        height: "6rem",
                                        marginLeft: "2rem",
                                    }}
                                >
                                    <h4>{item.product.name}</h4>
                                    <p>Quantity: {item.quantity}</p>
                                    <p>
                                        Price:{" "}
                                        {(item.product.price / 100) *
                                            item.quantity}{" "}
                                        SEK
                                    </p>
                                </div>
                                <FaTrashAlt
                                    onClick={() =>
                                        cart.deleteFromCart(item.product.id)
                                    }
                                    style={{ fontSize: "20px" }}
                                />
                            </Container>
                        </Modal.Body>
                    ))}
                </ul>
            </Modal.Body>
            <Modal.Title>
                <h1 style={{ textAlign: "end", marginRight: "20px" }}>
                    Total: {cart.getTotalCost()} SEK
                </h1>
            </Modal.Title>
            <Modal.Footer>
                {props.auth ? (
                    <Button onClick={stripeCheckout}>Checkout</Button>
                ) : (
                    <p>You need to login to continue</p>
                )}
            </Modal.Footer>
        </>
    );
};

export default CartModal;
