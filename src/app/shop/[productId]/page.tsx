import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductById, getProductsByCategory } from "@/lib/api";
import type { Product } from "@/types/product";
import ProductCard from "@/components/products/ProductCard";

type Props = {
  params: Promise<{ productId: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { productId } = await params;
  const id = parseInt(productId);

  if (isNaN(id)) {
    return { title: "Product Not Found" };
  }

  try {
    const product = await getProductById(id);
    return {
      title: `${product.title} | Tu91Store`,
      description: product.description,
    };
  } catch {
    return { title: "Product Not Found" };
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { productId } = await params;
  const id = parseInt(productId);

  if (isNaN(id)) {
    notFound();
  }

  let product: Product;
  let relatedProducts: Product[] = [];

  try {
    product = await getProductById(id);
    relatedProducts = await getProductsByCategory(product.category);
    relatedProducts = relatedProducts
      .filter((p) => p.id !== product.id)
      .slice(0, 4);
  } catch {
    notFound();
  }

  const discountedPrice =
    product.price - (product.price * product.discountPercentage) / 100;

  return (
    <div className="product-detail py-12">
      <div className="container px-4">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center gap-2 text-sm text-zinc-500">
            <li>
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Trang chủ
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                href="/shop"
                className="hover:text-blue-600 transition-colors"
              >
                Cửa hàng
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                href={`/shop/category/${product.category}`}
                className="hover:text-blue-600 transition-colors capitalize"
              >
                {product.category}
              </Link>
            </li>
            <li>/</li>
            <li className="text-zinc-900 dark:text-white font-medium truncate max-w-[200px]">
              {product.title}
            </li>
          </ol>
        </nav>

        {/* Product Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-zinc-100 dark:bg-zinc-800">
              <Image
                src={product.images[0] || product.thumbnail}
                alt={product.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              {product.discountPercentage > 10 && (
                <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-full">
                  -{Math.round(product.discountPercentage)}% OFF
                </span>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.slice(0, 4).map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border-2 border-transparent hover:border-blue-500 transition-colors cursor-pointer"
                  >
                    <Image
                      src={image}
                      alt={`${product.title} - ${index + 1}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-blue-600 font-medium capitalize mb-2">
                {product.category}
              </p>
              <h1 className="text-3xl lg:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
                {product.title}
              </h1>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-3 py-1.5 rounded-full">
                  <span>⭐</span>
                  <span className="font-semibold">
                    {product.rating.toFixed(1)}
                  </span>
                </div>
                {product.brand && (
                  <span className="text-zinc-500 dark:text-zinc-400">
                    Thương hiệu:{" "}
                    <span className="font-medium text-zinc-700 dark:text-zinc-300">
                      {product.brand}
                    </span>
                  </span>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 rounded-2xl p-6">
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-blue-600">
                  ${discountedPrice.toFixed(2)}
                </span>
                {product.discountPercentage > 0 && (
                  <span className="text-xl text-zinc-400 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
              {product.discountPercentage > 0 && (
                <p className="text-green-600 dark:text-green-400 font-medium mt-2">
                  Bạn tiết kiệm được $
                  {(product.price - discountedPrice).toFixed(2)} (
                  {Math.round(product.discountPercentage)}%)
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-3">
                Mô tả sản phẩm
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {product.stock > 0 ? (
                <>
                  <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-green-600 dark:text-green-400 font-medium">
                    Còn hàng ({product.stock} sản phẩm)
                  </span>
                </>
              ) : (
                <>
                  <span className="w-3 h-3 bg-red-500 rounded-full" />
                  <span className="text-red-600 dark:text-red-400 font-medium">
                    Hết hàng
                  </span>
                </>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-4">
              <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-300 flex items-center justify-center gap-2">
                <span>🛒</span>
                Thêm vào giỏ hàng
              </button>
              <button className="bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-semibold py-4 px-6 rounded-xl transition-colors duration-300">
                ❤️
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
              Sản phẩm liên quan
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard
                  key={relatedProduct.id}
                  product={relatedProduct}
                  variant="compact"
                  showCategory={false}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
