<?php

declare(strict_types=1);
?>
<!DOCTYPE html>
<html lang="th">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Private Script Hub</title>
    <link rel="stylesheet" href="./assets/style.css">
</head>
<body>
    <div class="page-shell">
        <header class="hero-card">
            <p class="eyebrow">Private Script Hub</p>
            <h1>หน้ากลางสำหรับเปิดดูและคัดลอกสคริปต์</h1>
            <p class="hero-copy">
                หน้าแรกจะไม่โชว์โค้ดสคริปต์ตรง ๆ และจะมีแค่ 2 แท็บคือ
                <strong>Home</strong> กับ <strong>Script</strong>
                เพื่อแยกหน้าภาพรวมออกจากหน้าคัดลอกโค้ด
            </p>
        </header>

        <main class="content-card">
            <nav class="tab-bar" aria-label="Primary">
                <button class="tab-button is-active" data-tab-target="home-panel" type="button">Home</button>
                <button class="tab-button" data-tab-target="script-panel" type="button">Script</button>
            </nav>

            <section class="tab-panel is-active" id="home-panel">
                <div class="panel-grid">
                    <article class="info-card">
                        <span class="info-label">หน้า Home</span>
                        <h2>หน้าบ้าน</h2>
                        <p>
                            ใช้เป็นหน้าทักทายหรือใส่รายละเอียดสคริปต์แบบคร่าว ๆ ได้
                            โดยไม่เปิดเผยตัวโค้ดจริงทันที
                        </p>
                    </article>

                    <article class="info-card">
                        <span class="info-label">หน้า Script</span>
                        <h2>หน้าคัดลอก</h2>
                        <p>
                            เมื่อกดแท็บ Script ระบบจะดึงโค้ดจากฝั่ง PHP แล้วแสดงในกล่องโค้ด
                            พร้อมปุ่มคัดลอกทันที
                        </p>
                    </article>
                </div>
            </section>

            <section class="tab-panel" id="script-panel" aria-live="polite">
                <div class="script-header">
                    <div>
                        <span class="info-label">Script Access</span>
                        <h2 id="script-title">กำลังโหลดสคริปต์...</h2>
                        <p id="script-description">ระบบจะโหลดโค้ดเมื่อเปิดแท็บนี้</p>
                    </div>
                    <button class="copy-button" id="copy-script-button" type="button" disabled>Copy</button>
                </div>

                <div class="script-meta">
                    <span id="script-updated-at">Last updated: -</span>
                </div>

                <div class="code-frame">
                    <pre id="script-content">ยังไม่มีข้อมูลสคริปต์</pre>
                </div>

                <p class="helper-text" id="script-status">กดแท็บ Script เพื่อโหลดโค้ดสำหรับคัดลอก</p>
            </section>
        </main>
    </div>

    <script src="./assets/app.js" defer></script>
</body>
</html>
