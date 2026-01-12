import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";

type ProductCardVariant = "default" | "compact" | "detailed";

type ProductCardProps = {
  product: Product;
  variant?: ProductCardVariant;
  showCategory?: boolean;
  showDescription?: boolean;
  showRating?: boolean;
  showDiscount?: boolean;
};

export default function ProductCard({
  product,
  variant = "default",
  showCategory = true,
  showDescription = false,
  showRating = true,
  showDiscount = true,
}: ProductCardProps) {
  const discountedPrice =
    product.price - (product.price * product.discountPercentage) / 100;

  const hasSignificantDiscount = product.discountPercentage > 10;

  return (
    <Link
      href={`/shop/${product.id}`}
      className="grid grid-cols-subgrid row-span-3 group bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-zinc-100 dark:border-zinc-800"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Discount Badge */}
        {showDiscount && hasSignificantDiscount && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            -{Math.round(product.discountPercentage)}%
          </span>
        )}

        {/* Rating Badge */}
        {showRating && (
          <div className="absolute top-3 right-3 bg-amber-400 text-zinc-900 text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1">
            ⭐ {product.rating.toFixed(1)}
          </div>
        )}
      </div>

      {/* Content */}
      <div className={variant === "compact" ? "p-3" : "p-4"}>
        <h3 className="font-semibold text-zinc-900 dark:text-white line-clamp-2 text-ellipsis min-h-max h-auto mb-2 group-hover:text-blue-600 transition-colors">
          {product.title}
        </h3>

        {showCategory && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2 capitalize">
            {product.category}
          </p>
        )}

        {showDescription && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Price */}
        <div className="flex items-center gap-2">
          <span
            className={`font-bold text-blue-600 ${
              variant === "compact" ? "text-base" : "text-lg"
            }`}
          >
            ${discountedPrice.toFixed(2)}
          </span>
          {product.discountPercentage > 0 && (
            <span className="text-sm text-zinc-400 line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
