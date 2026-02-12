// main.js
// Frontend controller logic for idle game

const API_BASE = "http://localhost:3000/api";
const PLAYER_ID = 1; // demo player

/**
 * Fetch player state from backend and update the UI
 */
async function loadPlayer() {
  try {
    const res = await fetch(`${API_BASE}/player/${PLAYER_ID}`);
    const data = await res.json();

    document.getElementById("ore").textContent = data.ore ?? 0;
    document.getElementById("bars").textContent = data.bars ?? 0;
    document.getElementById("gold").textContent = data.gold ?? 0;
  } catch (err) {
    console.error("Error loading player state:", err);
  }
}

/**
 * Generic action function: call backend endpoint and refresh UI
 */
async function performAction(endpoint, body = {}) {
  try {
    await fetch(`${API_BASE}/player/${PLAYER_ID}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    loadPlayer();
  } catch (err) {
    console.error(`Error performing ${endpoint}:`, err);
  }
}

// Action handlers
function mineOre(amount = 1) {
  performAction("mine", { amount });
}

function smeltOre(amount = 1) {
  performAction("smelt", { amount });
}

function sell(resource, amount = 1) {
  performAction("sell", { resource, amount });
}

// Wire up buttons
document.getElementById("sellOre").onclick = () => sell("ore");
document.getElementById("sellBars").onclick = () => sell("bars");

// For Mine/Smelt buttons, create and add dynamically or add in HTML
// Here, we’ll add them dynamically
const resourcesDiv = document.getElementById("resources");

// Create Mine button
const mineBtn = document.createElement("button");
mineBtn.textContent = "Mine Ore";
mineBtn.onclick = () => mineOre();
resourcesDiv.appendChild(mineBtn);

// Create Smelt button
const smeltBtn = document.createElement("button");
smeltBtn.textContent = "Smelt Ore";
smeltBtn.onclick = () => smeltOre();
resourcesDiv.appendChild(smeltBtn);

// Initial load
loadPlayer();
