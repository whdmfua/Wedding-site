// Google Sheets Guestbook API
const GOOGLE_SHEETS_CONFIG = {
    webAppUrl: 'https://script.google.com/macros/s/AKfycbw_cwQnu98vjMqsU-h2hWnyc7LLXFnFlsGgh8ApNJOd_9Y4d5yousJPCXm0_hG3ONt8pg/exec'
};

class GoogleSheetsGuestbook {
    constructor(config) {
        this.webAppUrl = config.webAppUrl;
    }

    // 메시지 작성
    async createMessage(name, message, lang = 'ko') {
        try {
            const response = await fetch(this.webAppUrl, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action: 'createMessage',
                    name: name,
                    message: message,
                    lang: lang
                })
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.error || 'Failed to create message');
            }

            return data.data;
        } catch (error) {
            console.error('Failed to create message:', error);
            throw error;
        }
    }

    // 메시지 목록 조회
    async getMessages(page = 1, perPage = 10) {
        try {
            const url = `${this.webAppUrl}?action=getMessages&page=${page}&perPage=${perPage}`;
            const response = await fetch(url, {
                method: 'GET',
                mode: 'cors'
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.error || 'Failed to get messages');
            }

            return {
                messages: data.messages,
                totalPages: data.totalPages,
                currentPage: data.currentPage,
                totalCount: data.totalCount
            };
        } catch (error) {
            console.error('Failed to load messages:', error);
            throw error;
        }
    }

    // 전체 메시지 수 조회
    async getTotalCount() {
        try {
            const url = `${this.webAppUrl}?action=getCount`;
            const response = await fetch(url, {
                method: 'GET',
                mode: 'cors'
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.error || 'Failed to get count');
            }

            return data.totalCount;
        } catch (error) {
            console.error('Failed to get total count:', error);
            return 0;
        }
    }

    // 메시지 삭제
    async deleteMessage(rowIndex, password) {
        try {
            const response = await fetch(this.webAppUrl, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action: 'deleteMessage',
                    rowIndex: rowIndex,
                    password: password
                })
            });

            const data = await response.json();

            if (!data.success) {
                throw new Error(data.error || 'Failed to delete message');
            }

            return true;
        } catch (error) {
            console.error('Failed to delete message:', error);
            throw error;
        }
    }
}

// Export API instance
const sheetsGuestbook = new GoogleSheetsGuestbook(GOOGLE_SHEETS_CONFIG);
