"use client";
import { useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";

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
        <div className="flex justify-center mb-6">
          <svg
            width="400"
            height="400"
            viewBox="0 0 400 400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
          >
            <rect width="400" height="400" rx="40" fill="#111827" />
            <path
              d="M120 200l50 50 110-110"
              stroke="#22C55E"
              stroke-width="12"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <circle
              cx="200"
              cy="200"
              r="180"
              stroke="#374151"
              stroke-width="4"
              stroke-dasharray="10 10"
            />
            <text
              x="50%"
              y="85%"
              dominant-baseline="middle"
              text-anchor="middle"
              fill="#D1D5DB"
              font-size="24"
              font-family="Arial, sans-serif"
            >
              Thank you!
            </text>
          </svg>
        </div>

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
