// MySQL connection and helper functions.
// This file represents the durable system of record.

const mysql = require("mysql2/promise");

// Create a connection pool for concurrency safety
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "idle_game",
  waitForConnections: true,
  connectionLimit: 10,
});

// Example function: load a player's durable checkpoint
async function loadPlayerCheckpoint(playerId) {
  // In a real implementation:
  // SELECT gold, ore, bars, last_checkpoint FROM players WHERE player_id = ?
  return null; // stub
}

// Example function: save a checkpoint
async function savePlayerCheckpoint(playerId, data) {
  // UPDATE players SET ... WHERE player_id = ?
}

module.exports = {
  pool,
  loadPlayerCheckpoint,
  savePlayerCheckpoint,
};
