// store/cartStore.ts
import { create } from "zustand";
import { Product } from "./productStore";

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  setCart: (cartArray: CartItem[]) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  updateCartItemQuantity: (productId: number, quantity: number) => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  setCart: (cartArray) => set({ cart: cartArray }),
  addToCart: (product) =>
    set((state) => {
      const existing = state.cart.find((item) => item.id === product.id);
      if (existing) {
        return state; // already exists, no duplicate
      }
      const updatedCart = [...state.cart, { ...product, quantity: 1 }];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),

  removeFromCart: (productId) =>
    set((state) => {
      const updatedCart = state.cart.filter((item) => item.id !== productId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),

  updateCartItemQuantity: (productId, quantity) =>
    set((state) => {
      const updatedCart = state.cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { cart: updatedCart };
    }),

  clearCart: () => {
    localStorage.removeItem("cart");
    set({ cart: [] });
  },
}));
