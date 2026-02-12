// Redis client setup.
// Redis is used as the authoritative runtime state engine.

const { createClient } = require("redis");

const client = createClient({
  url: "redis://localhost:6379",
});

// Handle connection errors explicitly
client.on("error", (err) => {
  console.error("Redis error:", err);
});

// Connect immediately on startup
async function connectRedis() {
  if (!client.isOpen) {
    await client.connect();
  }
}

// Example key helpers
function playerKey(playerId) {
  return `player:${playerId}`;
}

function lastTickKey(playerId) {
  return `player:${playerId}:last_tick`;
}

module.exports = {
  client,
  connectRedis,
  playerKey,
  lastTickKey,
};
