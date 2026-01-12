import Link from "next/link";
import { getHotProducts, getCategories } from "@/lib/api";
import type { Category } from "@/types/product";
import ProductCard from "@/components/products/ProductCard";

export default async function ShopPage() {
  const [hotProducts, categories] = await Promise.all([
    getHotProducts(15),
    getCategories(5),
  ]);

  return (
    <div className="shop-page py-12">
      <div className="container px-4">
        {/* Section 1: Hot Products */}
        <section id="sec-hot-products" className="mb-16">
          <div className="flex items-center place-content-center gap-3 mb-8 text-center">
            <span className="text-3xl">🔥</span>
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
              Sản phẩm nổi bật
            </h2>
          </div>

          {hotProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-center items-center gap-6">
              {hotProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-zinc-500">
              Không có sản phẩm nào
            </div>
          )}
        </section>

        {/* Section 2: Categories */}
        <section id="sec-categories">
          <div className="flex items-center place-content-center gap-3 mb-8">
            <span className="text-3xl">📦</span>
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
              Danh mục sản phẩm
            </h2>
          </div>

          {categories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {categories.map((category) => (
                <CategoryCard key={category.slug} category={category} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-zinc-500">
              Không có danh mục nào
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function CategoryCard({ category }: { category: Category }) {
  const categoryIcons: Record<string, string> = {
    beauty: "💄",
    fragrances: "🌸",
    furniture: "🪑",
    groceries: "🛒",
    "home-decoration": "🏠",
    "kitchen-accessories": "🍳",
    laptops: "💻",
    "mens-shirts": "👔",
    "mens-shoes": "👟",
    "mens-watches": "⌚",
    "mobile-accessories": "📱",
    motorcycle: "🏍️",
    "skin-care": "🧴",
    smartphones: "📱",
    "sports-accessories": "⚽",
    sunglasses: "🕶️",
    tablets: "📱",
    tops: "👚",
    vehicle: "🚗",
    "womens-bags": "👜",
    "womens-dresses": "👗",
    "womens-jewellery": "💍",
    "womens-shoes": "👠",
    "womens-watches": "⌚",
  };

  return (
    <Link
      href={`/shop/category/${category.slug}`}
      className="group relative block bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105"
    >
      <div className="absolutebbb inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      <div className="relative z-10">
        <span className="text-4xl mb-4 block">
          {categoryIcons[category.slug] || "📦"}
        </span>
        <h3 className="font-bold text-lg capitalize leading-tight">
          {category.name}
        </h3>
        <span className="mt-2 inline-flex items-center text-sm text-white/80 group-hover:text-white transition-colors">
          Xem thêm →
        </span>
      </div>
    </Link>
  );
}
