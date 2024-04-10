import { useContext, useEffect, useState } from "react";
import { Button, Navbar, Nav, Modal, Badge } from "react-bootstrap";
import { FaUserAlt } from "react-icons/fa";
import { CartContext } from "./CartContext";
import CartModal from "./CartModal";
import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

interface userDataValues {
    customerId: string;
    account_mail: string;
    first_name: string;
    last_name: string;
    password: string;
}

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
    const [userData, setUserData] = useState<userDataValues>();
    const [cartQuantity, setCartQuantity] = useState<number>(0);

    useEffect(() => {
        let quantity = 0;
        cart.items.forEach((item: cartProductValues) => {
            quantity += item.quantity;
        });
        setCartQuantity(quantity);
    }, [cart.items]);

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
                            <FaShoppingCart />
                            {cartQuantity > 0 && (
                                <Badge
                                    bg=""
                                    style={{
                                        position: "absolute",
                                        backgroundColor: "rgb(57, 177, 103)",
                                    }}
                                >
                                    {cartQuantity}
                                </Badge>
                            )}
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
