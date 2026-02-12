// HTTP API routes.
// These adapt HTTP requests to game logic calls.

const express = require("express");
const {
  reconcilePlayerState,
  sellResources,
} = require("./gameLogic");

const router = express.Router();

// Get current player state
router.get("/player/:id", async (req, res) => {
  const playerId = req.params.id;

  // Ensure idle progress is applied before returning state
  await reconcilePlayerState(playerId);

  // In a real implementation:
  // Fetch Redis state and return it
  res.json({}); // stub
});

// Sell endpoint
router.post("/player/:id/sell", async (req, res) => {
  const { resource, amount } = req.body;

  await sellResources(req.params.id, resource, amount);

  res.json({ success: true });
});

module.exports = router;
