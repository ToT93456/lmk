const tabButtons = document.querySelectorAll(".tab-button");
const tabPanels = document.querySelectorAll(".tab-panel");
const scriptTitle = document.getElementById("script-title");
const scriptDescription = document.getElementById("script-description");
const scriptUpdatedAt = document.getElementById("script-updated-at");
const scriptContent = document.getElementById("script-content");
const scriptStatus = document.getElementById("script-status");
const copyButton = document.getElementById("copy-script-button");

let scriptCache = null;
const appConfig = window.APP_CONFIG || {};
const primaryAction = document.querySelector(".primary-action");

function normalizeScriptData(payload) {
    if (!payload) {
        throw new Error("ไม่พบข้อมูลสคริปต์");
    }

    if (typeof payload === "string") {
        return {
            title: "Hosted Script",
            description: "โหลดจาก URL ภายนอก",
            updatedAt: new Date().toISOString().slice(0, 10),
            content: payload,
        };
    }

    return {
        title: payload.title || "Hosted Script",
        description: payload.description || "โหลดจาก URL ภายนอก",
        updatedAt: payload.updatedAt || new Date().toISOString().slice(0, 10),
        content: payload.content || "",
    };
}

function setStatus(message, state) {
    scriptStatus.textContent = message;
    scriptStatus.classList.remove("is-success", "is-error");

    if (state) {
        scriptStatus.classList.add(state);
    }
}

function activateTab(targetId) {
    tabButtons.forEach((button) => {
        button.classList.toggle("is-active", button.dataset.tabTarget === targetId);
    });

    tabPanels.forEach((panel) => {
        panel.classList.toggle("is-active", panel.id === targetId);
    });
}

async function loadScript() {
    if (scriptCache) {
        return scriptCache;
    }

    setStatus("กำลังโหลดสคริปต์...", "");
    copyButton.disabled = true;
    
    const scriptSourceUrl = appConfig.scriptSourceUrl;

    if (!scriptSourceUrl || scriptSourceUrl.includes("your-domain.com")) {
        throw new Error("ยังไม่ได้ตั้งค่า URL ของสคริปต์");
    }

    const response = await fetch(scriptSourceUrl, {
        headers: {
            Accept: "application/json, text/plain;q=0.9, */*;q=0.8",
        },
    });

    if (!response.ok) {
        throw new Error("โหลดสคริปต์จาก URL ไม่สำเร็จ");
    }

    const contentType = response.headers.get("content-type") || "";

    if (contentType.includes("text/html")) {
        throw new Error("URL นี้เป็นหน้าเว็บ HTML ต้องใช้ลิงก์ไฟล์ .txt .lua หรือ .json แทน");
    }

    if (contentType.includes("application/json")) {
        scriptCache = normalizeScriptData(await response.json());
        return scriptCache;
    }

    scriptCache = normalizeScriptData(await response.text());
    return scriptCache;
}

async function showScriptPanel() {
    activateTab("script-panel");

    try {
        const script = await loadScript();
        scriptTitle.textContent = script.title;
        scriptDescription.textContent = script.description;
        scriptUpdatedAt.textContent = `Last updated: ${script.updatedAt}`;
        scriptContent.textContent = script.content;
        copyButton.disabled = false;
        setStatus("โหลดสคริปต์เรียบร้อยแล้ว กด Copy เพื่อคัดลอกได้ทันที", "is-success");
    } catch (error) {
        scriptTitle.textContent = "โหลดสคริปต์ไม่สำเร็จ";
        scriptDescription.textContent = "ตรวจสอบ URL ของสคริปต์ หรือการตั้งค่า CORS บนเว็บที่โฮส";
        scriptUpdatedAt.textContent = "Last updated: -";
        scriptContent.textContent = "เกิดข้อผิดพลาดในการโหลดข้อมูล";
        copyButton.disabled = true;
        setStatus(error instanceof Error ? error.message : "เกิดข้อผิดพลาด", "is-error");
    }
}

tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const targetId = button.dataset.tabTarget;

        if (!targetId) {
            return;
        }

        if (targetId === "script-panel") {
            void showScriptPanel();
            return;
        }

        activateTab(targetId);
        setStatus("กดแท็บ Script เพื่อโหลดโค้ดสำหรับคัดลอก", "");
    });
});

if (primaryAction) {
    primaryAction.addEventListener("click", () => {
        void showScriptPanel();
    });
}

copyButton.addEventListener("click", async () => {
    if (!scriptCache) {
        return;
    }

    try {
        await navigator.clipboard.writeText(scriptCache.content);
        setStatus("คัดลอกสคริปต์ไปที่คลิปบอร์ดแล้ว", "is-success");
    } catch (error) {
        setStatus(error instanceof Error ? error.message : "คัดลอกไม่สำเร็จ", "is-error");
    }
});
