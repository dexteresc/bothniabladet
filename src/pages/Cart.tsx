import { Photo } from "@/api/photo";
import { useCart } from "@/contexts/cart";

function CartItem({ photo }: { photo: Photo }) {
  const { removeItem } = useCart();
  return (
    <li className="flex items-center justify-between py-2 mx-2 border-b border-gray-300 last:border-transparent">
      <div className="flex flex-row">
        <img
          src={`http://localhost:8080${photo.url}`}
          alt={photo.title}
          className="w-16"
        />
        <div className="flex flex-col ml-4">
          <h3 className="text-lg font-bold">{photo.title}</h3>
          <p className="text-sm">{photo.description}</p>
        </div>
      </div>
      <button
        type="button"
        className="material-icons text-gray-500 dark:text-gray-200"
        onClick={() => removeItem(photo.id)}
      >
        delete
      </button>
    </li>
  );
}

function Cart() {
  const { cart, clearCart } = useCart();
  return (
    <div className="h-full">
      <h1>Cart</h1>
      <ul className="w-full ring ring-inset h-1/2 rounded p-2">
        {cart.map((photo: Photo) => (
          <CartItem key={photo.id} photo={photo} />
        ))}
      </ul>
      <button
        type="button"
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={clearCart}
      >
        Clear cart
      </button>
    </div>
  );
}

export default Cart;
