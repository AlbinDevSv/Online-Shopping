import { useContext, useEffect, useState } from "react";
import { Button, Navbar, Nav, Modal } from "react-bootstrap";
import { FaUserAlt } from "react-icons/fa";
import { CartContext } from "./CartContext";
import CartModal from "./CartModal";
import { NavLink } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";

interface userDataValues {
    customerId: string;
    account_mail: string;
    first_name: string;
    last_name: string;
    password: string;
}

const NavbarComponent = () => {
    const cart = useContext(CartContext);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [userData, setUserData] = useState<userDataValues>();

    async function handleLogout() {
        await fetch("http://localhost:3000/api/auth/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });

        setUserData(undefined);
    }
    useEffect(() => {
        async function authFetch() {
            await fetch("http://localhost:3000/api/auth/authorize", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            })
                .then((response) => response.json())
                .then((data) => setUserData(data));
        }

        authFetch();
    }, []);

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
                        {userData ? (
                            <>
                                <Navbar.Text style={{}}>
                                    <FaUserAlt
                                        style={{ marginRight: "10px" }}
                                    />
                                    {userData?.first_name}
                                </Navbar.Text>
                                <Button
                                    onClick={() => handleLogout()}
                                    style={{
                                        marginRight: "20px",
                                        marginLeft: "20px",
                                    }}
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <NavLink to="/login">
                                <Button style={{ marginRight: "20px" }}>
                                    Login
                                </Button>
                            </NavLink>
                        )}

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
