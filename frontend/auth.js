async function register(){

    const username =
        document.getElementById("username").value;

    const password =
        document.getElementById("password").value;

    if(!username || !password){

        alert("請輸入帳號密碼");

        return;
    }

    try{

        const res = await fetch("/register",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                username,
                password
            })
        });

        const data = await res.json();

        console.log(data);

        if(data.success){

            alert("✅ 註冊成功");

            location.href = "login.html";

        }else{

            alert(data.message);
        }

    }catch(err){

        console.log(err);

        alert("❌ 無法連接後端");
    }
}

async function login(){

    const username =
        document.getElementById("username").value;

    const password =
        document.getElementById("password").value;

    try{

        const res = await fetch("/login",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                username,
                password
            })
        });

        const data = await res.json();

        console.log(data);

        if(data.success){

            localStorage.setItem(
                "token",
                data.token
            );

            localStorage.setItem(
                "username",
                data.username
            );

            location.href = "/";

        }else{

            alert(data.message);
        }

    }catch(err){

        console.log(err);

        alert("❌ 登入失敗");
    }
}