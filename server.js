// Import express, path and the routes modules
const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// Create an express app and set the port
const app = express();
const PORT = process.env.PORT || 3001;

// Use middleware for JSON, URL encoding and serving static files
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Use the routes for /api and / (root)
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Start the server and log the URL
app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT} 🚀`));
