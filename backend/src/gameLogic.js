
// gameLogic.js
// contains core game logic
// handles the resources and player state as well as idle reconciliation

// Redis client for runtime state
const { client, playerKey } = require("./redis");
// MySQL pool for persistence
const { pool } = require("./mysql");

/**
 * Helper: get all player resource keys
 */
function resourceKeys(playerId) {
  return {
    ore: `player:${playerId}:ore`,
    bars: `player:${playerId}:bars`,
    gold: `player:${playerId}:gold`,
  };
}

/**
 * Fetch current player state from Redis
 * Returns { ore, bars, gold }
 */
async function getPlayerState(playerId) {
  const keys = resourceKeys(playerId);
  const [ore, bars, gold] = await Promise.all([
    client.get(keys.ore),
    client.get(keys.bars),
    client.get(keys.gold),
  ]);

  return {
    ore: parseInt(ore) || 0,
    bars: parseInt(bars) || 0,
    gold: parseInt(gold) || 0,
  };
}

/**
 * Mine Ore (instant action)
 * Increments Ore count in Redis
 */
async function mineOre(playerId, amount = 1) {
  const keys = resourceKeys(playerId);
  await client.incrBy(keys.ore, amount);
  return await getPlayerState(playerId);
}

/**
 * Smelt Ore into Bars (instant action)
 * Decrements Ore, increments Bars
 */
async function smeltOre(playerId, amount = 1) {
  const keys = resourceKeys(playerId);
  const currentOre = parseInt(await client.get(keys.ore)) || 0;
  const smeltAmount = Math.min(currentOre, amount);

  if (smeltAmount <= 0) {
    // Nothing to smelt
    return await getPlayerState(playerId);
  }

  await client.decrBy(keys.ore, smeltAmount);
  await client.incrBy(keys.bars, smeltAmount);

  return await getPlayerState(playerId);
}

/**
 * Sell resources (Ore or Bars) for Gold
 * Updates Redis for runtime, MySQL for persistent total
 */
async function sellResource(playerId, resource, amount = 1) {
  const keys = resourceKeys(playerId);
  const resKey = keys[resource];
  if (!resKey) throw new Error("Invalid resource");

  const currentAmount = parseInt(await client.get(resKey)) || 0;
  const sellAmount = Math.min(currentAmount, amount);

  if (sellAmount <= 0) {
    // Nothing to sell
    return await getPlayerState(playerId);
  }

  const goldEarned = sellAmount * 10; // 1 Ore/Bar = 10 Gold

  // Update runtime state in Redis
  await client.decrBy(resKey, sellAmount);
  await client.incrBy(keys.gold, goldEarned);

  // Update persistent total in MySQL
  await pool.execute(
    `INSERT INTO player_gold (player_id, total_gold)
     VALUES (?, ?)
     ON DUPLICATE KEY UPDATE total_gold = total_gold + ?`,
    [playerId, goldEarned, goldEarned]
  );

  return await getPlayerState(playerId);
}

/**
 * Reconcile player state (idle progression)
 * Placeholder: can later add automatic resource generation over time
 */
async function reconcilePlayerState(playerId) {
  // Example: compute elapsed time since last tick
  // and add resources accordingly
  // For now, we just return current state
  return await getPlayerState(playerId);
}

module.exports = {
  mineOre,
  smeltOre,
  sellResource,
  getPlayerState,
  reconcilePlayerState,
};
