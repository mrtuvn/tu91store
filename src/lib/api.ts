import { Category, Product, ProductsResponse } from "@/types/product";

const BASE_URL = "https://dummyjson.com";

export async function getHotProducts(limit: number = 15): Promise<Product[]> {
  const response = await fetch(
    `${BASE_URL}/products?limit=${limit}&sortBy=rating&order=desc`,
    { next: { revalidate: 3600 } }
  );
  const data: ProductsResponse = await response.json();
  return data.products;
}

export async function getCategories(limit: number = 5): Promise<Category[]> {
  const response = await fetch(`${BASE_URL}/products/categories`, {
    next: { revalidate: 3600 },
  });
  const data: Category[] = await response.json();
  return data.slice(0, limit);
}

export async function getProductById(id: number): Promise<Product> {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    next: { revalidate: 3600 },
  });
  const data: Product = await response.json();
  return data;
}

export async function getProductsByCategory(
  categorySlug: string
): Promise<Product[]> {
  const response = await fetch(
    `${BASE_URL}/products/category/${categorySlug}`,
    { next: { revalidate: 3600 } }
  );
  const data: ProductsResponse = await response.json();
  return data.products;
}

export async function getCategoryBySlug(
  slug: string
): Promise<Category | undefined> {
  const categories = await getCategories(100);
  return categories.find((cat) => cat.slug === slug);
}

