"use client";
import { ProductGrid } from "@/components/ProductGrid";
import { CategoryFilter } from "@/components/CategoryFilter";
import { useEffect, useState } from "react";
import { useProductStore } from "@/store/productStore";
import { Navbar } from "@/components/Navbar";
import { Loader } from "lucide-react";

const Products = () => {
  const { filterByCategory, setProducts } = useProductStore();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setLoading(false);
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [setProducts]);
  return (
    <>
      <Navbar />
      {loading ? (
        <div className="w-full flex items-center justify-center mt-10">
          <Loader color="#fff" size={50} />
        </div>
      ) : (
        <>
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-primary mb-6">
              Our Products
            </h1>
            <CategoryFilter />
            <ProductGrid />
          </div>
        </>
      )}
    </>
  );
};

export default Products;
