import { createContext, useContext } from "react";
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

export default CartContext;
