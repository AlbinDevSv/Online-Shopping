import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import ProductCard from "../components/ProductCard";
import getAllProducts from "../assets/getAllProducts";

interface productValues {
    id: string;
    image: string;
    name: string;
    price: number;
}

interface productValuesStripe {
    id: string;
    images: string;
    name: string;
    default_price: { unit_amount: number };
}
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
    const [products, setProducts] = useState<productValues[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const items = await getAllProducts();
            // console.log(items);
            setProducts(
                items.map((productData: productValuesStripe) => ({
                    id: productData.id,
                    name: productData.name,
                    image: productData.images[0],
                    price: productData.default_price.unit_amount,
                }))
            );
        };
        fetchData();
    }, []);
    console.log(products);

    return (
        <>
            <Row md={3} className="g-4">
                {products?.map(
                    (productData, index) => (
                        console.log(productData),
                        (
                            <Col align="center" key={index}>
                                <ProductCard productData={productData} />
                            </Col>
                        )
                    )
                )}
            </Row>
            <Button onClick={stripeCheckout} variant="primary">
                Dark
            </Button>
        </>
    );
};

export default HomePage;
