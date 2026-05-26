const API = "https://back-i9l7.onrender.com";

const chatBox = document.getElementById("chat");

function handleKey(e){
    if(e.key === "Enter"){
        send();
    }
}

function addMsg(text,type){
    const div = document.createElement("div");
    div.classList.add("msg",type);

    if(type === "bot"){
        div.innerHTML = marked.parse(text);
    }else{
        div.innerText = text;
    }

    chatBox.appendChild(div);
    scrollBottom();
}

// =====================
// 🔵 AI loading（三點動畫）
// =====================
function addLoadingMsg(id){
    const div = document.createElement("div");
    div.classList.add("msg","bot");
    div.id = id;

    div.innerHTML = `
        <div class="dot-loader">
            <span></span>
            <span></span>
            <span></span>
        </div>
    `;

    chatBox.appendChild(div);
    scrollBottom();
}

function removeLoadingMsg(id){
    const el = document.getElementById(id);
    if(el) el.remove();
}

function scrollBottom(){
    chatBox.scrollTop = chatBox.scrollHeight;
}

// =====================
// 🚀 send message
// =====================
async function send(){

    const input = document.getElementById("msg");
    const msg = input.value.trim();
    if(!msg) return;

    addMsg(msg,"me");
    input.value = "";

    // ⭐ loading
    const loadingId = "loading-" + Date.now();
    addLoadingMsg(loadingId);

    const res = await fetch(`${API}/chat`, {
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            message:msg
        })
    });

    const data = await res.json();

    // remove loading
    removeLoadingMsg(loadingId);

    addMsg(data.reply,"bot");
}

// =====================
// 🆕 new chat
// =====================
async function newChat(){

    await fetch(`${API}/clear`, {
        method:"POST"
    });

    chatBox.innerHTML = "";
    addMsg("👋 新聊天開始","bot");
}

// =====================
// 🚪 logout
// =====================
function logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    location.href = "login.html";
}
