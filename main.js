// ===============================
// GlobalGNX Main Controller
// ===============================

let socket = null;
let currentState = "IDLE";

// 모든 층 버튼 ID
const FLOORS = [
  "btn-secure-call", // 1F
  "btn-ain",         // 2F
  "btn-identity",    // 3F
  "btn-root"         // 4F
];

// 상태 표시
const stateEl = document.getElementById("state");
const wsStatusEl = document.getElementById("ws-status");
const lambdaStatusEl = document.getElementById("lambda-status");

// -------------------------------
// WebSocket 연결
// -------------------------------
function connectWebSocket() {
  const WS_URL = "wss://gmcpl21323.execute-api.ap-southeast-2.amazonaws.com/dev/";

  socket = new WebSocket(WS_URL);

  socket.onopen = () => {
    wsStatusEl.textContent = "CONNECTED";
    lambdaStatusEl.textContent = "OK";
  };

  socket.onclose = () => {
    wsStatusEl.textContent = "DISCONNECTED";
    lambdaStatusEl.textContent = "UNKNOWN";
  };

  socket.onerror = () => {
    wsStatusEl.textContent = "ERROR";
    lambdaStatusEl.textContent = "ERROR";
  };
}

connectWebSocket();

// -------------------------------
// UI 상태 제어 (🔥 핵심 로직)
// -------------------------------
function activateFloor(activeId, stateName) {
  // 🔴 1️⃣ 모든 층 OFF
  FLOORS.forEach(id => {
    document.getElementById(id).classList.remove("active");
  });

  // 🟢 2️⃣ 선택된 층만 ON
  document.getElementById(activeId).classList.add("active");

  // 상태 텍스트 갱신
  currentState = stateName;
  stateEl.textContent = `STATE: ${stateName}`;
}

// -------------------------------
// 버튼 이벤트 바인딩
// -------------------------------
document.getElementById("btn-secure-call").onclick = () => {
  activateFloor("btn-secure-call", "SECURE_CALL");
  sendAction("secure_call");
};

document.getElementById("btn-ain").onclick = () => {
  activateFloor("btn-ain", "AIN_REQUESTED");
  sendAction("acquire_ain");
};

document.getElementById("btn-identity").onclick = () => {
  activateFloor("btn-identity", "IDENTITY_BOUND");
  sendAction("my_identity");
};

document.getElementById("btn-root").onclick = () => {
  activateFloor("btn-root", "ROOT_GRANTED");
  sendAction("root_access");
};

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