import React, { useContext, useEffect, useState } from "react";
import {
    Button,
    Navbar,
    Nav,
    Modal,
    Container,
    ModalBody,
} from "react-bootstrap";

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

const NavbarComponent = () => {
    const cart = useContext(CartContext);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Navbar expand="sm">
                <Navbar.Brand href="/">Online Shopping</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <Button
                            onClick={() => {
                                handleShow();
                            }}
                        >
                            Cart {cart.items.length} Items
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Modal show={show} onHide={handleClose} fullscreen={"md-down"}>
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
                    <Button>Checkout</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default NavbarComponent;
