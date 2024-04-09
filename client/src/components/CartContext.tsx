import { PropsWithChildren, createContext, useState } from "react";

interface cartContextValues {
    items: cartProductValues[];
    getProductQuantity: (id: string) => number;
    addOneToCart: (productData: productValues) => void;
    deleteFromCart: (id: string) => void;
    removeOneFromCart: (productData: productValues) => void;
    getTotalCost: () => number;
}

interface cartProductValues {
    product: productValues;
    quantity: number;
}

interface productValues {
    id: string;
    image: string;
    name: string;
    price: number;
}

export const CartContext = createContext<cartContextValues>({
    items: [],
    getProductQuantity: () => 0,
    addOneToCart: () => {},
    deleteFromCart: () => {},
    removeOneFromCart: () => {},
    getTotalCost: () => 0,
});

export function CartProvider({ children }: PropsWithChildren) {
    const [items, setItems] = useState<cartProductValues[]>([]);
    function getProductQuantity(id: string) {
        const quantity = items?.find(
            (item) => item.product.id === id
        )?.quantity;
        if (quantity === undefined) {
            return 0;
        }
        return quantity;
    }

    async function addOneToCart(productData: productValues) {
        const quantity = getProductQuantity(productData.id);
        if (quantity === 0) {
            setItems([
                ...items,
                {
                    product: {
                        id: productData.id,
                        image: productData.image,
                        name: productData.name,
                        price: productData.price,
                    },
                    quantity: 1,
                },
            ]);
        } else {
            setItems(
                items?.map((item) =>
                    item.product.id === productData.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        }
    }

    async function removeOneFromCart(productData: productValues) {
        const quantity = getProductQuantity(productData.id);
        if (quantity != 1) {
            setItems(
                items?.map((item) =>
                    item.product.id === productData.id
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
            );
        } else {
            return deleteFromCart(productData.id);
        }
    }

    function deleteFromCart(id: string) {
        const newItems = items.filter((item) => {
            return item.product.id != id;
        });

        setItems(newItems);
    }

    function getTotalCost() {
        let totalCost = 0;
        items.map((productData) => {
            totalCost +=
                (productData.product.price / 100) * productData.quantity;
        });
        return totalCost;
    }

    const contextValue: cartContextValues = {
        items: items,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost,
    };
    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;
