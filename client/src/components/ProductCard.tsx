import { Card, Button, Container } from "react-bootstrap";
import getProductData from "../assets/getProductData";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";

interface CartProductValues {
    id: string;
    name: string;
    image: [string];
    price: number;
}

const ProductCard = (props) => {
    const [product, setProduct] = useState<CartProductValues>();
    const cart = useContext(CartContext);
    const productQuantity = cart.getProductQuantity(props.item.id);

    useEffect(() => {
        async function fetchProductData() {
            const item = await getProductData(props.item.id);

            setProduct(item);
        }

        fetchProductData();
    }, [props.id]);

    console.log(productQuantity);

    return (
        <>
            <Card style={{ width: "14rem" }}>
                <Card.Img
                    src={product?.image}
                    style={{
                        padding: "1rem",
                        borderRadius: "20px",
                    }}
                ></Card.Img>
                <Card.Header>
                    <Card.Title>{product?.name}</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Card.Subtitle>
                        <p>
                            {product?.price / 100}
                            kr
                        </p>
                    </Card.Subtitle>
                    {productQuantity === 0 ? (
                        <Button
                            variant="primary"
                            onClick={() => cart.addOneToCart(props.item.id)}
                        >
                            Add To Cart
                        </Button>
                    ) : (
                        <>
                            <Container className="d-flex justify-content-center">
                                <Button>-</Button>
                                <Card.Subtitle className=" w-25 text-center my-auto">
                                    <h2>{productQuantity}</h2>
                                </Card.Subtitle>
                                <Button
                                    onClick={() =>
                                        cart.addOneToCart(props.item.id)
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
