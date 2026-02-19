import { useState } from "react";
import styled from "styled-components";
import { Button, Input as FluentInput } from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { login } from "../features/auth/authSlice";
import { colors, spacing, typography, shadows, borderRadius, transitions, media } from "../styles/designTokens";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, ${colors.primary.main} 0%, ${colors.primary.light} 100%);
  padding: ${spacing[8]};

  ${media.mobile} {
    padding: ${spacing[4]};
  }
`;

const FormWrapper = styled.div`
  background: white;
  border-radius: ${borderRadius.lg};
  box-shadow: ${shadows.lg};
  width: 100%;
  max-width: 420px;
  padding: ${spacing[12]};

  ${media.tablet} {
    max-width: 100%;
    padding: ${spacing[8]};
  }

  ${media.mobile} {
    padding: ${spacing[4]};
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${spacing[12]};
`;

const Title = styled.h1`
  font-size: ${typography.fontSize["5xl"]};
  color: ${colors.primary.main};
  margin-bottom: ${spacing[2]};
`;

const Subtitle = styled.p`
  font-size: ${typography.fontSize.base};
  color: ${colors.neutral[600]};
`;



const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};
  margin-bottom: ${spacing[8]};
`;

const Label = styled.label`
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.neutral[900]};
  font-size: ${typography.fontSize.sm};
`;

const Input = styled(FluentInput)`
  width: 100%;
`;

const SubmitButton = styled(Button)`
  width: 100%;
  padding: ${spacing[4]} ${spacing[8]};
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.semibold};
`;

const ErrorMessage = styled.div`
  color: ${colors.error};
  background: rgba(239, 68, 68, 0.1);
  padding: ${spacing[4]};
  border-radius: ${borderRadius.base};
  margin-bottom: ${spacing[8]};
  font-size: ${typography.fontSize.sm};
`;

const SuccessMessage = styled.div`
  color: ${colors.success};
  background: rgba(16, 185, 129, 0.1);
  padding: ${spacing[4]};
  border-radius: ${borderRadius.base};
  margin-bottom: ${spacing[8]};
  font-size: ${typography.fontSize.sm};
`;

const InfoBox = styled.div`
  background: ${colors.primary.lighter};
  border-left: 4px solid ${colors.primary.main};
  padding: ${spacing[4]};
  border-radius: ${borderRadius.base};
  margin-bottom: ${spacing[8]};
  font-size: ${typography.fontSize.sm};
  
  strong {
    color: ${colors.primary.main};
  }

  p {
    margin: ${spacing[2]} 0;
    color: ${colors.neutral[700]};
  }
`;

const BackButton = styled(Button)`
  width: 100%;
  margin-top: ${spacing[8]};
`;

export const AdminPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!email.trim() || !validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);

    try {
      const result = await dispatch(login({ email, password }) as any);
      if (result.payload && result.payload.user?.role === "admin") {
        setSuccess("Login successful! Redirecting to admin dashboard...");
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 1000);
      } else {
        setError("❌ This account doesn't have admin access. Contact the root administrator to grant you admin privileges.");
      }
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Header>
          <Title>🔐 Admin</Title>
          <Subtitle>Store Management Portal</Subtitle>
        </Header>

        <InfoBox>
          <strong>ℹ️  Admin Login</strong>
          <p>👉 Only administrators can access this portal.</p>
          <p>👉 <strong>Not an admin yet?</strong> Regular users should signup from the main store page.</p>
        </InfoBox>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Email Address</Label>
            <Input
              type="email"
              value={email}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
              placeholder="your@email.com"
              disabled={isLoading}
            />
          </FormGroup>

          <FormGroup>
            <Label>Password</Label>
            <Input
              type="password"
              value={password}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
              placeholder="Enter password"
              disabled={isLoading}
            />
          </FormGroup>

          <SubmitButton
            appearance="primary"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login to Admin"}
          </SubmitButton>
        </form>

        <BackButton
          appearance="secondary"
          onClick={() => navigate("/")}
          disabled={isLoading}
        >
          ← Back to Store
        </BackButton>
      </FormWrapper>
    </Container>
  );
};
