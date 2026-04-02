"use client";
import { useProductStore } from "@/store/productStore";
import { ProductCard } from "./ProductCard";

export const ProductGrid = () => {
  const { filteredProducts } = useProductStore();

  return (
    <>
      {filteredProducts?.length == 0 ? (
        <h1 className="text-center font-bold">No products found</h1>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </>
  );
};
