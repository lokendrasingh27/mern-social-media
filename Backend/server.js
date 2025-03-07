require('dotenv').config();
const app = require('./app');
const http = require('http');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;

const server = http.createServer(app);
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});