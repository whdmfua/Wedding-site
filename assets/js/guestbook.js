// Guestbook functionality
const MESSAGES_PER_PAGE = 10;
const ADMIN_PASSWORD = '0121';

let currentPage = 1;
let allMessages = [];

document.addEventListener('DOMContentLoaded', function() {
    loadMessages();

    document.getElementById('guestbook-form')?.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('guest-name').value;
        const message = document.getElementById('guest-message').value;

        if (name && message) {
            const messages = JSON.parse(localStorage.getItem('guestbookMessages') || '[]');
            // Detect language from current page
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            const lang = currentPage.includes('-th.html') ? 'th' : 'ko';

            messages.unshift({
                id: Date.now(),
                name: name,
                message: message,
                date: new Date().toLocaleDateString(),
                lang: lang
            });
            localStorage.setItem('guestbookMessages', JSON.stringify(messages));

            document.getElementById('guest-name').value = '';
            document.getElementById('guest-message').value = '';
            currentPage = 1;
            loadMessages();
        }
    });
});

function loadMessages() {
    allMessages = JSON.parse(localStorage.getItem('guestbookMessages') || '[]');

    // Ensure all messages have id
    allMessages = allMessages.map(msg => ({
        ...msg,
        id: msg.id || Date.now() + Math.random()
    }));

    displayMessages();
    displayPagination();
}

function displayMessages() {
    const container = document.getElementById('messages-container');
    if (!container) return;

    const totalPages = Math.ceil(allMessages.length / MESSAGES_PER_PAGE);
    const startIndex = (currentPage - 1) * MESSAGES_PER_PAGE;
    const endIndex = startIndex + MESSAGES_PER_PAGE;
    const messagesOnPage = allMessages.slice(startIndex, endIndex);

    // Detect current page language for empty message
    const currentPageLang = window.location.pathname.split('/').pop() || 'index.html';
    const isThaiPage = currentPageLang.includes('-th.html');
    const emptyMessage = isThaiPage ? 'ยังไม่มีข้อความ' : '아직 작성된 메시지가 없습니다.';

    if (messagesOnPage.length === 0) {
        container.innerHTML = `<p class="text-center opacity-50">${emptyMessage}</p>`;
        return;
    }

    container.innerHTML = messagesOnPage.map(msg => {
        // Optional: Add language flag indicator
        const langFlag = msg.lang === 'th' ? '🇹🇭' : (msg.lang === 'ko' ? '🇰🇷' : '');

        return `
        <div class="border p-4 mb-3" style="border-color: var(--primary); border-radius: var(--radius); background: var(--card);">
            <div class="flex items-center justify-between gap-2 mb-2">
                <div class="flex items-center gap-2">
                    <i data-lucide="heart" class="w-4 h-4" style="color: var(--primary);"></i>
                    <h3 class="font-serif text-lg" style="color: var(--card-foreground);">${msg.name}</h3>
                    ${langFlag ? `<span class="text-xs">${langFlag}</span>` : ''}
                </div>
                <i data-lucide="trash-2" class="w-4 h-4 delete-btn" onclick="deleteMessage('${msg.id}')"></i>
            </div>
            <p class="leading-relaxed mb-2 text-sm" style="color: var(--card-foreground);">${msg.message}</p>
            <p class="text-xs opacity-50">${msg.date}</p>
        </div>
    `}).join('');
    lucide.createIcons();
}

function displayPagination() {
    const paginationContainer = document.getElementById('pagination');
    if (!paginationContainer) return;

    const totalPages = Math.ceil(allMessages.length / MESSAGES_PER_PAGE);

    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }

    // Detect current page language for button text
    const currentPageLang = window.location.pathname.split('/').pop() || 'index.html';
    const isThaiPage = currentPageLang.includes('-th.html');
    const prevText = isThaiPage ? 'ก่อนหน้า' : '이전';
    const nextText = isThaiPage ? 'ถัดไป' : '다음';

    let paginationHTML = `
        <button onclick="goToPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>${prevText}</button>
    `;

    // Show page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (
            i === 1 ||
            i === totalPages ||
            (i >= currentPage - 2 && i <= currentPage + 2)
        ) {
            paginationHTML += `
                <button
                    onclick="goToPage(${i})"
                    class="${i === currentPage ? 'active' : ''}"
                >${i}</button>
            `;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            paginationHTML += '<span style="color: var(--primary);">...</span>';
        }
    }

    paginationHTML += `
        <button onclick="goToPage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>${nextText}</button>
    `;

    paginationContainer.innerHTML = paginationHTML;
}

function goToPage(page) {
    const totalPages = Math.ceil(allMessages.length / MESSAGES_PER_PAGE);
    if (page < 1 || page > totalPages) return;

    currentPage = page;
    displayMessages();
    displayPagination();

    // Scroll to messages container
    document.getElementById('messages-container')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function deleteMessage(messageId) {
    // Detect current page language for prompts
    const currentPageLang = window.location.pathname.split('/').pop() || 'index.html';
    const isThaiPage = currentPageLang.includes('-th.html');

    const passwordPrompt = isThaiPage ? 'กรุณาใส่รหัสผู้ดูแล:' : '관리자 암호를 입력하세요:';
    const incorrectPasswordMsg = isThaiPage ? 'รหัสผ่านไม่ถูกต้อง' : '암호가 올바르지 않습니다.';
    const confirmDeleteMsg = isThaiPage ? 'ต้องการลบข้อความนี้หรือไม่?' : '이 메시지를 삭제하시겠습니까?';

    const password = prompt(passwordPrompt);

    if (password !== ADMIN_PASSWORD) {
        alert(incorrectPasswordMsg);
        return;
    }

    if (!confirm(confirmDeleteMsg)) {
        return;
    }

    let messages = JSON.parse(localStorage.getItem('guestbookMessages') || '[]');
    messages = messages.filter(m => String(m.id) !== String(messageId));
    localStorage.setItem('guestbookMessages', JSON.stringify(messages));

    // Adjust current page if needed
    const totalPages = Math.ceil(messages.length / MESSAGES_PER_PAGE);
    if (currentPage > totalPages && totalPages > 0) {
        currentPage = totalPages;
    }

    loadMessages();
}
