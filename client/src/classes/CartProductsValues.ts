export interface CartProductValues {
    product: productValues;
    quantity: number;
}

interface productValues {
    id: string;
    image: string;
    name: string;
    price: number;
}
