require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const locationRoutes = require('./routes/location');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// Routes
app.use('/api/location', locationRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
