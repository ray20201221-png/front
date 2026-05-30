const API = "https://back-i9l7.onrender.com";

async function register(){
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if(!username || !password){
        alert("請輸入帳號和密碼");
        return;
    }

    try{
        const res = await fetch(`${API}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if(data.success){
            alert("註冊成功");
            location.href = "login.html";
        }else{
            alert(data.message || "註冊失敗");
        }
    }catch(err){
        console.log(err);
        alert("無法連線到後端");
    }
}

async function login(){
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if(!username || !password){
        alert("請輸入帳號和密碼");
        return;
    }

    try{
        const res = await fetch(`${API}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if(data.success){
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.username);
            localStorage.setItem("is_admin", data.is_admin ? "1" : "0");

            location.href = data.is_admin ? "admin.html" : "index.html";
        }else{
            alert(data.message || "登入失敗");
        }
    }catch(err){
        console.log(err);
        alert("登入失敗，請確認後端是否啟動");
    }
}
