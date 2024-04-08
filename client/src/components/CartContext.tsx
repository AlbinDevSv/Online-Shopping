import { createContext, useState } from "react";
import getProductData from "../assets/getProductData";

interface cartProductValues {
    id: string;
    name: string;
    quantity: number;
}

export const CartContext = createContext({
    items: [],
    getProductQuantity: (id) => {},
    addOneToCart: (id) => {},
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
            console.log(id);

            setCartProducts([
                ...cartProducts,
                {
                    id: id,
                    name: productData.name,
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

    // function getTotalCost() {
    //     let totalCost = 0;
    //     cartProducts?.map((cartItem) => {
    //         const productData = getProductData(cartItem.id);
    //         totalCost += productData.price * cardItem.quantity;
    //     });
    // }

    const contextValue = {
        items: cartProducts,
        getProductQuantity,
        addOneToCart,
        // removeOneFromCart,
        // deleteFromCart,
        // getTotalCost,
    };
    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;
