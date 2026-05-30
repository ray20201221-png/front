const API = "https://back-i9l7.onrender.com";

const chatBox = document.getElementById("chat");
const token = localStorage.getItem("token");
const isAdmin = localStorage.getItem("is_admin") === "1";
const adminButton = document.getElementById("adminButton");

if(adminButton && isAdmin){
    adminButton.style.display = "block";
}

function authHeaders(){
    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    };
}

function handleKey(e){
    if(e.key === "Enter"){
        send();
    }
}

function addMsg(text, type){
    const div = document.createElement("div");
    div.classList.add("msg", type);

    if(type === "bot"){
        div.innerHTML = marked.parse(text);
    }else{
        div.innerText = text;
    }

    chatBox.appendChild(div);
    scrollBottom();
}

function addLoadingMsg(id){
    const div = document.createElement("div");
    div.classList.add("msg", "bot");
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
        addMsg(data.reply || "後端沒有回覆內容", "bot");
    }catch(err){
        console.log(err);
        removeLoadingMsg(loadingId);
        addMsg("連線失敗，請確認後端是否啟動。", "bot");
    }
}

async function newChat(){
    await fetch(`${API}/clear`, {
        method: "POST",
        headers: authHeaders()
    });

    chatBox.innerHTML = "";
    addMsg("已開始新的聊天。", "bot");
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
