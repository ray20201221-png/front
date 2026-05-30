const API = "https://back-i9l7.onrender.com";

const chatBox = document.getElementById("chat");
const token = localStorage.getItem("token");
const username = localStorage.getItem("username") || "User";
const isAdmin = localStorage.getItem("is_admin") === "1";
const adminButton = document.getElementById("adminButton");
const userBadge = document.getElementById("userBadge");

if(adminButton && isAdmin){
    adminButton.style.display = "flex";
}

if(userBadge){
    userBadge.innerText = username.slice(0, 1).toUpperCase();
    userBadge.title = username;
}

if(window.lucide){
    lucide.createIcons();
}

function authHeaders(){
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
}

function removeWelcome(){
    const welcome = document.getElementById("welcome");
    if(welcome) welcome.remove();
}

function usePrompt(text){
    const input = document.getElementById("msg");
    input.value = text;
    input.focus();
}

function addMsg(text, type){
    removeWelcome();

    const row = document.createElement("div");
    row.className = `message-row ${type}`;

    const avatar = document.createElement("div");
    avatar.className = "message-avatar";
    avatar.innerText = type === "bot" ? "AI" : username.slice(0, 1).toUpperCase();

    const bubble = document.createElement("div");
    bubble.className = "msg";

    if(type === "bot"){
        bubble.innerHTML = marked.parse(text);
    }else{
        bubble.innerText = text;
    }

    row.appendChild(avatar);
    row.appendChild(bubble);
    chatBox.appendChild(row);
    scrollBottom();
}

function addLoadingMsg(id){
    removeWelcome();

    const row = document.createElement("div");
    row.className = "message-row bot";
    row.id = id;

    const avatar = document.createElement("div");
    avatar.className = "message-avatar";
    avatar.innerText = "AI";

    const bubble = document.createElement("div");
    bubble.className = "msg loading";
    bubble.innerHTML = `
        <div class="dot-loader">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;

    row.appendChild(avatar);
    row.appendChild(bubble);
    chatBox.appendChild(row);
    scrollBottom();
}

function removeLoadingMsg(id){
    const el = document.getElementById(id);
    if(el) el.remove();
}

function scrollBottom(){
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function send(){
    const input = document.getElementById("msg");
    const msg = input.value.trim();
    if(!msg) return;

    addMsg(msg, "me");
    input.value = "";

    const loadingId = "loading-" + Date.now();
    addLoadingMsg(loadingId);

    try{
        const res = await fetch(`${API}/chat`, {
            method: "POST",
            headers: authHeaders(),
            body: JSON.stringify({ message: msg })
        });

        if(res.status === 401){
            logout();
            return;
        }

        const data = await res.json();
        removeLoadingMsg(loadingId);
        addMsg(data.reply || t("backendNoReply"), "bot");
    }catch(err){
        console.log(err);
        removeLoadingMsg(loadingId);
        addMsg(t("connectionFailed"), "bot");
    }
}

async function newChat(){
    await fetch(`${API}/clear`, {
        method: "POST",
        headers: authHeaders()
    });

    chatBox.innerHTML = "";
    addMsg(t("freshChat"), "bot");
}

function openAdmin(){
    location.href = "admin.html";
}

function logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("is_admin");
    location.href = "login.html";
}
