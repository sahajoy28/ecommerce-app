import styled from "styled-components";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { updateProductReviews } from "../features/products/productsSlice";
import { RatingInput } from "./RatingDisplay";
import { useStrings } from "../utils/strings";
import { authApi } from "../services/apiClient";

const FormContainer = styled.div`
  background: #f9f9f9;
  border-radius: 8px;
  padding: 24px;
  margin: 20px 0;
  border: 1px solid #e0e0e0;
`;

const FormTitle = styled.h3`
  margin: 0 0 20px 0;
  color: #333;
  font-size: 18px;
`;

const FormGroup = styled.div`
  margin-bottom: 16px;

  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #555;
    font-size: 14px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #2196f3;
    box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  min-height: 100px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #2196f3;
    box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
`;

const Button = styled.button<{ primary?: boolean }>`
  flex: 1;
  padding: 12px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  ${props =>
    props.primary
      ? `
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
        }
      `
      : `
        background: #f0f0f0;
        color: #333;
        &:hover {
          background: #e0e0e0;
        }
      `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ErrorMessage = styled.p`
  color: #d32f2f;
  font-size: 12px;
  margin-top: 4px;
`;

const SuccessMessage = styled.p`
  color: #388e3c;
  font-size: 12px;
  margin-top: 4px;
`;

interface AddReviewFormProps {
  productId: number;
  onReviewAdded?: () => void;
}

export const AddReviewForm = ({ productId, onReviewAdded }: AddReviewFormProps) => {
  const dispatch = useAppDispatch();
  const { t } = useStrings();
  const user = useAppSelector((state: any) => state.auth.user);
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (!user) {
    return (
      <FormContainer>
        <FormTitle>{t("reviews.addReview")}</FormTitle>
        <p style={{ color: "#666", marginBottom: 0 }}>
          {t("reviews.loginToReview", { link: "" })}
          <a href="/login" style={{ color: "#667eea", textDecoration: "none" }}>
            {t("reviews.loginLink")}
          </a>
        </p>
      </FormContainer>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (rating === 0) {
      setError(t("reviews.selectRating"));
      return;
    }
    if (!title.trim()) {
      setError(t("reviews.enterTitle"));
      return;
    }
    if (!comment.trim()) {
      setError(t("reviews.enterComment"));
      return;
    }

    setLoading(true);

    try {
      const result = await authApi.post<any>(`/products/${productId}/reviews`, {
        rating,
        title: title.trim(),
        comment: comment.trim(),
      });

      if (result.success) {
        // Refresh product reviews from the server
        const productData = await authApi.get<any>(`/products/${productId}`);
        if (productData) {
          const product = productData.product || productData;
          dispatch(updateProductReviews({
            productId,
            reviews: product.reviews || [],
            rating: product.rating || 0,
            reviewCount: product.reviewCount || 0,
          }));
        }

        setSuccess(t("reviews.reviewAdded"));
        setRating(0);
        setTitle("");
        setComment("");

        if (onReviewAdded) {
          setTimeout(onReviewAdded, 1500);
        }
      }
    } catch (err: any) {
      const message = err?.details?.message || err?.message || "Failed to add review";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormContainer>
      <FormTitle>{t("reviews.shareExperience")}</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <label>{t("reviews.rating")}</label>
          <RatingInput value={rating} onChange={setRating} size="32px" />
          {error && error.includes("rating") && <ErrorMessage>{error}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <label htmlFor="title">{t("reviews.title")}</label>
          <Input
            id="title"
            type="text"
            placeholder={t("reviews.titlePlaceholder")}
            value={title}
            onChange={e => setTitle(e.target.value)}
            maxLength={100}
          />
          <span style={{ fontSize: "12px", color: "#999" }}>{title.length}{t("reviews.charLimit100")}</span>
          {error && error.includes("title") && <ErrorMessage>{error}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <label htmlFor="comment">{t("reviews.comment")}</label>
          <TextArea
            id="comment"
            placeholder={t("reviews.commentPlaceholder")}
            value={comment}
            onChange={e => setComment(e.target.value)}
            maxLength={500}
          />
          <span style={{ fontSize: "12px", color: "#999" }}>{comment.length}{t("reviews.charLimit500")}</span>
          {error && error.includes("comment") && <ErrorMessage>{error}</ErrorMessage>}
        </FormGroup>

        {success && <SuccessMessage>{success}</SuccessMessage>}
        {error && !success && <ErrorMessage>{error}</ErrorMessage>}

        <ButtonContainer>
          <Button type="submit" primary disabled={loading}>
            {loading ? t("reviews.submitting") : t("reviews.submitReview")}
          </Button>
          <Button
            type="button"
            onClick={() => {
              setRating(0);
              setTitle("");
              setComment("");
              setError("");
            }}
          >
            {t("reviews.clearForm")}
          </Button>
        </ButtonContainer>
      </form>
    </FormContainer>
  );
};
