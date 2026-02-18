import { useState } from "react";
import styled from "styled-components";
import { Button, Input, Label, Text } from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { signup, login } from "../features/auth/authSlice";
import { loadCartAPI } from "../features/cart/cartSlice";
import { loadWishlistAPI } from "../features/wishlist/wishlistSlice";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%);
  padding: 20px;
`;

const FormWrapper = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 420px;
  padding: 48px;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
  border-bottom: 2px solid #e0e0e0;
`;

const Tab = styled.button<{ isActive: boolean }>`
  padding: 12px 24px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 16px;
  font-weight: ${props => props.isActive ? "600" : "500"};
  color: ${props => props.isActive ? "#667eea" : "#999"};
  border-bottom: ${props => props.isActive ? "3px solid #667eea" : "none"};
  margin-bottom: -2px;

  &:hover {
    color: #667eea;
  }
`;

const FormTitle = styled.h2`
  margin: 0 0 24px 0;
  font-size: 24px;
  font-weight: 700;
  color: #333;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledInput = styled(Input)`
  width: 100%;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 32px;
`;

const SubmitButton = styled(Button)`
  flex: 1;
`;

const ErrorMessage = styled.div`
  padding: 12px;
  background: #fee2e2;
  color: #dc2626;
  border-radius: 6px;
  margin-bottom: 16px;
  font-size: 14px;
`;

const SuccessMessage = styled.div`
  padding: 12px;
  background: #dcfce7;
  color: #16a34a;
  border-radius: 6px;
  margin-bottom: 16px;
  font-size: 14px;
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
