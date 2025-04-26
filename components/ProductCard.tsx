import { useAuthStore } from "@/store/authStore";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/store/productStore";
import Link from "next/link";

interface Props {
  product: Product;
}

const convertToNaira = (usd: number) => {
  const exchangeRate = 1400; // approximate conversion rate
  return usd * exchangeRate;
};

export const ProductCard = ({ product }: Props) => {
  const nairaPrice = convertToNaira(product.price);

  const { addToCart, cart } = useCartStore();
  const isInCart = cart.some((item) => item.id === product.id);

  const { isAuthenticated } = useAuthStore();
  const handleAddToCart = () => {
    if (isAuthenticated) {
      if (!isInCart) {
        addToCart(product);
      }
    } else {
      alert("Please log in to add items to your cart.");
      return;
    }
  };

  return (
    <div className="bg-surface rounded-2xl shadow-lg overflow-hidden flex flex-col hover:shadow-xl transition">
      <Link href={`/product/${product.id}`} passHref>
        <div className="w-full h-64 overflow-hidden bg-white flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      </Link>
      <div className="p-4 flex-1 flex flex-col">
        <h2 className="text-lg font-semibold text-textPrimary line-clamp-2 mb-2">
          {product.title}
        </h2>
        <p className="text-sm text-textSecondary line-clamp-2 mb-4">
          {product.description}
        </p>
        <div className="mt-auto text-primary font-bold text-lg flex items-center justify-between">
          <span>
            ₦{nairaPrice.toLocaleString("en-NG", { maximumFractionDigits: 0 })}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleAddToCart();
            }}
            disabled={isInCart}
            className={`px-6 py-2 font-semibold rounded-lg transition ${
              isInCart
                ? "bg-gray-500 text-white cursor-not-allowed"
                : "bg-primary text-white hover:bg-primary/90"
            }`}
          >
            {isInCart ? "In Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};
