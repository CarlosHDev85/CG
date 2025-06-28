const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

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

app.get('/', (req, res) => {
  res.json({ 
    message: 'Backend server is running',
    endpoints: ['/api/status']
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API endpoint available at: http://localhost:${PORT}/api/status`);
});