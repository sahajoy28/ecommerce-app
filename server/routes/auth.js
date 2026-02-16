import express from 'express';

const router = express.Router();

/**
 * POST /api/auth/login
 * Mock authentication endpoint
 * For now this is a mock implementation
 * Later will be connected to MongoDB with JWT
 */
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    console.log(`🔐 Login attempt: ${email}`);

    // Mock user data - replace with database query later
    const mockUser = {
      id: '1',
      email,
      name: 'Test User',
      role: 'user',
      createdAt: new Date().toISOString()
    };

    // Mock token - replace with JWT generation later
    const token = `mock_token_${Date.now()}`;

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: mockUser
    });
  } catch (error) {
    console.error('❌ Login error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Authentication failed'
    });
  }
});

/**
 * POST /api/auth/register
 * Mock registration endpoint
 * For now this is a mock implementation
 * Later will be connected to MongoDB with password hashing
 */
router.post('/register', (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        message: 'Email, password, and name are required'
      });
    }

    console.log(`📝 Registration attempt: ${email}`);

    // Mock user creation - replace with database operation later
    const newUser = {
      id: `user_${Date.now()}`,
      email,
      name,
      role: 'user',
      createdAt: new Date().toISOString()
    };

    // Mock token - replace with JWT generation later
    const token = `mock_token_${Date.now()}`;

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      token,
      user: newUser
    });
  } catch (error) {
    console.error('❌ Registration error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Registration failed'
    });
  }
});

/**
 * POST /api/auth/logout
 * Mock logout endpoint
 */
router.post('/logout', (req, res) => {
  console.log(`👋 User logged out`);

  res.json({
    success: true,
    message: 'Logout successful'
  });
});

/**
 * GET /api/auth/me
 * Get current user (mock)
 * In production, validate JWT token here
 */
router.get('/me', (req, res) => {
  // In production, extract user from JWT token in Authorization header
  const mockUser = {
    id: '1',
    email: 'user@example.com',
    name: 'Test User',
    role: 'user'
  };

  res.json({
    success: true,
    user: mockUser
  });
});

export default router;
