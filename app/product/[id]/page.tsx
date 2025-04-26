"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { Product } from "@/store/productStore";
import { Navbar } from "@/components/Navbar";

const convertToNaira = (usd: number) => usd * 1400;

const ProductDetails = () => {
  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart, cart } = useCartStore();
  const { isAuthenticated } = useAuthStore();

  const isInCart = cart.some((item) => item.id === Number(id));

  useEffect(() => {
    if (id) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data))
        .catch((err) => console.error("Error fetching product:", err));
    }
  }, [id]);

  if (!product) return <div className="text-textPrimary p-6">Loading...</div>;

  const nairaPrice = convertToNaira(product.price);

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-10">
        <div className="w-full h-[400px] bg-white rounded-xl flex items-center justify-center shadow-md">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-textPrimary mb-4">
              {product.title}
            </h1>
            <p className="text-textSecondary mb-4">{product.description}</p>
            <div className="text-xl font-bold text-primary mb-6">
              ₦
              {nairaPrice.toLocaleString("en-NG", { maximumFractionDigits: 0 })}
            </div>
          </div>
          {isAuthenticated ? (
            <button
              onClick={() => addToCart(product)}
              className={`px-6 py-2 font-semibold rounded-lg transition ${
                isInCart
                  ? "bg-gray-500 text-white cursor-not-allowed"
                  : "bg-primary text-white hover:bg-primary/90"
              }`}
            >
              {isInCart ? "In Cart" : "Add to Cart"}
            </button>
          ) : (
            <p className="text-sm text-red-500">
              Please log in to add items to your cart.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
