import { useState } from "react";
import styled from "styled-components";
import { Button, Input, Label, Text } from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { signup, login } from "../features/auth/authSlice";
import { loadCartAPI } from "../features/cart/cartSlice";
import { loadWishlistAPI } from "../features/wishlist/wishlistSlice";
import { colors, spacing, typography, shadows, borderRadius, transitions, media } from "../styles/designTokens";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: ${colors.gradients.primary};
  padding: ${spacing[4]};

  ${media.mobile} {
    padding: ${spacing[3]};
  }
`;

const FormWrapper = styled.div`
  background: var(--color-neutral-0, ${colors.neutral[0]});
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
    padding: ${spacing[6]};
  }
`;

const TabContainer = styled.div`
  display: flex;
  gap: ${spacing[3]};
  margin-bottom: ${spacing[8]};
  border-bottom: 2px solid var(--color-neutral-200, ${colors.neutral[200]});
`;

const Tab = styled.button<{ isActive: boolean }>`
  padding: ${spacing[3]} ${spacing[6]};
  border: none;
  background: none;
  cursor: pointer;
  font-size: ${typography.fontSize.lg};
  font-weight: ${props => props.isActive ? typography.fontWeight.semibold : typography.fontWeight.medium};
  color: ${props => props.isActive ? `var(--color-primary, ${colors.primary.main})` : `var(--color-text-tertiary, ${colors.neutral[500]})`};
  border-bottom: ${props => props.isActive ? `3px solid var(--color-primary, ${colors.primary.main})` : "none"};
  margin-bottom: -2px;
  transition: all ${transitions.fast};
  min-height: 44px;

  &:hover {
    color: var(--color-primary, ${colors.primary.main});
  }

  ${media.mobile} {
    padding: ${spacing[2]} ${spacing[4]};
    font-size: ${typography.fontSize.md};
  }
`;

const FormTitle = styled.h2`
  margin: 0 0 ${spacing[6]} 0;
  font-size: ${typography.fontSize["2xl"]};
  font-weight: ${typography.fontWeight.extrabold};
  color: var(--color-text-primary, ${colors.neutral[900]});

  ${media.mobile} {
    font-size: ${typography.fontSize.xl};
  }
`;

const FormGroup = styled.div`
  margin-bottom: ${spacing[5]};
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};

  ${media.mobile} {
    margin-bottom: ${spacing[4]};
  }
`;

const StyledInput = styled(Input)`
  width: 100%;
  min-height: 44px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${spacing[3]};
  margin-top: ${spacing[8]};

  ${media.mobile} {
    flex-direction: column;
    gap: ${spacing[2]};
    margin-top: ${spacing[6]};
  }
`;

const SubmitButton = styled(Button)`
  flex: 1;
  min-height: 44px;
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
`;

const ErrorMessage = styled.div`
  padding: ${spacing[3]};
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
  color: ${colors.error};
  border-radius: ${borderRadius.md};
  margin-bottom: ${spacing[4]};
  font-size: ${typography.fontSize.sm};
  border-left: 4px solid ${colors.error};
  font-weight: ${typography.fontWeight.medium};
`;

const SuccessMessage = styled.div`
  padding: ${spacing[3]};
  background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
  color: ${colors.success};
  border-radius: ${borderRadius.md};
  margin-bottom: ${spacing[4]};
  font-size: ${typography.fontSize.sm};
  border-left: 4px solid ${colors.success};
  font-weight: ${typography.fontWeight.medium};
