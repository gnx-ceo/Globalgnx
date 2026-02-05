// 🧠 GNX Neural Connector

const WS_URL = "wss://gmcpl21323.execute-api.ap-southeast-2.amazonaws.com/dev/";

let socket;
let alive = false;

// DOM
const pulse = document.getElementById("pulse");
const stateView = document.getElementById("state");

// 🫀 호흡 상태
function idleBreath() {
  pulse.style.animation = "breathe-idle 4s infinite";
  stateView.textContent = "STATE: IDLE";
  alive = false;
}

function activeBreath(signal = "SIGNAL") {
  pulse.style.animation = "breathe-active 1.2s infinite";
  stateView.textContent = `STATE: ${signal}`;
  alive = true;
}

// 🔌 WebSocket 연결
function connectBrain() {
  socket = new WebSocket(WS_URL);

  socket.onopen = () => {
    console.log("🧠 Brain connected");
    activeBreath("NEURAL_LINK");
  };

  socket.onmessage = (event) => {
    console.log("📡 Signal:", event.data);
    activeBreath("INCOMING_SIGNAL");

    // 신호 후 다시 안정
    setTimeout(() => {
      idleBreath();
    }, 3000);
  };

  socket.onclose = () => {
    console.log("🧠 Brain disconnected");
    idleBreath();

    // 자동 재연결
    setTimeout(connectBrain, 3000);
  };

  socket.onerror = () => {
    idleBreath();
  };
}

// 초기화
idleBreath();
connectBrain();