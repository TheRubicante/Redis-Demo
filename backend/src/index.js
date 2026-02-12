const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const { connectRedis } = require("./redis"); // import

const app = express();

// Enable CORS
app.use(cors());

// Parse JSON
app.use(express.json());

// Function to start the server
async function startServer() {
  try {
    // Connect to Redis before handling any requests
    await connectRedis();
    console.log("Redis connected");

    // Mount routes
    app.use("/api", routes);

    // Health check
    app.get("/health", (req, res) => {
      res.json({ status: "ok" });
    });

    const PORT = 3000;
    app.listen(PORT, () => {
      console.log(`Backend running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start backend:", err);
  }
}

// Start everything
startServer();
