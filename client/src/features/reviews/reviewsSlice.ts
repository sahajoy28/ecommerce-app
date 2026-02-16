import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Review } from "../../types/product";

interface ReviewsState {
  reviews: Record<number, Review[]>; // productId -> reviews
}

const initialState: ReviewsState = {
  reviews: {}
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    addReview: (state, action: PayloadAction<{ productId: number; review: Omit<Review, "id"> }>) => {
      const { productId, review } = action.payload;
      
      if (!state.reviews[productId]) {
        state.reviews[productId] = [];
      }

      const newReview: Review = {
        ...review,
        id: `review_${Date.now()}_${Math.random()}`
      };

      state.reviews[productId].unshift(newReview);
    },

    deleteReview: (state, action: PayloadAction<{ productId: number; reviewId: string }>) => {
      const { productId, reviewId } = action.payload;

      if (state.reviews[productId]) {
        state.reviews[productId] = state.reviews[productId].filter(r => r.id !== reviewId);
      }
    },

    updateHelpful: (state, action: PayloadAction<{ productId: number; reviewId: string }>) => {
      const { productId, reviewId } = action.payload;

      if (state.reviews[productId]) {
        const review = state.reviews[productId].find(r => r.id === reviewId);
        if (review) {
          review.helpful += 1;
        }
      }
    },

    initializeProductReviews: (state, action: PayloadAction<{ productId: number; reviews: Review[] }>) => {
      const { productId, reviews } = action.payload;
      state.reviews[productId] = reviews;
    }
  }
});

export const { addReview, deleteReview, updateHelpful, initializeProductReviews } = reviewsSlice.actions;
export default reviewsSlice.reducer;
