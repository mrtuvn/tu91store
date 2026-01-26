import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAllPosts, formatDate } from "@/lib/blog";
import { siteConfig } from "@/config/constants";

// SEO Metadata for blog listing page
export const metadata: Metadata = {
  title: `Blog | ${siteConfig.name}`,
  description:
    "Khám phá những bài viết hữu ích về sức khỏe, nhân sâm Hàn Quốc và các mẹo chăm sóc sức khỏe từ Tu91 Store.",
  keywords: [
    "blog sức khỏe",
    "nhân sâm hàn quốc",
    "mẹo sức khỏe",
    "Tu91 Store blog",
  ],
  openGraph: {
    title: `Blog | ${siteConfig.name}`,
    description:
      "Khám phá những bài viết hữu ích về sức khỏe, nhân sâm Hàn Quốc và các mẹo chăm sóc sức khỏe.",
    url: `${siteConfig.url}/blog`,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="py-12 px-4">
      <div className="container">
        {/* Page Header */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-balance">
            Blog Tu91 Store
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Chia sẻ kiến thức về sức khỏe, nhân sâm Hàn Quốc và những mẹo hữu
            ích cho cuộc sống khỏe mạnh.
          </p>
        </header>

        {/* Blog Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  {/* Featured Image */}
                  <div className="relative h-52 bg-linear-to-br from-amber-100 to-orange-200 dark:from-amber-900 dark:to-orange-800 overflow-hidden">
                    {post.image && (
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    )}
                    {/* Fallback gradient overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />

                    {/* Category Badge */}
                    {post.category && (
                      <span className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Date */}
                    <time
                      dateTime={post.date}
                      className="text-sm text-gray-500 dark:text-gray-400"
                    >
                      {formatDate(post.date)}
                    </time>

                    {/* Title */}
                    <h2 className="text-xl font-bold mt-2 mb-3 text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                      {post.description}
                    </p>

                    {/* Read More */}
                    <div className="mt-4 flex items-center text-amber-600 dark:text-amber-400 font-medium text-sm">
                      Đọc thêm
                      <svg
                        className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Chưa có bài viết nào. Hãy quay lại sau!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
