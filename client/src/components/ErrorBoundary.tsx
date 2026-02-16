import React, { ReactNode } from "react";
import styled from "styled-components";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: (error: Error, retry: () => void) => ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

const ErrorContainer = styled.div`
  padding: 2rem;
  margin: 1rem;
  background-color: #fee;
  border: 1px solid #fcc;
  border-radius: 8px;
  text-align: center;
`;

const ErrorTitle = styled.h2`
  color: #d32f2f;
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
`;

const ErrorMessage = styled.p`
  color: #c62828;
  margin: 0.5rem 0;
  font-size: 0.95rem;
`;

const ErrorDetails = styled.pre`
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 0.85rem;
  color: #d32f2f;
  text-align: left;
  margin: 1rem 0;
`;

const RetryButton = styled.button`
  background-color: #1976d2;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1565c0;
  }

  &:active {
    background-color: #0d47a1;
  }
`;

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  retry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError && this.state.error) {
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.retry);
      }

      return (
        <ErrorContainer>
          <ErrorTitle>Something went wrong</ErrorTitle>
          <ErrorMessage>
            We encountered an error. Please try again later or refresh the page.
          </ErrorMessage>
          <ErrorDetails>{this.state.error.toString()}</ErrorDetails>
          <RetryButton onClick={this.retry}>Retry</RetryButton>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

/**
 * Hook to catch errors in functional components
 * Usage: useErrorHandler(error)
 */
export function useErrorHandler(error: Error | null) {
  React.useEffect(() => {
    if (error) throw error;
  }, [error]);
}

export default ErrorBoundary;
