import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { updateProductReviews } from "../features/products/productsSlice";
import { Review } from "../types/product";
import { RatingDisplay } from "./RatingDisplay";
import { useStrings } from "../utils/strings";
import React from "react";
import { authApi, productsApi } from "../services/apiClient";

const Container = styled.div`
  margin: 20px 0;
`;

const Title = styled.h3`
  margin: 0 0 20px 0;
  color: #333;
  font-size: 18px;
`;

const ReviewsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ReviewItem = styled.div`
  background: #f9f9f9;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const ReviewAuthor = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const AuthorName = styled.span`
  font-weight: 600;
  color: #333;
  font-size: 14px;
`;

const ReviewDate = styled.span`
  font-size: 12px;
  color: #999;
`;

const ReviewActions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ReviewTitle = styled.h4`
  margin: 0 0 8px 0;
  color: #333;
  font-size: 15px;
  font-weight: 600;
`;

const ReviewComment = styled.p`
  margin: 0 0 12px 0;
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
`;

const ReviewFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #e0e0e0;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }
`;

const HelpfulButton = styled.button<{ helpful?: boolean }>`
  background: ${props => (props.helpful ? "#e8f5e9" : "transparent")};
  border: 1px solid ${props => (props.helpful ? "#4caf50" : "#ddd")};
  color: ${props => (props.helpful ? "#4caf50" : "#666")};
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #4caf50;
    color: #4caf50;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const DeleteButton = styled.button`
  background: #ffebee;
  border: 1px solid #ffcdd2;
  color: #d32f2f;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: #ffcdd2;
  }

  &:active {
    transform: scale(0.98);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #999;

  p {
    margin: 0;
    font-size: 14px;
  }
`;

const SortContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  flex-wrap: wrap;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const SortButton = styled.button<{ active?: boolean }>`
  padding: 8px 12px;
  border: 1px solid ${props => (props.active ? "#667eea" : "#ddd")};
  border-radius: 4px;
  background: ${props => (props.active ? "#f0f4ff" : "white")};
  color: ${props => (props.active ? "#667eea" : "#666")};
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: #667eea;
  }
`;

interface ReviewsListProps {
  productId: number | string;
}

export const ReviewsList = ({ productId }: ReviewsListProps) => {
  const dispatch = useAppDispatch();
  const { t } = useStrings();
  const user = useAppSelector((state: any) => state.auth.user);
  const [reviews, setReviews] = React.useState<Review[]>([]);
  const [sortBy, setSortBy] = React.useState<"recent" | "helpful" | "rating">("recent");
  const [userHelpfulVotes, setUserHelpfulVotes] = React.useState<Set<string>>(new Set());

  // Fetch reviews from the product API
  const fetchReviews = React.useCallback(async () => {
    try {
      const productData = await productsApi.get<any>(`/products/${productId}`);
      if (productData) {
        const p = productData.product || productData;
        setReviews(p.reviews || []);
        // Also update redux store
        dispatch(updateProductReviews({
          productId,
          reviews: p.reviews || [],
          rating: p.rating || 0,
          reviewCount: p.reviewCount || 0,
        }));
      }
    } catch (err) {
      console.error('Failed to fetch reviews:', err);
    }
  }, [productId, dispatch]);

  React.useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === "recent") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortBy === "helpful") {
      return b.helpful - a.helpful;
    } else if (sortBy === "rating") {
      return b.rating - a.rating;
    }
    return 0;
  });

  const refreshProductReviews = async () => {
    await fetchReviews();
  };

  const handleHelpful = async (reviewId: string) => {
    if (!userHelpfulVotes.has(reviewId)) {
      try {
        await productsApi.patch<any>(`/products/${productId}/reviews/${reviewId}/helpful`);
        setUserHelpfulVotes(prev => new Set([...prev, reviewId]));
        await refreshProductReviews();
      } catch (err) {
        console.error('Failed to update helpful:', err);
      }
    }
  };

  const handleDelete = async (reviewId: string) => {
    if (window.confirm(t("reviews.deleteConfirm"))) {
      try {
        await authApi.delete<any>(`/products/${productId}/reviews/${reviewId}`);
        await refreshProductReviews();
      } catch (err) {
        console.error('Failed to delete review:', err);
      }
    }
  };

  if (reviews.length === 0) {
    return (
      <Container>
        <Title>{t("reviews.title")}</Title>
        <EmptyState>
          <p>{t("reviews.noReviews")}</p>
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
      <Title>{t("reviews.title")} ({reviews.length})</Title>

      <SortContainer>
        <span style={{ fontSize: "13px", color: "#666", display: "flex", alignItems: "center" }}>
          {t("reviews.sortBy")}
        </span>
        <SortButton active={sortBy === "recent"} onClick={() => setSortBy("recent")}>
          {t("reviews.mostRecent")}
        </SortButton>
        <SortButton active={sortBy === "helpful"} onClick={() => setSortBy("helpful")}>
          {t("reviews.mostHelpful")}
        </SortButton>
        <SortButton active={sortBy === "rating"} onClick={() => setSortBy("rating")}>
          {t("reviews.highestRating")}
        </SortButton>
      </SortContainer>

      <ReviewsListContainer>
        {sortedReviews.map(review => (
          <ReviewItem key={review.id}>
            <ReviewHeader>
              <ReviewAuthor>
                <AuthorName>{review.userName}</AuthorName>
                <ReviewDate>{review.date}</ReviewDate>
              </ReviewAuthor>
              <ReviewActions>
                <RatingDisplay rating={review.rating} showText={false} size="14px" />
              </ReviewActions>
            </ReviewHeader>

            <ReviewTitle>{review.title}</ReviewTitle>
            <ReviewComment>{review.comment}</ReviewComment>

            <ReviewFooter>
              <HelpfulButton
                helpful={userHelpfulVotes.has(review.id)}
                onClick={() => handleHelpful(review.id)}
              >
                {t("reviews.helpful", { count: review.helpful })}
              </HelpfulButton>

              {user && user.id === review.userId && (
                <DeleteButton onClick={() => handleDelete(review.id)}>
                  {t("reviews.delete")}
                </DeleteButton>
              )}
            </ReviewFooter>
          </ReviewItem>
        ))}
      </ReviewsListContainer>
    </Container>
  );
};
