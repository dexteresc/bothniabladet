import { ReactNode, useEffect, useMemo, useState } from "react";
import { Photo } from "@/api/photo";
import CartContext from "./cart";

function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<Photo[]>([]);

  const addItem = (item: Photo) => {
    const newCartItems = [...cartItems, item];
    setCartItems(newCartItems);
    // Update the cart in local storage
    localStorage.setItem("cart", JSON.stringify(newCartItems));
  };

  const removeItem = (id: number) => {
    const newCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(newCartItems);
    // Update the cart in local storage
    localStorage.setItem("cart", JSON.stringify(newCartItems));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      setCartItems(JSON.parse(cart));
    }
  }, []);

  const value = useMemo(
    () => ({
      cart: cartItems,
      addItem,
      removeItem,
      clearCart
    }),
    [cartItems]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export default CartProvider;
