// Google Sheets Guestbook API (JSONP + iframe 방식)
const GOOGLE_SHEETS_CONFIG = {
    webAppUrl: 'https://script.google.com/macros/s/AKfycbwQpZcuEisC75jjkQxxBbqyaiy6pufuP1yVBjOJ-XObvd-5vvW92YRWiOay9iw1ImxeHA/exec'
};

class GoogleSheetsGuestbook {
    constructor(config) {
        this.webAppUrl = config.webAppUrl;
    }

    // JSONP 요청 헬퍼
    jsonpRequest(url) {
        return new Promise((resolve, reject) => {
            const callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());

            window[callbackName] = function(data) {
                delete window[callbackName];
                document.body.removeChild(script);
                resolve(data);
            };

            const script = document.createElement('script');
            script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
            script.onerror = function() {
                delete window[callbackName];
                document.body.removeChild(script);
                reject(new Error('JSONP request failed'));
            };

            document.body.appendChild(script);
        });
    }

    // 메시지 작성 (iframe form submit 방식)
    async createMessage(name, message, lang = 'ko') {
        return new Promise((resolve, reject) => {
            try {
                // 고유 ID 생성
                const uniqueId = 'guestbook_iframe_' + Date.now();

                // iframe 생성
                const iframe = document.createElement('iframe');
                iframe.name = uniqueId;
                iframe.style.display = 'none';
                document.body.appendChild(iframe);

                // form 생성
                const form = document.createElement('form');
                form.target = uniqueId;
                form.method = 'POST';
                form.action = this.webAppUrl;
                form.style.display = 'none';

                // 데이터 필드 추가
                const fields = {
                    action: 'createMessage',
                    name: name,
                    message: message,
                    lang: lang
                };

                for (const key in fields) {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = key;
                    input.value = fields[key];
                    form.appendChild(input);
                }

                document.body.appendChild(form);

                // iframe 로드 완료 이벤트
                iframe.onload = function() {
                    // 성공으로 간주 (응답 확인 불가)
                    setTimeout(() => {
                        document.body.removeChild(iframe);
                        document.body.removeChild(form);
                        resolve({
                            timestamp: new Date().toISOString(),
                            name: name,
                            message: message,
                            lang: lang,
                            date: new Date().toLocaleDateString('ko-KR')
                        });
                    }, 1000);
                };

                // 에러 처리
                iframe.onerror = function() {
                    document.body.removeChild(iframe);
                    document.body.removeChild(form);
                    reject(new Error('Failed to submit form'));
                };

                // form 제출
                form.submit();
            } catch (error) {
                console.error('Failed to create message:', error);
                reject(error);
            }
        });
    }

    // 메시지 목록 조회 (JSONP 사용)
    async getMessages(page = 1, perPage = 10) {
        try {
            const url = `${this.webAppUrl}?action=getMessages&page=${page}&perPage=${perPage}`;
            const data = await this.jsonpRequest(url);

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

    // 전체 메시지 수 조회 (JSONP 사용)
    async getTotalCount() {
        try {
            const url = `${this.webAppUrl}?action=getCount`;
            const data = await this.jsonpRequest(url);

            if (!data.success) {
                throw new Error(data.error || 'Failed to get count');
            }

            return data.totalCount;
        } catch (error) {
            console.error('Failed to get total count:', error);
            return 0;
        }
    }

    // 메시지 삭제 (iframe form submit 방식)
    async deleteMessage(rowIndex, password) {
        return new Promise((resolve, reject) => {
            try {
                // 고유 ID 생성
                const uniqueId = 'guestbook_delete_iframe_' + Date.now();

                // iframe 생성
                const iframe = document.createElement('iframe');
                iframe.name = uniqueId;
                iframe.style.display = 'none';
                document.body.appendChild(iframe);

                // form 생성
                const form = document.createElement('form');
                form.target = uniqueId;
                form.method = 'POST';
                form.action = this.webAppUrl;
                form.style.display = 'none';

                // 데이터 필드 추가
                const fields = {
                    action: 'deleteMessage',
                    rowIndex: rowIndex,
                    password: password
                };

                for (const key in fields) {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = key;
                    input.value = fields[key];
                    form.appendChild(input);
                }

                document.body.appendChild(form);

                // iframe 로드 완료 이벤트
                iframe.onload = function() {
                    setTimeout(() => {
                        document.body.removeChild(iframe);
                        document.body.removeChild(form);
                        resolve(true);
                    }, 1000);
                };

                // 에러 처리
                iframe.onerror = function() {
                    document.body.removeChild(iframe);
                    document.body.removeChild(form);
                    reject(new Error('Failed to delete message'));
                };

                // form 제출
                form.submit();
            } catch (error) {
                console.error('Failed to delete message:', error);
                reject(error);
            }
        });
    }
}

// Export API instance
const sheetsGuestbook = new GoogleSheetsGuestbook(GOOGLE_SHEETS_CONFIG);
