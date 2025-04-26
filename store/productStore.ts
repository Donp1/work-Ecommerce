// store/productStore.ts
import { create } from "zustand";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface ProductState {
  products: Product[];
  setProducts: (products: Product[]) => void;
  filterByCategory: (category: string) => void;
  filteredProducts: Product[];
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  filteredProducts: [],
  setProducts: (products) => set({ products, filteredProducts: products }),
  filterByCategory: (category) => {
    const { products } = get();
    const filtered =
      category === "all"
        ? products
        : products.filter((p) => p.category === category);
    set({ filteredProducts: filtered });
  },
}));
