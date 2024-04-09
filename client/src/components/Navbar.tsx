import { useContext, useState } from "react";
import { Button, Navbar, Nav, Modal, Container } from "react-bootstrap";

import { CartContext } from "./CartContext";
import CartModal from "./CartModal";
import { NavLink, Router } from "react-router-dom";

const NavbarComponent = () => {
    const cart = useContext(CartContext);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Navbar
                expand="sm"
                style={{
                    marginBottom: "20px",
                    marginTop: "20px",
                    backgroundColor: "rgb(219, 219, 219)",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                    border: "1px solid grey",
                    borderRadius: "5px",
                }}
            >
                <Navbar.Brand href="/">Online Shopping</Navbar.Brand>
                <Navbar.Toggle />

                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <NavLink to="/login">
                            <Button style={{ marginRight: "20px" }}>
                                Login
                            </Button>
                        </NavLink>
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
                <CartModal></CartModal>
            </Modal>
        </>
    );
};

export default NavbarComponent;
