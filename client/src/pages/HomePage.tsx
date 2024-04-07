import { useEffect, useState } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    CardImg,
    CardText,
    CardTitle,
    Col,
    Row,
} from "react-bootstrap";
import Button from "react-bootstrap/Button";

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
    const [products, setProducts] = useState();
    useEffect(() => {
        fetch("http://localhost:3000/api/stripe/list-all-products")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setProducts(data);
            });
    }, []);

    return (
        <>
            <Row md={3} className="g-4">
                {products?.map((item, index) => {
                    return (
                        <Col align="center" key={index}>
                            <Card style={{ width: "14rem" }}>
                                <CardImg
                                    src={item.images}
                                    style={{
                                        padding: "1rem",
                                        borderRadius: "20px",
                                    }}
                                ></CardImg>
                                <CardHeader>
                                    <CardTitle>{item.name}</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Button>Add To Cart</Button>
                                </CardBody>
                            </Card>
                        </Col>
                    );
                })}
            </Row>
            <Button onClick={stripeCheckout} variant="primary">
                Dark
            </Button>
        </>
    );
};

export default HomePage;
