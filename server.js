// server.js
const express = require("express");
const path = require("path");
require("./config/databaseconnection");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Simple route
app.get("/", (req, res) => {
  res.send("🚀 Euni Messenger is running successfully on Render!");
});

// Error handler (optional)
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).send("Server Error");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is live on port ${PORT}`);
});
