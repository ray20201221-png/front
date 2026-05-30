const I18N = {
    zh: {
        appSubtitle: "研究助理",
        newChat: "新聊天",
        admin: "管理後台",
        logout: "登出",
        ragLabel: "RAG",
        ragNote: "有知識庫文件時，系統會啟用 HyDE 檢索與重排序。",
        chatWorkspace: "聊天工作區",
        askTitle: "詢問 RUI AI",
        welcomeTitle: "今天想一起處理什麼？",
        welcomeText: "你可以問問題、探索文件，或測試 RAG 流程。",
        promptKnowledge: "整理知識庫",
        promptRag: "解釋 RAG",
        promptDeploy: "協助部署除錯",
        messagePlaceholder: "傳訊息給 RUI AI...",
        send: "送出",
        loginTitle: "登入 | RUI AI",
        welcomeBack: "歡迎回來",
        loginHeading: "登入後繼續使用",
        username: "帳號",
        password: "密碼",
        login: "登入",
        noAccount: "還沒有帳號？",
        createOne: "建立帳號",
        registerTitle: "註冊 | RUI AI",
        createAccount: "建立帳號",
        registerHeading: "開始新的工作區",
        register: "註冊",
        haveAccount: "已經有帳號？",
        consoleSubtitle: "RUI AI 控制台",
        chat: "聊天",
        users: "使用者",
        conversationAudit: "對話稽核",
        userMessages: "使用者聊天紀錄",
        backend: "後端",
        sourceViewer: "程式碼檢視",
        retrieval: "檢索",
        ragKnowledge: "RAG 知識庫",
        reindex: "重建索引",
        language: "語言",
        zh: "中文",
        en: "English",
        emptyMessages: "這個使用者還沒有聊天紀錄。",
        noKnowledge: "尚未加入知識庫文件",
        fileCount: "文件數",
        folder: "資料夾",
        ragRebuilt: "RAG 索引已重建",
        backendNoReply: "後端沒有回傳回覆。",
        connectionFailed: "連線失敗，請確認後端是否啟動。",
        freshChat: "已開始新的聊天。",
        needCredentials: "請輸入帳號和密碼。",
        accountCreated: "帳號已建立。",
        registerFailed: "註冊失敗。",
        cannotReachBackend: "無法連線到後端。",
        loginFailed: "登入失敗。",
        loginBackendFailed: "登入失敗，請確認後端是否啟動。"
    },
    en: {
        appSubtitle: "Research assistant",
        newChat: "New chat",
        admin: "Admin",
        logout: "Logout",
        ragLabel: "RAG",
        ragNote: "HyDE retrieval and reranking are enabled when knowledge files are available.",
        chatWorkspace: "Chat workspace",
        askTitle: "Ask RUI AI",
        welcomeTitle: "What can we work through today?",
        welcomeText: "Ask a question, explore your documents, or test the RAG pipeline.",
        promptKnowledge: "Summarize knowledge",
        promptRag: "Explain RAG",
        promptDeploy: "Debug deployment",
        messagePlaceholder: "Message RUI AI...",
        send: "Send",
        loginTitle: "Login | RUI AI",
        welcomeBack: "Welcome back",
        loginHeading: "Sign in to continue",
        username: "Username",
        password: "Password",
        login: "Login",
        noAccount: "No account yet?",
        createOne: "Create one",
        registerTitle: "Register | RUI AI",
        createAccount: "Create account",
        registerHeading: "Start a new workspace",
        register: "Register",
        haveAccount: "Already have an account?",
        consoleSubtitle: "RUI AI console",
        chat: "Chat",
        users: "Users",
        conversationAudit: "Conversation audit",
        userMessages: "User messages",
        backend: "Backend",
        sourceViewer: "Source viewer",
        retrieval: "Retrieval",
        ragKnowledge: "RAG knowledge base",
        reindex: "Reindex",
        language: "Language",
        zh: "中文",
        en: "English",
        emptyMessages: "This user has no chat history yet.",
        noKnowledge: "No knowledge files have been added yet",
        fileCount: "Files",
        folder: "Folder",
        ragRebuilt: "RAG index rebuilt",
        backendNoReply: "The backend did not return a reply.",
        connectionFailed: "Connection failed. Please check whether the backend is running.",
        freshChat: "Started a fresh chat.",
        needCredentials: "Please enter a username and password.",
        accountCreated: "Account created.",
        registerFailed: "Registration failed.",
        cannotReachBackend: "Cannot reach the backend.",
        loginFailed: "Login failed.",
        loginBackendFailed: "Login failed. Please check whether the backend is running."
    }
};

function currentLang(){
    return localStorage.getItem("lang") || "zh";
}

function t(key){
    const lang = currentLang();
    return I18N[lang]?.[key] || I18N.zh[key] || key;
}

function setLanguage(lang){
    localStorage.setItem("lang", lang);
    applyI18n();
    if(typeof onLanguageChanged === "function"){
        onLanguageChanged();
    }
}

function applyI18n(){
    const lang = currentLang();
    document.documentElement.lang = lang === "zh" ? "zh-TW" : "en";

    document.querySelectorAll("[data-i18n]").forEach(el => {
        el.innerText = t(el.dataset.i18n);
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
        el.placeholder = t(el.dataset.i18nPlaceholder);
    });

    document.querySelectorAll("[data-i18n-title]").forEach(el => {
        el.title = t(el.dataset.i18nTitle);
    });

    document.querySelectorAll("[data-lang]").forEach(el => {
        el.classList.toggle("active", el.dataset.lang === lang);
    });

    const titleKey = document.body.dataset.titleKey;
    if(titleKey){
        document.title = t(titleKey);
    }
}

document.addEventListener("DOMContentLoaded", applyI18n);
