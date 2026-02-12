// Core game logic lives here.
// This is intentionally separated from HTTP routing.

const { client, playerKey, lastTickKey } = require("./redis");

// This function will eventually:
// - Compute elapsed time
// - Generate resources
// - Apply atomic updates via Redis
async function reconcilePlayerState(playerId) {
  // Placeholder for idle progression logic
  // Will later be implemented with a Redis Lua script
  return;
}

// Instant action: sell resources for gold
async function sellResources(playerId, resourceType, amount) {
  // Validate input
  // Atomically decrement resource
  // Atomically increment gold
}

module.exports = {
  reconcilePlayerState,
  sellResources,
};
