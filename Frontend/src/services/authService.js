// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock users data
const MOCK_USERS = [
  {
    _id: 'admin1',
    name: 'Admin User',
    email: 'admin@eventhub.com',
    password: 'admin123', // In real app, this would be hashed
    role: 'admin',
    bookings: [],
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'user1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'user123',
    role: 'user',
    bookings: [],
    createdAt: new Date().toISOString(),
  }
];

export const register = async (userData) => {
  await delay(1000);
  
  // Check if user already exists
  const existingUser = MOCK_USERS.find(user => user.email === userData.email);
  if (existingUser) {
    throw new Error('User already exists');
  }

  const newUser = {
    _id: `user_${Date.now()}`,
    name: userData.name,
    email: userData.email,
    role: 'user',
    bookings: [],
    createdAt: new Date().toISOString(),
  };

  // Add to mock users (in real app, this would be stored in database)
  MOCK_USERS.push({ ...newUser, password: userData.password });

  const token = `jwt_${newUser._id}_${Date.now()}`;
  
  return {
    user: newUser,
    token,
  };
};

export const login = async (credentials) => {
  await delay(1000);
  
  const user = MOCK_USERS.find(
    u => u.email === credentials.email && u.password === credentials.password
  );
  
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const token = `jwt_${user._id}_${Date.now()}`;
  
  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      bookings: user.bookings,
      createdAt: user.createdAt,
    },
    token,
  };
};

export const loadUser = async () => {
  await delay(500);
  
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }

  // Extract user ID from token (in real app, verify JWT)
  const userId = token.split('_')[1];
  const user = MOCK_USERS.find(u => u._id === userId);
  
  if (!user) {
    throw new Error('User not found');
  }

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    bookings: user.bookings,
    createdAt: user.createdAt,
  };
};
