/* ===== CONFIG ===== */
const WS_URL = "wss://YOUR_API_ID.execute-api.ap-southeast-2.amazonaws.com/prod";
/* ================== */

const wsStatus = document.getElementById("wsStatus");
const lambdaStatus = document.getElementById("lambdaStatus");
const stateText = document.getElementById("stateText");

const secureBtn = document.getElementById("secureCall");
const ainBtn = document.getElementById("ain");
const idBtn = document.getElementById("identity");
const rootBtn = document.getElementById("root");

const buttons = [secureBtn, ainBtn, idBtn, rootBtn];

const ws = new WebSocket(WS_URL);

/* ===== ENGINE STATUS ===== */
ws.onopen = () => {
  wsStatus.innerText = "WebSocket: CONNECTED";
};

ws.onclose = () => {
  wsStatus.innerText = "WebSocket: DISCONNECTED";
};

ws.onerror = () => {
  wsStatus.innerText = "WebSocket: ERROR";
};

ws.onmessage = (event) => {
  lambdaStatus.innerText = "Lambda: OK";
  const data = JSON.parse(event.data);
  stateText.innerText = "STATE: " + data.routeKey;
};

/* ===== UI HELPERS ===== */
function resetButtons() {
  buttons.forEach(b => b.classList.remove("active"));
}

function send(action, btn, label) {
  resetButtons();
  btn.classList.add("active");
  stateText.innerText = "STATE: " + label;
  ws.send(JSON.stringify({ action }));
}

/* ===== BUTTON EVENTS ===== */
secureBtn.onclick = () => send("SECURE_CALL", secureBtn, "SECURE_CALL");
ainBtn.onclick = () => send("AIN_REQUEST", ainBtn, "AIN_REQUESTED");
idBtn.onclick = () => send("IDENTITY", idBtn, "IDENTITY_BOUND");
rootBtn.onclick = () => send("ROOT", rootBtn, "ROOT_GRANTED");