import React from "react";
import styled from "styled-components";
import { Button } from "@fluentui/react-components";
import { colors, spacing, typography, media, shadows } from "../styles/designTokens";

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 24px 0 0 0;

  ${media.mobile} {
    /* Use fixed so it sticks to viewport bottom reliably */
    position: fixed;
    bottom: env(safe-area-inset-bottom, 0);
    left: 0;
    right: 0;
    padding: ${spacing[2]};
    gap: ${spacing[2]};
    margin: 0;
    background: var(--color-neutral-0, ${colors.neutral[0]});
    box-shadow: 0 -6px 18px rgba(0,0,0,0.06);
    z-index: 160;
    justify-content: center;
    /* ensure wrapper doesn't exceed viewport width */
    width: 100%;
  }
`;

const PageButton = styled(Button)<{ active?: boolean }>`
  background: ${({ active }) => (active ? "#e0e0e0" : "#fff")};
  font-weight: ${({ active }) => (active ? 700 : 400)};

  ${media.mobile} {
    padding: ${spacing[1]} ${spacing[2]} !important;
    min-width: 36px;
    font-size: ${typography.fontSize.xs} !important;
  }
`;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <PaginationWrapper>
      <PageButton
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </PageButton>
      {pages.map((page) => (
        <PageButton
          key={page}
          active={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </PageButton>
      ))}
      <PageButton
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </PageButton>
    </PaginationWrapper>
  );
};
