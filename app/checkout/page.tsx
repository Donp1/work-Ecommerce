"use client";
import { Navbar } from "@/components/Navbar";
import { useCartStore } from "@/store/cartStore";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User } from "@/store/authStore";

import dynamic from "next/dynamic";

// Dynamically import PaystackButton with SSR disabled
const PaystackButton = dynamic(
  () => import("react-paystack").then((mod) => mod.PaystackButton),
  { ssr: false }
);

const ProcessOrder = () => {
  const { cart, updateCartItemQuantity, removeFromCart } = useCartStore();
  const [quantities, setQuantities] = useState<{ [id: number]: number }>({});
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();

  useEffect(() => {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    setUser(user);
  }, []);

  useEffect(() => {
    const initialQuantities: { [id: number]: number } = {};
    cart.forEach((item) => {
      initialQuantities[item.id] = item.quantity || 1;
    });
    setQuantities(initialQuantities);
  }, [cart]);

  const handleQuantityChange = (id: number, value: number) => {
    const newQuantity = Math.max(1, value); // minimum quantity = 1
    setQuantities((prev) => ({ ...prev, [id]: newQuantity }));
    updateCartItemQuantity(id, newQuantity);
  };

  const calculateTotal = () => {
    return cart.reduce((acc, item) => {
      const quantity = quantities[item.id] || 1;
      const priceInNaira = item.price * 1400;
      return acc + quantity * priceInNaira;
    }, 0);
  };

  // <script src="https://js.paystack.co/v2/inline.js"></script>;

  // const initPaystack = usePaystackPayment({
  //   reference: new Date().getTime().toString(),
  //   email: user?.email,
  //   amount: calculateTotal() * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
  //   publicKey: "pk_test_a7c704266afa044c65da0fdb5a8317817b1b2e32",
  //   currency: "NGN",
  // });

  const handlePayment = async () => {
    // initPaystack({
    //   onClose: () => {},
    //   onSuccess: (response) => {
    //     if (response.status == "success") {
    //       router.push("/thanks");
    //     }
    //   },
    // });
    // console.log(PaystackPop);
    // const handler = PaystackPop.setup({
    //   amount: calculateTotal() * 100,
    //   email: user?.email,
    //   key: "pk_test_a7c704266afa044c65da0fdb5a8317817b1b2e32",
    //   currency: "NGN",
    //   //   onSuccess: (tx) => {
    //   //   if (tx.status === "success") {
    //   //     router.push("/thanks");
    //   //   }
    //   // },
    //   // onError: (error) => {
    //   //   console.log(error);
    //   // },
    // });
    // if (windowAvailable) {
    //   const popup = new PaystackPop();
    //   popup.newTransaction({
    //     amount: calculateTotal() * 100,
    //     email: user?.email,
    //     key: "pk_test_a7c704266afa044c65da0fdb5a8317817b1b2e32",
    //     currency: "NGN",
    //     onSuccess: (tx) => {
    //       if (tx.status === "success") {
    //         router.push("/thanks");
    //       }
    //     },
    //     onError: (error) => {
    //       console.log(error);
    //     },
    //   });
    // }
  };

  return (
    <>
      {/* <Script
        src="https://js.paystack.co/v2/inline.js"
        strategy="afterInteractive"
        onLoad={(e) => console.log(e?.PaystackPop)}
        onError={(e) => console.error("Script failed to load", e)}
      /> */}
      <Navbar />
      <div className="flex items-center justify-center">
        <div className="min-h-screen sm:w-[50%] md:w-[50%]  bg-background text-textPrimary p-6">
          <h1 className="text-3xl font-bold mb-6">Process Your Order</h1>

          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => {
                const quantity = quantities[item.id] || 1;
                const priceInNaira = item.price * 1400;

                return (
                  <div
                    key={item.id}
                    className="flex items-center bg-surface rounded-xl p-4 shadow-md"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 object-contain bg-white rounded-lg"
                    />
                    <div className="flex-1 ml-6 space-y-2">
                      <h2 className="text-lg font-semibold">{item.title}</h2>
                      <p className="text-textSecondary text-sm line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <label className="text-sm">Qty:</label>
                        <input
                          type="number"
                          min={1}
                          value={quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item.id,
                              parseInt(e.target.value)
                            )
                          }
                          className="w-16 px-2 py-1 rounded bg-background border border-gray-700 focus:ring-primary focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="text-lg font-bold text-primary">
                        ₦
                        {(priceInNaira * quantity).toLocaleString("en-NG", {
                          maximumFractionDigits: 0,
                        })}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="mt-2 text-sm text-red-400 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {cart.length > 0 && (
            <div className="mt-8 p-6 bg-surface rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span className="text-primary">
                  ₦
                  {calculateTotal().toLocaleString("en-NG", {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>

              <PaystackButton
                text="Check out"
                publicKey="pk_test_a7c704266afa044c65da0fdb5a8317817b1b2e32"
                amount={calculateTotal() * 100}
                email={user?.email || ""}
                currency="NGN"
                onClose={() => {}}
                onSuccess={(res) => {
                  if (res.status == "success") {
                    router.push("/thanks");
                  }
                }}
                className="bg-primary cursor-pointer w-full mt-5 text-lg  hover:bg-secondary transition-colors px-6 py-3 rounded-lg font-semibold"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProcessOrder;
