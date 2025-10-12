// Guestbook functionality with Google Sheets
const MESSAGES_PER_PAGE = 10;
const ADMIN_PASSWORD = '0121';

let currentPage = 1;
let allMessages = [];
let totalPages = 1;

document.addEventListener('DOMContentLoaded', function() {
    loadMessages();

    document.getElementById('guestbook-form')?.addEventListener('submit', async function(e) {
        e.preventDefault();
        const name = document.getElementById('guest-name').value.trim();
        const message = document.getElementById('guest-message').value.trim();
        const submitButton = this.querySelector('button[type="submit"]');

        if (name && message) {
            // Detect language from current page
            const currentPageUrl = window.location.pathname.split('/').pop() || 'index.html';
            const lang = currentPageUrl.includes('-th.html') ? 'th' : 'ko';

            try {
                // 로딩 상태 표시
                submitButton.disabled = true;
                const originalText = submitButton.textContent;
                submitButton.textContent = lang === 'th' ? 'กำลังบันทึก...' : '작성 중...';

                // Google Sheets로 메시지 생성
                await sheetsGuestbook.createMessage(name, message, lang);

                // 폼 초기화
                document.getElementById('guest-name').value = '';
                document.getElementById('guest-message').value = '';

                // 첫 페이지로 이동하여 새 메시지 표시
                currentPage = 1;
                await loadMessages();

                // 성공 메시지
                alert(lang === 'th' ? 'บันทึกข้อความสำเร็จ!' : '메시지가 작성되었습니다!');

                // 버튼 상태 복원
                submitButton.disabled = false;
                submitButton.textContent = originalText;
            } catch (error) {
                console.error('Error creating message:', error);
                alert(lang === 'th' ? 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง' : '오류가 발생했습니다. 다시 시도해주세요.');

                // 버튼 상태 복원
                submitButton.disabled = false;
                submitButton.textContent = lang === 'th' ? 'ส่งข้อความ' : '작성하기';
            }
        }
    });
});

async function loadMessages() {
    const container = document.getElementById('messages-container');
    if (!container) return;

    try {
        // 로딩 표시
        const currentPageLang = window.location.pathname.split('/').pop() || 'index.html';
        const isThaiPage = currentPageLang.includes('-th.html');
        container.innerHTML = `<p class="text-center opacity-50">${isThaiPage ? 'กำลังโหลด...' : '로딩 중...'}</p>`;

        // Google Sheets에서 메시지 로드
        const result = await sheetsGuestbook.getMessages(currentPage, MESSAGES_PER_PAGE);
        allMessages = result.messages;
        totalPages = result.totalPages;

        displayMessages();
        displayPagination();
    } catch (error) {
        console.error('Error loading messages:', error);
        const currentPageLang = window.location.pathname.split('/').pop() || 'index.html';
        const isThaiPage = currentPageLang.includes('-th.html');
        container.innerHTML = `<p class="text-center opacity-50" style="color: var(--destructive);">${isThaiPage ? 'ไม่สามารถโหลดข้อความได้' : '메시지를 불러오는데 실패했습니다.'}</p>`;
    }
}

function displayMessages() {
    const container = document.getElementById('messages-container');
    if (!container) return;

    // Detect current page language for empty message
    const currentPageLang = window.location.pathname.split('/').pop() || 'index.html';
    const isThaiPage = currentPageLang.includes('-th.html');
    const emptyMessage = isThaiPage ? 'ยังไม่มีข้อความ' : '아직 작성된 메시지가 없습니다.';

    if (allMessages.length === 0) {
        container.innerHTML = `<p class="text-center opacity-50">${emptyMessage}</p>`;
        return;
    }

    container.innerHTML = allMessages.map(msg => {
        // Format date
        let displayDate = msg.date;
        if (msg.date && typeof msg.date === 'string') {
            displayDate = msg.date;
        } else if (msg.timestamp) {
            const dateObj = new Date(msg.timestamp);
            displayDate = dateObj.toLocaleDateString('ko-KR');
        }

        // Language flag indicator
        const langFlag = msg.lang === 'th' ? '🇹🇭' : (msg.lang === 'ko' ? '🇰🇷' : '');

        // Escape HTML to prevent XSS
        const safeName = escapeHtml(msg.name);
        const safeMessage = escapeHtml(msg.message).replace(/\n/g, '<br>');

        return `
        <div class="border p-4 mb-3" style="border-color: var(--primary); border-radius: var(--radius); background: var(--card);">
            <div class="flex items-center justify-between gap-2 mb-2">
                <div class="flex items-center gap-2">
                    <i data-lucide="heart" class="w-4 h-4" style="color: var(--primary);"></i>
                    <h3 class="font-serif text-lg" style="color: var(--card-foreground);">${safeName}</h3>
                    ${langFlag ? `<span class="text-xs">${langFlag}</span>` : ''}
                </div>
                <i data-lucide="trash-2" class="w-4 h-4 delete-btn" onclick="deleteMessage(${msg.rowIndex})"></i>
            </div>
            <p class="leading-relaxed mb-2 text-sm" style="color: var(--card-foreground);">${safeMessage}</p>
            <p class="text-xs opacity-50">${displayDate}</p>
        </div>
    `}).join('');
    lucide.createIcons();
}

function displayPagination() {
    const paginationContainer = document.getElementById('pagination');
    if (!paginationContainer) return;

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
    if (page < 1 || page > totalPages) return;

    currentPage = page;
    loadMessages();

    // Scroll to messages container
    document.getElementById('messages-container')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

async function deleteMessage(rowIndex) {
    // Detect current page language for prompts
    const currentPageLang = window.location.pathname.split('/').pop() || 'index.html';
    const isThaiPage = currentPageLang.includes('-th.html');

    const passwordPrompt = isThaiPage ? 'กรุณาใส่รหัสผู้ดูแล:' : '관리자 암호를 입력하세요:';
    const incorrectPasswordMsg = isThaiPage ? 'รหัสผ่านไม่ถูกต้อง' : '암호가 올바르지 않습니다.';
    const confirmDeleteMsg = isThaiPage ? 'ต้องการลบข้อความนี้หรือไม่?' : '이 메시지를 삭제하시겠습니까?';

    const password = prompt(passwordPrompt);

    if (!password) return;

    if (password !== ADMIN_PASSWORD) {
        alert(incorrectPasswordMsg);
        return;
    }

    if (!confirm(confirmDeleteMsg)) {
        return;
    }

    try {
        await sheetsGuestbook.deleteMessage(rowIndex, password);

        // 현재 페이지 재로드
        await loadMessages();

        alert(isThaiPage ? 'ลบข้อความสำเร็จ' : '메시지가 삭제되었습니다.');
    } catch (error) {
        console.error('Error deleting message:', error);
        alert(isThaiPage ? 'เกิดข้อผิดพลาดในการลบข้อความ' : '메시지 삭제에 실패했습니다.');
    }
}

// Helper function to escape HTML and prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}
