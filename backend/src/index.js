// Entry point for the backend application.
// This file wires everything together but contains no game logic.

const express = require("express");
const routes = require("./routes");

const app = express();

// Parse JSON bodies
app.use(express.json());

// Mount API routes
app.use("/api", routes);

// Health check endpoint
// Useful for sanity checks and demos
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Start HTTP server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
