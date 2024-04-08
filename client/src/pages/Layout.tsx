import { Outlet } from "react-router-dom";
import NavbarComponent from "../components/Navbar";
import CartProvider from "../components/CartContext";
import { Container } from "react-bootstrap";

export const Layout = () => {
    return (
        <>
            <CartProvider>
                <Container>
                    <NavbarComponent></NavbarComponent>
                </Container>
                <Outlet />
            </CartProvider>
        </>
    );
};
