// Blog types and utility functions

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  date: string; // Format: YYYY-MM-DD
  image: string;
  author: string;
  category?: string;
  tags?: string[];
}

// Import posts from data file
import { posts } from "@/app/blog/data/posts";

/**
 * Get all blog posts sorted by date (newest first)
 */
export function getAllPosts(): BlogPost[] {
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Get a single blog post by slug
 */
export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}

/**
 * Get all post slugs for static generation
 */
export function getAllPostSlugs(): string[] {
  return posts.map((post) => post.slug);
}

/**
 * Get recent posts (for sidebar, homepage, etc.)
 */
export function getRecentPosts(count: number = 5): BlogPost[] {
  return getAllPosts().slice(0, count);
}

/**
 * Get posts by category
 */
export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter((post) => post.category === category);
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

