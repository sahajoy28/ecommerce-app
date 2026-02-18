import styled from "styled-components";

const StarContainer = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const Star = styled.span<{ filled: boolean; $size?: string }>`
  color: ${props => props.filled ? "#ffc107" : "#e0e0e0"};
  font-size: ${props => props.$size || "16px"};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const RatingText = styled.span`
  font-size: 14px;
  color: #666;
  margin-left: 8px;
`;

interface RatingDisplayProps {
  rating?: number;
  count?: number;
  size?: string;
  showText?: boolean;
}

export const RatingDisplay = ({ rating = 0, count, size = "16px", showText = true }: RatingDisplayProps) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);
  const safeRating = rating || 0;

  return (
    <StarContainer>
      {stars.map(star => (
        <Star key={star} filled={star <= Math.round(safeRating)} $size={size}>
          ★
        </Star>
      ))}
      {showText && (
        <RatingText>
          {safeRating.toFixed(1)} {count && `(${count})`}
        </RatingText>
      )}
    </StarContainer>
  );
};

interface RatingInputProps {
  value: number;
  onChange: (rating: number) => void;
  size?: string;
}

export const RatingInput = ({ value, onChange, size = "24px" }: RatingInputProps) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <StarContainer>
      {stars.map(star => (
        <Star 
          key={star} 
          filled={star <= value} 
          $size={size}
          onClick={() => onChange(star)}
          style={{ cursor: "pointer" }}
        >
          ★
        </Star>
      ))}
      <RatingText>{value}/5</RatingText>
    </StarContainer>
  );
};
