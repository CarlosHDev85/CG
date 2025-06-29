const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// In-memory user store (for demonstration purposes)
const users = {}; // { username: { passwordHash, preferences: { name, text } } }

app.get('/api/status', (req, res) => {
  const response = {
    status: "online",
    message: "Server is running successfully",
    timestamp: new Date().toISOString(),
    testString: "Hello from Node.js server!"
  };
  
  console.log('API call received - responding with:', response);
  res.json(response);
});

// Check if username exists
app.post('/api/user/check', (req, res) => {
  const { username } = req.body;
  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }
  res.json({ exists: !!users[username] });
});

// Register new user
app.post('/api/user/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }
  if (users[username]) {
    return res.status(409).json({ message: 'Username already exists' });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    users[username] = { passwordHash, preferences: { name: '', text: '' } };
    console.log(`User registered: ${username}`);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// User login
app.post('/api/user/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const user = users[username];
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  try {
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (isMatch) {
      console.log(`User logged in: ${username}`);
      res.json({ message: 'Login successful', preferences: user.preferences });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Save user preferences
app.post('/api/user/preferences', (req, res) => {
  const { username, name, text } = req.body;
  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }
  if (!users[username]) {
    return res.status(404).json({ message: 'User not found' });
  }

  users[username].preferences = { name, text };
  console.log(`Preferences saved for user: ${username}`);
  res.json({ message: 'Preferences saved successfully' });
});

// Get user preferences
app.get('/api/user/preferences/:username', (req, res) => {
  const { username } = req.params;
  if (!users[username]) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json({ preferences: users[username].preferences });
});


app.get('/', (req, res) => {
  res.json({ 
    message: 'Backend server is running',
    endpoints: [
      '/api/status',
      '/api/user/check (POST)',
      '/api/user/register (POST)',
      '/api/user/login (POST)',
      '/api/user/preferences (POST)',
      '/api/user/preferences/:username (GET)'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API endpoint available at: http://localhost:${PORT}/api/status`);
});
