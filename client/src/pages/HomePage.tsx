import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import ProductCard from "../components/ProductCard";
import getAllProducts from "../assets/getAllProducts";
import { CartProductValues } from "../classes/CartProductsValues";

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
            <Row md={3} className="g-4">
                {products?.map((item, index) => (
                    <Col align="center" key={index}>
                        <ProductCard item={item} />
                    </Col>
                ))}
            </Row>
            <Button onClick={stripeCheckout} variant="primary">
                Dark
            </Button>
        </>
    );
};

export default HomePage;
