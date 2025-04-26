"use client";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { LogOut, Menu } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { ShoppingCart } from "lucide-react";

export const Navbar = () => {
  const { isAuthenticated, logout } = useAuthStore();
  const [cartItemCount, setCartIemCount] = useState<number>(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const cartString = localStorage.getItem("cart");
    const cart = cartString ? JSON.parse(cartString) : null;

    if (cart) {
      setCartIemCount(cart?.length);
    } else {
      setCartIemCount(0);
    }
  }, []);

  return (
    <nav className="bg-surface shadow-md p-4 w-full">
      <div className="container mx-auto flex items-center justify-between flex-wrap">
        <Link href="/">
          <span className="text-primary text-xl font-bold">ABUMarket</span>
        </Link>
        <button
          className="md:hidden text-textPrimary"
          onClick={() => setOpen(!open)}
        >
          <Menu size={24} />
        </button>
        <div
          className={`${
            open ? "block" : "hidden"
          } w-full md:flex md:items-center md:w-auto mt-4 md:mt-0`}
        >
          <div className="flex flex-col items-center md:flex-row gap-4">
            <div className="relative">
              <Link href="/checkout">
                <ShoppingCart size={24} />
              </Link>
              {cartItemCount > 0 && (
                <span className="absolute top-0 -right-1 inline-flex items-center justify-center w-4 h-4 bg-blue-500 text-[10px] text-white rounded-full">
                  {cartItemCount}
                </span>
              )}
            </div>

            {isAuthenticated ? (
              <button
                onClick={logout}
                className="text-white px-5 py-2 cursor-pointer rounded-md bg-red-600 font-bold flex items-center gap-1"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            ) : (
              <>
                <Link href="/login" className="hover:text-secondary">
                  Login
                </Link>
                <Link href="/register" className="hover:text-secondary">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
