"use client";
import { useProductStore } from "@/store/productStore";
import { useEffect, useState } from "react";

export const CategoryFilter = () => {
  const { filterByCategory, setProducts } = useProductStore();
  const [categories, setCategories] = useState<string[]>(["all"]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products/categories");
        const data = await res.json();
        setCategories(["all", ...data]);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, [setProducts]);

  return (
    <div className="mb-6">
      <label htmlFor="category" className="block text-textSecondary mb-2">
        Filter by Category
      </label>
      <div className="relative w-full md:w-64">
        <select
          id="category"
          onChange={(e) => filterByCategory(e.target.value)}
          className="appearance-none w-full px-4 py-2 rounded-lg border border-secondary bg-surface text-textPrimary hover:border-primary focus:outline-none focus:ring-2 focus:ring-secondary pr-10"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
          <svg
            className="h-4 w-4 text-textSecondary"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 01.02-1.08z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
