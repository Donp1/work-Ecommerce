"use client";
import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import React, { useEffect } from "react";

interface pageProps {
  children: React.ReactNode;
}
const Provider = ({ children }: pageProps) => {
  const { setCart } = useCartStore();
  const { setIsAuthenticated } = useAuthStore();
  useEffect(() => {
    // localStorage.setItem("cart", JSON.stringify([]));
    const cartString = localStorage.getItem("cart");
    const cart = cartString ? JSON.parse(cartString) : null;

    if (cart) {
      setCart(cart);
    } else {
      setCart([]);
    }

    const userString = localStorage.getItem("cart");
    const user = userString ? JSON.parse(userString) : null;

    if (user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);
  return <>{children}</>;
};

export default Provider;