`;

type TabType = "login" | "signup";

export const AuthPage = () => {
  const [tab, setTab] = useState<TabType>("login");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error: authError } = useAppSelector(state => state.auth);

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  if (isAuthenticated) {
    navigate("/account");
  }

  const handleLoginChange = (field: string, value: string) => {
    setLoginForm(prev => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleSignupChange = (field: string, value: string) => {
    setSignupForm(prev => ({ ...prev, [field]: value }));
    setError("");
  };

  const handleLogin = async () => {
    if (!loginForm.email || !loginForm.password) {
      setError("Please fill in all fields");
      return;
    }

    if (!loginForm.email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    try {
      const result = await dispatch(login({ 
        email: loginForm.email, 
        password: loginForm.password 
      })).unwrap();
      
      // Load cart and wishlist from MongoDB
      await Promise.all([
        dispatch(loadCartAPI() as any).unwrap().catch(() => {}),
        dispatch(loadWishlistAPI() as any).unwrap().catch(() => {})
      ]);
      
      setSuccess("Login successful!");
      setTimeout(() => navigate("/account"), 1500);
    } catch (err: any) {
      setError(err || "Login failed");
    }
  };

  const handleSignup = async () => {
    if (!signupForm.name || !signupForm.email || !signupForm.password || !signupForm.confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (!signupForm.email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }

    if (signupForm.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (signupForm.password !== signupForm.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const result = await dispatch(signup({
        name: signupForm.name,
        email: signupForm.email,
        password: signupForm.password
      })).unwrap();

      // Load cart and wishlist from MongoDB (should be empty on new signup)
      await Promise.all([
        dispatch(loadCartAPI() as any).unwrap().catch(() => {}),
        dispatch(loadWishlistAPI() as any).unwrap().catch(() => {})
      ]);

      setSuccess("Account created successfully!");
      setTimeout(() => navigate("/account"), 1500);
    } catch (err: any) {
      setError(err || "Signup failed");
    }
  };

  return (
    <Container>
      <FormWrapper>
        <TabContainer>
          <Tab isActive={tab === "login"} onClick={() => setTab("login")}>
            Login
          </Tab>
          <Tab isActive={tab === "signup"} onClick={() => setTab("signup")}>
            Sign Up
          </Tab>
        </TabContainer>

        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}

        {tab === "login" ? (
          <>
            <FormTitle>Welcome Back</FormTitle>
            <FormGroup>
              <Label htmlFor="login-email" weight="semibold">Email</Label>
              <StyledInput
                id="login-email"
                type="email"
                placeholder="Enter your email"
                value={loginForm.email}
                onChange={(e, data) => handleLoginChange("email", data.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="login-password" weight="semibold">Password</Label>
              <StyledInput
                id="login-password"
                type="password"
                placeholder="Enter your password"
                value={loginForm.password}
                onChange={(e, data) => handleLoginChange("password", data.value)}
              />
            </FormGroup>
            <ButtonGroup>
              <SubmitButton appearance="primary" onClick={handleLogin} disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </SubmitButton>
            </ButtonGroup>
          </>
        ) : (
          <>
            <FormTitle>Create Account</FormTitle>
            <FormGroup>
              <Label htmlFor="signup-name" weight="semibold">Full Name</Label>
              <StyledInput
                id="signup-name"
                placeholder="Enter your name"
                value={signupForm.name}
                onChange={(e, data) => handleSignupChange("name", data.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="signup-email" weight="semibold">Email</Label>
              <StyledInput
                id="signup-email"
                type="email"
                placeholder="Enter your email"
                value={signupForm.email}
                onChange={(e, data) => handleSignupChange("email", data.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="signup-password" weight="semibold">Password</Label>
              <StyledInput
                id="signup-password"
                type="password"
                placeholder="Enter password (min 6 characters)"
                value={signupForm.password}
                onChange={(e, data) => handleSignupChange("password", data.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="signup-confirm" weight="semibold">Confirm Password</Label>
              <StyledInput
                id="signup-confirm"
                type="password"
                placeholder="Confirm password"
                value={signupForm.confirmPassword}
                onChange={(e, data) => handleSignupChange("confirmPassword", data.value)}
              />
            </FormGroup>
            <ButtonGroup>
              <SubmitButton appearance="primary" onClick={handleSignup} disabled={loading}>
                {loading ? "Creating Account..." : "Sign Up"}
              </SubmitButton>
            </ButtonGroup>
          </>
        )}
      </FormWrapper>
    </Container>
  );
};
