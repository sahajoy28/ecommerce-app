import React, { Suspense, ReactNode } from "react";
import styled from "styled-components";

const SkeletonContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
  padding: 1rem;
`;

const SkeletonCard = styled.div`
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 8px;
  height: 300px;

  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  min-height: 200px;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #1976d2;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ErrorContainer = styled.div`
  padding: 2rem;
  text-align: center;
  background-color: #fee;
  border: 1px solid #fcc;
  border-radius: 8px;
  margin: 1rem;
`;

const ErrorTitle = styled.h3`
  color: #d32f2f;
  margin: 0 0 0.5rem 0;
`;

const ErrorMessage = styled.p`
  color: #c62828;
  margin: 0;
`;

interface LoaderProps {
  count?: number;
}

export const ProductLoader: React.FC<LoaderProps> = ({ count = 12 }) => (
  <SkeletonContainer>
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </SkeletonContainer>
);

export const Loader: React.FC = () => (
  <LoadingContainer>
    <Spinner />
  </LoadingContainer>
);

interface SuspenseBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error) => void;
}

export const SuspenseBoundary: React.FC<SuspenseBoundaryProps> = ({
  children,
  fallback = <Loader />,
  onError,
}) => {
  return (
    <Suspense fallback={fallback}>
      <ErrorCatcher onError={onError}>{children}</ErrorCatcher>
    </Suspense>
  );
};

interface ErrorCatcherProps {
  children: ReactNode;
  onError?: (error: Error) => void;
}

interface ErrorCatcherState {
  hasError: boolean;
  error: Error | null;
}

class ErrorCatcher extends React.Component<ErrorCatcherProps, ErrorCatcherState> {
  constructor(props: ErrorCatcherProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorCatcherState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    this.props.onError?.(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorTitle>Failed to load content</ErrorTitle>
          <ErrorMessage>Please refresh the page and try again.</ErrorMessage>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default SuspenseBoundary;
