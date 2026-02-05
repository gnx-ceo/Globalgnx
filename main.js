const stateText = document.getElementById("stateText");

const secureBtn = document.getElementById("secureCall");
const ainBtn = document.getElementById("ain");
const idBtn = document.getElementById("identity");
const rootBtn = document.getElementById("root");

let socket;

function resetButtons() {
  [secureBtn, ainBtn, idBtn, rootBtn].forEach(b => b.classList.remove("active"));
}

function connectWS() {
  socket = new WebSocket(
    "wss://YOUR_API_ID.execute-api.ap-southeast-2.amazonaws.com/prod"
  );

  socket.onopen = () => {
    stateText.innerText = "STATE: CONNECTED";
    secureBtn.disabled = false;
  };

  socket.onclose = () => {
    stateText.innerText = "STATE: DISCONNECTED";
  };

  socket.onmessage = (e) => {
    console.log("WS:", e.data);
  };
}

secureBtn.onclick = () => {
  resetButtons();
  secureBtn.classList.add("active");

  socket.send(JSON.stringify({ action: "secure_call" }));

  stateText.innerText = "STATE: SECURE_CALL";
  ainBtn.disabled = false;
};

ainBtn.onclick = () => {
  resetButtons();
  ainBtn.classList.add("active");

  socket.send(JSON.stringify({ action: "ain_request" }));

  stateText.innerText = "STATE: AIN_REQUESTED";
  idBtn.disabled = false;
};

idBtn.onclick = () => {
  resetButtons();
  idBtn.classList.add("active");

  socket.send(JSON.stringify({ action: "identity" }));

  stateText.innerText = "STATE: IDENTITY_BOUND";
  rootBtn.disabled = false;
};

rootBtn.onclick = () => {
  resetButtons();
  rootBtn.classList.add("active");

  socket.send(JSON.stringify({ action: "root" }));

  stateText.innerText = "STATE: ROOT_GRANTED";
};

connectWS();