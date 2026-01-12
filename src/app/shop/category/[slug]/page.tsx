import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getProductsByCategory,
  getCategoryBySlug,
  getCategories,
} from "@/lib/api";
import type { Product, Category } from "@/types/product";
import ProductCard from "@/components/products/ProductCard";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  try {
    const category = await getCategoryBySlug(slug);
    if (!category) {
      return { title: "Category Not Found" };
    }
    return {
      title: `${category.name} | Tu91Store`,
      description: `Khám phá các sản phẩm ${category.name} tại Tu91Store`,
    };
  } catch {
    return { title: "Category Not Found" };
  }
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  let products: Product[] = [];
  let category: Category | undefined;
  let allCategories: Category[] = [];

  try {
    [products, category, allCategories] = await Promise.all([
      getProductsByCategory(slug),
      getCategoryBySlug(slug),
      getCategories(20),
    ]);
  } catch {
    notFound();
  }

  if (!category) {
    notFound();
  }

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
    <div className="category-page py-12">
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
            <li className="text-zinc-900 dark:text-white font-medium capitalize">
              {category.name}
            </li>
          </ol>
        </nav>

        {/* Category Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 mb-12 overflow-hidden">
          <div className="absolutev inset-0 bg-black/10" />
          <div className="absolutev -right-10 -top-10 text-[150px] opacity-20">
            {categoryIcons[slug] || "📦"}
          </div>
          <div className="relative z-10">
            <span className="text-6xl mb-4 block">
              {categoryIcons[slug] || "📦"}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-white capitalize mb-2">
              {category.name}
            </h1>
            <p className="text-white/80">
              {products.length} sản phẩm trong danh mục này
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <aside className="lg:col-span-1">
            <div className="sticky top-4 bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-100 dark:border-zinc-800">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">
                Danh mục khác
              </h3>
              <ul className="space-y-2">
                {allCategories.map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      href={`/shop/category/${cat.slug}`}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                        cat.slug === slug
                          ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600"
                          : "hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                      }`}
                    >
                      <span>{categoryIcons[cat.slug] || "📦"}</span>
                      <span className="capitalize text-sm">{cat.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="lg:col-span-3">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    showCategory={false}
                    showDescription
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-zinc-50 dark:bg-zinc-900 rounded-2xl">
                <span className="text-6xl block mb-4">🔍</span>
                <h3 className="text-xl font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
                  Không tìm thấy sản phẩm
                </h3>
                <p className="text-zinc-500">
                  Danh mục này chưa có sản phẩm nào
                </p>
                <Link
                  href="/shop"
                  className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors"
                >
                  Quay lại cửa hàng
                </Link>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
