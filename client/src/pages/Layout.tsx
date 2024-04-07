import { Button, Container, Navbar } from "react-bootstrap";
import { Outlet } from "react-router-dom";

export const Layout = () => {
    return (
        <>
            <Container>
                <Navbar>
                    <Navbar.Brand href="/">Online Shopping</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Button>Cart</Button>
                    </Navbar.Collapse>
                </Navbar>
            </Container>

            <main>
                <Outlet />
            </main>
        </>
    );
};
