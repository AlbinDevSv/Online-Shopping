import { Card, Button, Container } from "react-bootstrap";
import getProductData from "../assets/getProductData";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";

interface productValues {
    id: string;
    image: string;
    name: string;
    price: number;
}
interface Iprops {
    productData: productValues;
}

const ProductCard = (props: Iprops) => {
    const cart = useContext(CartContext);
    const productQuantity = cart.getProductQuantity(props.productData.id);

    return (
        <>
            <Card style={{ width: "14rem" }}>
                <Card.Img
                    src={props.productData.image}
                    style={{
                        padding: "1rem",
                        borderRadius: "20px",
                    }}
                ></Card.Img>
                <Card.Header>
                    <Card.Title>{props.productData.name}</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Card.Subtitle>
                        <p>{props.productData.price / 100} kr</p>
                    </Card.Subtitle>
                    {productQuantity === 0 ? (
                        <Button
                            variant="primary"
                            onClick={() => cart.addOneToCart(props.productData)}
                        >
                            Add To Cart
                        </Button>
                    ) : (
                        <>
                            <Container className="d-flex justify-content-center">
                                <Button
                                    onClick={() =>
                                        cart.removeOneFromCart(
                                            props.productData
                                        )
                                    }
                                >
                                    -
                                </Button>
                                <Card.Subtitle className=" w-25 text-center my-auto">
                                    <h2>{productQuantity}</h2>
                                </Card.Subtitle>
                                <Button
                                    onClick={() =>
                                        cart.addOneToCart(props.productData)
                                    }
                                >
                                    +
                                </Button>
                            </Container>
                        </>
                    )}
                </Card.Body>
            </Card>
        </>
    );
};

export default ProductCard;
