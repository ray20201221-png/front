
const API = "https://back-i9l7.onrender.com"; // ← 改這裡

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

function scrollBottom(){
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function send(){

    const input = document.getElementById("msg");
    const msg = input.value.trim();
    if(!msg) return;

    addMsg(msg,"me");
    input.value = "";

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
    addMsg(data.reply,"bot");
}

async function newChat(){

    await fetch(`${API}/clear`, {
        method:"POST"
    });

    chatBox.innerHTML = "";
    addMsg("👋 新聊天開始","bot");
}

function logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    location.href = "login.html";
}
