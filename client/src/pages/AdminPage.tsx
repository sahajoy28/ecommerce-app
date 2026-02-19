import { useState } from "react";
import styled from "styled-components";
import { Button, Input as FluentInput } from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { signup, login } from "../features/auth/authSlice";
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

const TabContainer = styled.div`
  display: flex;
  gap: ${spacing[4]};
  margin-bottom: ${spacing[8]};
  border-bottom: 2px solid ${colors.neutral[200]};
`;

const Tab = styled.button<{ isActive: boolean }>`
  padding: ${spacing[4]} ${spacing[8]};
  background: none;
  border: none;
  color: ${p => p.isActive ? colors.primary.main : colors.neutral[600]};
  font-weight: ${p => p.isActive ? typography.fontWeight.semibold : typography.fontWeight.normal};
  cursor: pointer;
  border-bottom: 3px solid ${p => p.isActive ? colors.primary.main : "transparent"};
  transition: ${transitions.base};

  &:hover {
    color: ${colors.primary.main};
  }
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
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!isLogin && !name.trim()) {
      setError("Name is required");
      return;
    }

    setIsLoading(true);

    try {
      if (isLogin) {
        // Login
        const result = await dispatch(login({ email, password }) as any);
        if (result.payload && result.payload.user?.role === "admin") {
          setSuccess("Login successful! Redirecting to admin dashboard...");
          setTimeout(() => {
            navigate("/admin-dashboard");
          }, 1000);
        } else {
          setError("This account is not an admin account.\n\n💡 TIP: If this is your first time, use Sign Up instead. The first registered account automatically becomes an admin.");
        }
      } else {
        // Signup - First user becomes admin automatically
        const result = await dispatch(
          signup({ name, email, password }) as any
        );
        if (result.payload) {
          if (result.payload.user?.role === "admin") {
            setSuccess("🎉 Admin account created! You can now login to access the dashboard.");
            setTimeout(() => {
              setIsLogin(true);
              setName("");
              setPassword("");
              setConfirmPassword("");
              setEmail("");
            }, 2000);
          } else {
            setError("Your account was created as a regular user. Only the first registered account becomes admin.");
          }
        }
      }
    } catch (err: any) {
      setError(err.message || (isLogin ? "Login failed" : "Registration failed"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Header>
          <Title>🔐 Admin Portal</Title>
          <Subtitle>Manage your store</Subtitle>
        </Header>

        <InfoBox>
          <strong>ℹ️  Admin Access Required</strong>
          <p>👉 <strong>First Time?</strong> Use "Sign Up" - the first registered account automatically becomes an admin!</p>
          <p>👉 <strong>Returning?</strong> Use "Login" with your admin credentials.</p>
        </InfoBox>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        <TabContainer>
          <Tab isActive={isLogin} onClick={() => setIsLogin(true)}>
            Login
          </Tab>
          <Tab isActive={!isLogin} onClick={() => setIsLogin(false)}>
            Sign Up
          </Tab>
        </TabContainer>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <FormGroup>
              <Label>Full Name</Label>
              <Input
                value={name}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
                placeholder="Enter your full name"
                disabled={isLoading}
              />
            </FormGroup>
          )}

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

          {!isLogin && (
            <FormGroup>
              <Label>Confirm Password</Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(event.target.value)}
                placeholder="Confirm password"
                disabled={isLoading}
              />
            </FormGroup>
          )}

          <SubmitButton
            appearance="primary"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : isLogin ? "Login to Admin" : "Create Admin Account"}
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
