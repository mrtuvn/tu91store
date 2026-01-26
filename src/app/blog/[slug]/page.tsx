import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  getPostBySlug,
  getAllPostSlugs,
  formatDate,
  getRecentPosts,
} from "@/lib/blog";
import { siteConfig } from "@/config/constants";

// Generate static params for all blog posts (SEO optimization)
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Dynamic SEO metadata for each blog post
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Không tìm thấy bài viết",
    };
  }

  return {
    title: `${post.title} | ${siteConfig.name}`,
    description: post.description,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${siteConfig.url}/blog/${post.slug}`,
      siteName: siteConfig.name,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: post.image
        ? [
            {
              url: `${siteConfig.url}${post.image}`,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.image ? [`${siteConfig.url}${post.image}`] : [],
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const recentPosts = getRecentPosts(3).filter((p) => p.slug !== slug);

  return (
    <div className="py-12 px-4">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <li>
              <Link
                href="/"
                className="hover:text-amber-600 dark:hover:text-amber-400"
              >
                Trang chủ
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                href="/blog"
                className="hover:text-amber-600 dark:hover:text-amber-400"
              >
                Blog
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white truncate max-w-[200px]">
              {post.title}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <article className="lg:col-span-2">
            {/* Featured Image */}
            <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8 bg-linear-to-br from-amber-100 to-orange-200 dark:from-amber-900 dark:to-orange-800">
              {post.image && (
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              )}
            </div>

            {/* Post Header */}
            <header className="mb-8">
              {/* Category */}
              {post.category && (
                <span className="inline-block bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 text-sm font-medium px-3 py-1 rounded-full mb-4">
                  {post.category}
                </span>
              )}

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white text-balance">
                {post.title}
              </h1>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </div>
              </div>
            </header>

            {/* Post Content */}
            <div
              className="prose prose-lg dark:prose-invert max-w-none
                prose-headings:text-gray-900 dark:prose-headings:text-white
                prose-h2:text-2xl prose-h2:font-bold prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-xl prose-h3:font-semibold prose-h3:mt-6 prose-h3:mb-3
                prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
                prose-ul:my-4 prose-li:text-gray-700 dark:prose-li:text-gray-300
                prose-strong:text-gray-900 dark:prose-strong:text-white
                prose-a:text-amber-600 dark:prose-a:text-amber-400 prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Tags:
                  </span>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm px-3 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Back to Blog */}
            <div className="mt-8">
              <Link
                href="/blog"
                className="inline-flex items-center text-amber-600 dark:text-amber-400 font-medium hover:underline"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Quay lại Blog
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            {/* Recent Posts */}
            {recentPosts.length > 0 && (
              <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-6">
                <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">
                  Bài viết khác
                </h3>
                <div className="space-y-4">
                  {recentPosts.map((recentPost) => (
                    <Link
                      key={recentPost.slug}
                      href={`/blog/${recentPost.slug}`}
                      className="block group"
                    >
                      <article className="flex gap-4">
                        <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-linear-to-br from-amber-100 to-orange-200 dark:from-amber-900 dark:to-orange-800">
                          {recentPost.image && (
                            <Image
                              src={recentPost.image}
                              alt={recentPost.title}
                              fill
                              className="object-cover"
                              sizes="80px"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2 text-sm">
                            {recentPost.title}
                          </h4>
                          <time
                            dateTime={recentPost.date}
                            className="text-xs text-gray-500 dark:text-gray-400 mt-1 block"
                          >
                            {formatDate(recentPost.date)}
                          </time>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Box */}
            <div className="mt-6 bg-linear-to-br from-amber-500 to-orange-600 rounded-2xl p-6 text-white">
              <h3 className="text-lg font-bold mb-2">Cần tư vấn?</h3>
              <p className="text-sm opacity-90 mb-4">
                Liên hệ Tu91 Store để được tư vấn về sản phẩm nhân sâm Hàn Quốc
                chính hãng.
              </p>
              <a
                href={`tel:${siteConfig.contact.phone}`}
                className="inline-flex items-center bg-white text-amber-600 font-semibold px-4 py-2 rounded-lg hover:bg-amber-50 transition-colors"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                {siteConfig.contact.phone}
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
