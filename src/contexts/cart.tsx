import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useMemo,
  useState
} from "react";

import { Photo } from "@/api/photo";

interface CartContextType {
  cart: Photo[];
  addItem: (item: Photo) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {}
});

export const useCart = () => useContext(CartContext);

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
