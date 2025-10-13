// Google Sheets Guestbook API
// JSONP for GET requests, iframe for POST requests to bypass CORS

const GOOGLE_SHEETS_CONFIG = {
    // 사용자가 제공한 Apps Script Web App URL
    webAppUrl: 'https://script.google.com/macros/s/AKfycbx-LA5amhJZdPvvJRXBBVlUIQIgHjeZRiMzuxYmtC6WCHgBmD_zeLJOWz7apmAjuGFLGg/exec'
};

class GoogleSheetsGuestbook {
    constructor(config) {
        this.webAppUrl = config.webAppUrl;
    }

    /**
     * JSONP 요청 (GET용)
     * CORS를 우회하기 위해 script 태그를 동적으로 생성
     */
    jsonpRequest(url) {
        return new Promise((resolve, reject) => {
            // 고유한 콜백 함수명 생성
            const callbackName = 'jsonp_' + Date.now() + '_' + Math.floor(Math.random() * 100000);

            // 타임아웃 설정 (10초)
            const timeout = setTimeout(() => {
                cleanup();
                reject(new Error('JSONP request timeout'));
            }, 10000);

            // 정리 함수
            const cleanup = () => {
                clearTimeout(timeout);
                if (window[callbackName]) {
                    delete window[callbackName];
                }
                if (script && script.parentNode) {
                    script.parentNode.removeChild(script);
                }
            };

            // script 엘리먼트 생성
            const script = document.createElement('script');

            // 글로벌 콜백 함수 등록
            window[callbackName] = (data) => {
                cleanup();
                resolve(data);
            };

            // 에러 핸들링
            script.onerror = () => {
                cleanup();
                reject(new Error('JSONP request failed'));
            };

            // URL에 콜백 파라미터 추가
            const separator = url.includes('?') ? '&' : '?';
            script.src = `${url}${separator}callback=${callbackName}`;

            // DOM에 추가하여 요청 시작
            document.head.appendChild(script);
        });
    }

    /**
     * iframe form submit (POST용)
     * CORS를 우회하기 위해 hidden iframe으로 form을 제출
     */
    formSubmit(data) {
        return new Promise((resolve, reject) => {
            const iframeId = 'iframe_' + Date.now();

            // iframe 생성
            const iframe = document.createElement('iframe');
            iframe.name = iframeId;
            iframe.style.display = 'none';

            // form 생성
            const form = document.createElement('form');
            form.target = iframeId;
            form.method = 'POST';
            form.action = this.webAppUrl;
            form.style.display = 'none';

            // 데이터를 hidden input으로 추가
            Object.keys(data).forEach(key => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = data[key];
                form.appendChild(input);
            });

            // 타임아웃 설정 (10초)
            const timeout = setTimeout(() => {
                cleanup();
                reject(new Error('Form submit timeout'));
            }, 10000);

            // 정리 함수
            const cleanup = () => {
                clearTimeout(timeout);
                if (iframe.parentNode) {
                    iframe.parentNode.removeChild(iframe);
                }
                if (form.parentNode) {
                    form.parentNode.removeChild(form);
                }
            };

            // iframe 로드 완료 이벤트
            // 주의: 응답 데이터를 직접 읽을 수 없으므로 성공으로 간주
            iframe.onload = () => {
                setTimeout(() => {
                    cleanup();
                    resolve(true);
                }, 500);
            };

            // 에러 핸들링
            iframe.onerror = () => {
                cleanup();
                reject(new Error('Form submit failed'));
            };

            // DOM에 추가
            document.body.appendChild(iframe);
            document.body.appendChild(form);

            // form 제출
            form.submit();
        });
    }

    /**
     * 메시지 작성
     */
    async createMessage(name, message, lang = 'ko') {
        try {
            await this.formSubmit({
                action: 'createMessage',
                name: name,
                message: message,
                lang: lang
            });

            return {
                timestamp: new Date().toISOString(),
                name: name,
                message: message,
                lang: lang,
                date: new Date().toLocaleDateString('ko-KR')
            };
        } catch (error) {
            console.error('Failed to create message:', error);
            throw error;
        }
    }

    /**
     * 메시지 목록 조회
     */
    async getMessages(page = 1, perPage = 10) {
        try {
            const url = `${this.webAppUrl}?action=getMessages&page=${page}&perPage=${perPage}`;
            const data = await this.jsonpRequest(url);

            if (!data || !data.success) {
                throw new Error(data?.error || 'Failed to get messages');
            }

            return {
                messages: data.messages || [],
                totalPages: data.totalPages || 0,
                currentPage: data.currentPage || page,
                totalCount: data.totalCount || 0
            };
        } catch (error) {
            console.error('Failed to load messages:', error);
            throw error;
        }
    }

    /**
     * 전체 메시지 수 조회
     */
    async getTotalCount() {
        try {
            const url = `${this.webAppUrl}?action=getCount`;
            const data = await this.jsonpRequest(url);

            if (!data || !data.success) {
                throw new Error(data?.error || 'Failed to get count');
            }

            return data.totalCount || 0;
        } catch (error) {
            console.error('Failed to get total count:', error);
            return 0;
        }
    }

    /**
     * 메시지 삭제
     */
    async deleteMessage(rowIndex, password) {
        try {
            await this.formSubmit({
                action: 'deleteMessage',
                rowIndex: rowIndex,
                password: password
            });

            return true;
        } catch (error) {
            console.error('Failed to delete message:', error);
            throw error;
        }
    }
}

// 싱글톤 인스턴스 export
const sheetsGuestbook = new GoogleSheetsGuestbook(GOOGLE_SHEETS_CONFIG);
