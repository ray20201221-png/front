const API = "https://back-i9l7.onrender.com";
const token = localStorage.getItem("token");

const userList = document.getElementById("userList");
const selectedUser = document.getElementById("selectedUser");
const messageList = document.getElementById("messageList");
const codeFile = document.getElementById("codeFile");
const codeViewer = document.getElementById("codeViewer");

function authHeaders(){
    return {
        "Authorization": `Bearer ${token}`
    };
}

async function apiGet(path){
    const res = await fetch(`${API}${path}`, {
        headers: authHeaders()
    });

    if(res.status === 401 || res.status === 403){
        logout();
        return null;
    }

    return res.json();
}

async function loadUsers(){
    const users = await apiGet("/admin/users");
    if(!users) return;

    userList.innerHTML = "";

    users.forEach(user => {
        const button = document.createElement("button");
        button.className = "admin-list-item";
        button.innerText = user.is_admin ? `${user.username} (admin)` : user.username;
        button.onclick = () => loadMessages(user);
        userList.appendChild(button);
    });

    if(users.length){
        loadMessages(users[0]);
    }
}

async function loadMessages(user){
    selectedUser.innerText = user.username;
    messageList.innerHTML = "";

    const messages = await apiGet(`/admin/users/${user.id}/messages`);
    if(!messages) return;

    if(!messages.length){
        messageList.innerHTML = `<div class="empty-state">這個使用者還沒有聊天紀錄。</div>`;
        return;
    }

    messages.forEach(message => {
        const div = document.createElement("div");
        div.className = `admin-message ${message.role === "user" ? "me" : "bot"}`;
        div.innerText = `[${message.role}] ${message.content}`;
        messageList.appendChild(div);
    });
}

async function loadCodeFiles(){
    const files = await apiGet("/admin/code");
    if(!files) return;

    codeFile.innerHTML = "";

    files.forEach(file => {
        const option = document.createElement("option");
        option.value = file;
        option.innerText = file;
        codeFile.appendChild(option);
    });

    if(files.length){
        loadCodeFile();
    }
}

async function loadCodeFile(){
    const filename = codeFile.value;
    if(!filename) return;

    const data = await apiGet(`/admin/code/${encodeURIComponent(filename)}`);
    if(!data) return;

    codeViewer.innerText = data.content;
}

function logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("is_admin");
    location.href = "login.html";
}

loadUsers();
loadCodeFiles();
