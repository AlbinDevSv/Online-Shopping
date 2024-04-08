import React, { useContext, useEffect, useState } from "react";
import { Button, Navbar, Nav, Modal } from "react-bootstrap";

import { CartContext } from "./CartContext";
import getAllProducts from "../assets/getAllProducts";

interface CartProductValues {
    id: string;
    name: string;
    image: [string];
    price: number;
}

const NavbarComponent = () => {
    const cart = useContext(CartContext);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [products, setProducts] = useState<CartProductValues[]>();

    useEffect(() => {
        const fetchData = async () => {
            const items = await getAllProducts();
            setProducts(items);
        };
        fetchData();
    }, []);

    return (
        <>
            <Navbar expand="sm">
                <Navbar.Brand href="/">Online Shopping</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <Button onClick={handleShow}>
                            Cart {cart.items.length} Items
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        <h1>Shopping Cart</h1>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h1>Items</h1>
                    <ul>
                        {cart.items.map((item: CartProductValues, index) => (
                            <li key={index}>
                                {item.name} - {item.quantity}
                            </li>
                        ))}
                    </ul>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default NavbarComponent;
