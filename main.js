const WS_URL = "wss://gmcpl21323.execute-api.ap-southeast-2.amazonaws.com/dev";

let socket;

const wsState = document.getElementById("ws");
const lambdaState = document.getElementById("lambda");
const stateText = document.getElementById("state");

const secureBtn = document.getElementById("secureCall");
const ainBtn = document.getElementById("ain");
const idBtn = document.getElementById("identity");
const rootBtn = document.getElementById("root");

function connectWS() {
  socket = new WebSocket(WS_URL);

  socket.onopen = () => {
    wsState.innerText = "CONNECTED";
  };

  socket.onclose = () => {
    wsState.innerText = "DISCONNECTED";
  };

  socket.onmessage = (e) => {
    const msg = JSON.parse(e.data);
    lambdaState.innerText = "OK";

    if (msg.state) {
      stateText.innerText = "STATE: " + msg.state;
    }
  };
}

connectWS();

function send(action) {
  socket.send(JSON.stringify({ action }));
}

secureBtn.onclick = () => {
  send("SECURE_CALL");
  secureBtn.classList.add("active");
  ainBtn.disabled = false;
};

ainBtn.onclick = () => {
  send("AIN_REQUEST");
  ainBtn.classList.add("active");
  idBtn.disabled = false;
};

idBtn.onclick = () => {
  send("IDENTITY_BIND");
  idBtn.classList.add("active");
  rootBtn.disabled = false;
};

rootBtn.onclick = () => {
  send("ROOT_ACCESS");
  rootBtn.classList.add("active");
};