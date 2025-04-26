"use client";
import { useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ThankYouPage = () => {
  const { clearCart } = useCartStore();
  const router = useRouter();

  useEffect(() => {
    // Clear the cart when arriving at this page
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-surface px-4">
      <div className="max-w-md w-full bg-background rounded-3xl shadow-2xl p-8 text-center">
        <h1 className="text-3xl font-bold text-primary mb-4">Thank You! 🎉</h1>
        <p className="text-lg text-textSecondary mb-6">
          Your payment was successful. Your order is now being processed.
        </p>
        {/* <div className="flex justify-center mb-6">
          <Image
            alt="thanks-svg"
            src={require("@/constants/thank-you-illustration.svg")}
          />
        </div> */}

        <p className="text-sm text-textSecondary mb-8">
          You will receive your order within 3-7 working days.
        </p>
        <button
          onClick={() => router.push("/")}
          className="bg-primary text-white py-3 px-6 rounded-full font-semibold hover:bg-primary/90 transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default ThankYouPage;
