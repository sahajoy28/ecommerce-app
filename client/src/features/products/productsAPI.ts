import { productsApi, ApiError } from "../../services/apiClient";
import { Product, Review } from "../../types/product";

/**
 * Generate sample reviews for a product
 */
const generateSampleReviews = (productId: number): Review[] => {
  const reviewTexts = [
    { title: "Great product!", comment: "Really happy with this purchase. Excellent quality and arrived on time." },
    { title: "Good value for money", comment: "The price is reasonable and the product works as expected." },
    { title: "Highly recommend", comment: "Very satisfied with my purchase. Would buy again!" },
    { title: "Average quality", comment: "It's okay, does what it's supposed to do but nothing special." },
    { title: "Excellent!", comment: "Exceeded my expectations. Great durability and performance." },
  ];

  const reviewCount = Math.floor(Math.random() * 4) + 2; // 2-5 reviews
  const reviews = [];

  for (let i = 0; i < reviewCount; i++) {
    const reviewText = reviewTexts[Math.floor(Math.random() * reviewTexts.length)];
    const rating = Math.floor(Math.random() * 2) + 4; // 4-5 stars mostly

    reviews.push({
      id: `review_${productId}_${i}_${Date.now()}`,
      userId: `user_${i}`,
      userName: `User ${i + 1}`,
      rating,
      title: reviewText.title,
      comment: reviewText.comment,
      date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      helpful: Math.floor(Math.random() * 10),
    });
  }

  return reviews;
};

/**
 * Fetch products from DummyJSON API with error handling
 * DummyJSON provides 100+ products with full data (better than FakeStore's ~20 products)
 */
export const fetchProductsAPI = async (): Promise<Product[]> => {
  try {
    const response = await productsApi.get<any>("/products?limit=100");
    const products = response.products || response;
    
    if (!Array.isArray(products)) {
      throw new Error("Invalid API response format");
    }

    return products.map((product: any) => {
      const reviews = generateSampleReviews(product.id);
      const averageRating = reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : product.rating || 4;

      return {
        id: product.id,
        title: product.title,
        price: product.price,
        category: product.category,
        description: product.description,
        image: product.image || product.thumbnail,
        rating: Number(averageRating.toFixed(1)),
        reviewCount: reviews.length,
        reviews: reviews,
      };
    });
  } catch (error) {
    const apiError = error as ApiError;
    console.error("[API Error] Failed to fetch products:", apiError.message);
    throw new Error(apiError.message || "Failed to fetch products");
  }
};

/**
 * Fetch single product by ID
 */
export const fetchProductById = async (productId: number): Promise<Product | null> => {
  try {
    const response = await productsApi.get<any>(`/products/${productId}`);
    const reviews = generateSampleReviews(response.id);
    const averageRating = reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : response.rating || 4;
    
    return {
      id: response.id,
      title: response.title,
      price: response.price,
      category: response.category,
      description: response.description,
      image: response.image || response.thumbnail,
      rating: Number(averageRating.toFixed(1)),
      reviewCount: reviews.length,
      reviews: reviews,
    };
  } catch (error) {
    const apiError = error as ApiError;
    console.error(`[API Error] Failed to fetch product ${productId}:`, apiError.message);
    return null;
  }
};

/**
 * Search products by query
 */
export const searchProducts = async (query: string): Promise<Product[]> => {
  try {
    const response = await productsApi.get<any>(`/products/search?q=${encodeURIComponent(query)}`);
    const products = response.products || [];
    
    return products.map((product: any) => {
      const reviews = generateSampleReviews(product.id);
      const averageRating = reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : product.rating || 4;

      return {
        id: product.id,
        title: product.title,
        price: product.price,
        category: product.category,
        description: product.description,
        image: product.image || product.thumbnail,
        rating: Number(averageRating.toFixed(1)),
        reviewCount: reviews.length,
        reviews: reviews,
      };
    });
  } catch (error) {
    const apiError = error as ApiError;
    console.error("[API Error] Search failed:", apiError.message);
    return [];
  }
};