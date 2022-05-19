import { useMemo } from "react";
import { Photo } from "@/api/photo";
import { useCart } from "@/contexts/cart";
import Image from "@/components/Image";

function CartItem({ photo }: { photo: Photo }) {
  const { removeItem } = useCart();
  return (
    <li className="flex items-center justify-between py-2 mx-2 border-b border-gray-300 last:border-transparent">
      <div className="flex flex-row">
        <Image url={photo.url} alt={photo.title} className="w-16 h-full" />
        <h3 className="flex items-center text-md font-semibold ml-4">
          {photo.title}
        </h3>
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
  const { cart } = useCart();

  const picturePrice = 12;
  const currency = "€";
  const subTotal = useMemo(
    () => cart.reduce((acc) => acc + picturePrice, 0),
    [cart]
  );
  const tax = useMemo(() => subTotal * 0.2, [subTotal]);
  const total = useMemo(() => subTotal + tax, [subTotal, tax]);

  return (
    <>
      <h1 className="text-3xl font-semibold mb-4">Cart</h1>
      <div className="flex flex-wrap md:flex-nowrap">
        {cart.length === 0 ? (
          <p className="text-center w-full text-gray-500 py-4 ring-1 ring-gray-300 dark:ring-gray-600 rounded">
            No photos in cart
          </p>
        ) : (
          <>
            <ul className="flex-1 rounded p-4 ring-1 ring-gray-300 dark:ring-gray-600">
              {cart.map((photo) => (
                <CartItem key={photo.id} photo={photo} />
              ))}
            </ul>
            <section className="basis-full mt-4 md:mt-0 md:ml-4 md:basis-1/2">
              <h2 className="flex justify-between flex-nowrap text-md font-semibold mb-3 pb-2 border-b">
                Order summary{" "}
                <span>{`${cart.length} item${
                  cart.length > 1 ? "s" : ""
                }`}</span>
              </h2>
              <div className="flex flex-col">
                <div className="flex flex-row justify-between mb-2">
                  <span className="text-sm font-semibold">Subtotal</span>
                  <span className="text-sm font-semibold">{`${currency} ${subTotal.toFixed(
                    2
                  )}`}</span>
                </div>
                <div className="flex flex-row justify-between mb-2">
                  <span className="text-sm font-semibold">Tax</span>
                  <span className="text-sm font-semibold">{`${currency} ${tax.toFixed(
                    2
                  )}`}</span>
                </div>
                <div className="flex flex-row justify-between pt-2 border-t">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">{`${currency} ${total.toFixed(
                    2
                  )}`}</span>
                </div>
                <button
                  type="button"
                  className="ml-auto mt-6 rounded bg-blue-500 text-white px-4 py-2"
                >
                  Checkout
                </button>
              </div>
            </section>
          </>
        )}
      </div>
    </>
  );
}

export default Cart;
