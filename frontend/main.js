// Frontend controller logic.
// Responsible for fetching state and updating the DOM.

const API_BASE = "http://localhost:3000/api";
const PLAYER_ID = 1;

// Fetch player state from backend
async function loadPlayer() {
  const res = await fetch(`${API_BASE}/player/${PLAYER_ID}`);
  const data = await res.json();

  // Update UI
  document.getElementById("ore").textContent = data.ore ?? 0;
  document.getElementById("bars").textContent = data.bars ?? 0;
  document.getElementById("gold").textContent = data.gold ?? 0;
}

// Sell actions
async function sell(resource) {
  await fetch(`${API_BASE}/player/${PLAYER_ID}/sell`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resource, amount: 1 }),
  });

  loadPlayer();
}

// Wire up buttons
document.getElementById("sellOre").onclick = () => sell("ore");
document.getElementById("sellBars").onclick = () => sell("bars");

// Initial load
loadPlayer();
