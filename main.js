// ===============================
// GlobalGNX Main Controller
// ===============================

let socket = null;

// 모든 버튼 DOM 직접 보관
const buttons = {
  secure: document.getElementById("btn-secure-call"),
  ain: document.getElementById("btn-ain"),
  identity: document.getElementById("btn-identity"),
  root: document.getElementById("btn-root")
};

const stateEl = document.getElementById("state");
const wsStatusEl = document.getElementById("ws-status");
const lambdaStatusEl = document.getElementById("lambda-status");

// -------------------------------
// WebSocket
// -------------------------------
function connectWebSocket() {
  socket = new WebSocket(
    "wss://gmcpl21323.execute-api.ap-southeast-2.amazonaws.com/dev/"
  );

  socket.onopen = () => {
    wsStatusEl.textContent = "CONNECTED";
    lambdaStatusEl.textContent = "OK";
  };

  socket.onclose = () => {
    wsStatusEl.textContent = "DISCONNECTED";
    lambdaStatusEl.textContent = "UNKNOWN";
  };
}

connectWebSocket();

// -------------------------------
// 🔥 핵심: 모든 불 끄기
// -------------------------------
function turnOffAllLights() {
  Object.values(buttons).forEach(btn => {
    btn.style.background = "transparent";
    btn.style.color = "#00ff66";
  });
}

// -------------------------------
// 🔥 선택된 층만 켜기
// -------------------------------
function turnOn(btn, stateName) {
  turnOffAllLights(); // ← 여기서 100% 소등

  btn.style.background = "#00ff66";
  btn.style.color = "#000";

  stateEl.textContent = `STATE: ${stateName}`;
}

// -------------------------------
// Lambda 전송
// -------------------------------
function sendAction(action) {
  if (!socket || socket.readyState !== WebSocket.OPEN) return;

  socket.send(JSON.stringify({
    action,
    timestamp: Date.now()
  }));
}

// -------------------------------
// 버튼 이벤트
// -------------------------------
buttons.secure.onclick = () => {
  turnOn(buttons.secure, "SECURE_CALL");
  sendAction("secure_call");
};

buttons.ain.onclick = () => {
  turnOn(buttons.ain, "AIN_REQUESTED");
  sendAction("acquire_ain");
};

buttons.identity.onclick = () => {
  turnOn(buttons.identity, "IDENTITY_BOUND");
  sendAction("my_identity");
};

buttons.root.onclick = () => {
  turnOn(buttons.root, "ROOT_GRANTED");
  sendAction("root_access");
};