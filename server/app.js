const express = require('express');
const cors = require('cors');
require('dotenv').config();

const verifyRoute = require('./routes/verify');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ✅ Test route to confirm server is working
app.get('/ping', (req, res) => {
  console.log('🔔 Ping received');
  res.json({ message: 'pong' });
});

// ✅ Main verify route
app.use('/api/verify', verifyRoute);

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
