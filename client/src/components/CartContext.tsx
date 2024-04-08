import { createContext, useState } from "react";
import getProductData from "../assets/getProductData";

interface cartProductValues {
    id: string;
    image: [];
    name: string;
    price: number;
    quantity: number;
}

export const CartContext = createContext({
    items: [],
    getProductQuantity: (id) => {},
    addOneToCart: (id) => {},
    removeOneFromCart: (id) => {},
    getTotalCost: () => {},
});

export function CartProvider({ children }) {
    const [cartProducts, setCartProducts] = useState<cartProductValues[]>([]);

    function getProductQuantity(id: string) {
        const quantity = cartProducts?.find(
            (product) => product.id === id
        )?.quantity;
        if (quantity === undefined) {
            return 0;
        }
        return quantity;
    }

    async function addOneToCart(id: string) {
        const quantity = getProductQuantity(id);
        if (quantity === 0) {
            const productData = await getProductData(id);
            console.log(productData);

            setCartProducts([
                ...cartProducts,
                {
                    id: id,
                    image: productData.image[0],
                    name: productData.name,
                    price: productData.price,
                    quantity: 1,
                },
            ]);
        } else {
            setCartProducts(
                cartProducts?.map((product) =>
                    product.id === id
                        ? { ...product, quantity: product.quantity + 1 }
                        : product
                )
            );
        }
    }

    async function removeOneFromCart(id: string) {
        const quantity = getProductQuantity(id);
        if (quantity > 0) {
            setCartProducts(
                cartProducts?.map((product) =>
                    product.id === id
                        ? { ...product, quantity: product.quantity - 1 }
                        : product
                )
            );
        } else {
            return console.log("No Quantity Found");
        }
    }

    // function removeOneFromCart(id: string) {
    //     const quantity = getProductQuantity(id);
    //     if (quantity == 1) {
    //         deleteFromCart(id);
    //     } else {
    //         setCartProducts(
    //             cartProducts?.map((product) =>
    //                 product.id === id
    //                     ? { ...product, quantity: product.quantity - 1 }
    //                     : product
    //             )
    //         );
    //     }
    // }

    // function deleteFromCart(id: string) {
    //     setCartProducts((cartProducts) =>
    //         cartProducts?.filter((currentProduct) => {
    //             return currentProduct.id != id;
    //         })
    //     );
    // }

    function getTotalCost() {
        let totalCost = 0;
        cartProducts?.map((cartItem) => {
            totalCost += cartItem.price * cartItem.quantity;
        });
    }

    const contextValue = {
        items: cartProducts,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        // deleteFromCart,
        getTotalCost,
    };
    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;
