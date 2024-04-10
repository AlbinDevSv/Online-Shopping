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
    images: string;
    name: string;
    default_price: { id: string; unit_amount: number };
}

const HomePage = () => {
    const [products, setProducts] = useState<productValues[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const items = await getAllProducts();
            // console.log(items);
            setProducts(
                items.map((productData: productValuesStripe) => ({
                    id: productData.default_price.id,
                    name: productData.name,
                    image: productData.images[0],
                    price: productData.default_price.unit_amount,
                }))
            );
        };
        fetchData();
    }, []);

    return (
        <>
            <Row md={3} className="g-4">
                {products?.map((productData, index) => (
                    <Col align="center" key={index}>
                        <ProductCard productData={productData} />
                    </Col>
                ))}
            </Row>
        </>
    );
};

export default HomePage;
