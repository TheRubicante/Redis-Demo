// routes.js
// HTTP API routes mapping frontend requests to game logic functions

const express = require("express");
const router = express.Router();
const {
  mineOre,
  smeltOre,
  sellResource,
  getPlayerState,
  reconcilePlayerState,
} = require("./gameLogic");

/**
 * Get current player state
 * Applies idle reconciliation before returning state
 */
router.get("/player/:id", async (req, res) => {
  const playerId = req.params.id;

  try {
    // Apply any idle progression logic (stub for now)
    await reconcilePlayerState(playerId);

    // Return full resource state
    const state = await getPlayerState(playerId);
    res.json(state);
  } catch (err) {
    console.error("Error fetching player state:", err);
    res.status(500).json({ error: "Failed to fetch player state" });
  }
});

/**
 * Mine Ore endpoint
 * Example POST body: { amount: 1 } (optional, defaults to 1)
 */
router.post("/player/:id/mine", async (req, res) => {
  const playerId = req.params.id;
  const amount = req.body.amount || 1;

  try {
    const state = await mineOre(playerId, amount);
    res.json(state);
  } catch (err) {
    console.error("Error mining ore:", err);
    res.status(500).json({ error: "Failed to mine ore" });
  }
});

/**
 * Smelt Ore into Bars endpoint
 * Example POST body: { amount: 1 } (optional)
 */
router.post("/player/:id/smelt", async (req, res) => {
  const playerId = req.params.id;
  const amount = req.body.amount || 1;

  try {
    const state = await smeltOre(playerId, amount);
    res.json(state);
  } catch (err) {
    console.error("Error smelting ore:", err);
    res.status(500).json({ error: "Failed to smelt ore" });
  }
});

/**
 * Sell resources endpoint
 * Example POST body: { resource: "ore"|"bars", amount: 1 }
 */
router.post("/player/:id/sell", async (req, res) => {
  const playerId = req.params.id;
  const { resource, amount } = req.body;

  try {
    const state = await sellResource(playerId, resource, amount || 1);
    res.json(state);
  } catch (err) {
    console.error("Error selling resource:", err);
    res.status(500).json({ error: "Failed to sell resource" });
  }
});

module.exports = router;
