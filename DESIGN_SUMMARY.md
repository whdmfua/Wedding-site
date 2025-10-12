# 웨딩 웹사이트 디자인 요소 정리 (2025-10-12 업데이트)

## 🎨 전체 색상 테마
```css
--background: #ffffff (흰색 배경)
--foreground: #231f1a (어두운 텍스트)
--primary: #b49570 (골드 액센트)
--muted: #e8e8e0 (밝은 베이지)
--border: #e5e5e5 (연한 회색 테두리)
--category-tag: #f8e68b (골든 옐로우 - 타임라인 카테고리)
```

---

## 📄 1. INDEX.HTML (메인 페이지)

### ✅ 현재 반영된 내용
1. **Navigation Bar**
   - Fixed 상단 네비게이션
   - 로고: **"J & J"** (골드 색상)
   - 메뉴: **찾아오시는 길 | 사진첩 | 방명록**
   - 언어 전환: **한국어 | ไทย** (Thai)
   - 모바일: 햄버거 메뉴

2. **Hero Section**
   - "THE WEDDING OF" (작은 텍스트)
   - **"조으렴 & 짙라다 사동"** (큰 타이틀, 골드)
     - 모바일: text-3xl
     - 데스크탑: text-9xl
   - Divider (골드 라인 + 다이아몬드 모양)
   - **"2026년 3월 1일(일)"** (날짜)
   - **"Dress Code : White, Purple, Gold"** (text-xl)

3. **Quick Info Section (3칸 그리드)**
   - **날짜 정보**: 2026년 3월 1일 / 일요일 09:00 AM
   - **장소 정보**: 12 Village No.9 / Ban Kruat, Buriram, Thailand
   - **드레스코드**: White, Purple, Gold

4. **Countdown Timer**
   - 4칸 그리드: Days | Hours | Minutes | Seconds
   - **타겟: 2026-03-01 09:00**
   - 배경: 밝은 베이지 (--muted)

5. **CTA Section**
   - "방명록 작성하기" 버튼 (골드 배경)
   - **"계좌번호 보기"** 버튼 (골드 테두리) → guestbook.html#account-section으로 링크

6. **Footer**
   - **© 2025 Jo Euryeom. All rights reserved.**

### 수정 가능 포인트
- [ ] Hero 섹션 배경 이미지 추가
- [ ] 폰트 사이즈 추가 조정
- [ ] 섹션 간격 조정
- [ ] 아이콘 스타일 변경
- [ ] 버튼 디자인 개선
- [ ] 애니메이션 효과 추가/수정

---

## 📄 2. OUR-STORY.HTML (찾아오시는 길) → **TRAVEL GUIDE 페이지로 재구성** ⭐

### ✅ 현재 반영된 내용

**페이지 목적**: 기존 타임라인 스토리 삭제, 여행 정보 + 결혼식 상세 정보 통합

1. **Navigation**
   - 로고: **"J & J"**
   - 메뉴: **찾아오시는 길 | 사진첩 | 방명록**
   - 언어 전환: **한국어 | ไทย** (Thai)

2. **Header Section**
   - **"TRAVEL GUIDE"** (작은 텍스트)
   - **"Join Us in Thailand"** (타이틀)
   - Divider

3. **여행 정보 타임라인 (3개 섹션)**

   **📍 섹션 1: 결혼식 장소 - Buriram, Thailand**
   - 아이콘: `map-pin`
   - 카테고리 태그: "LOCATION" (색상: #f8e68b)
   - 내용:
     - 부리람은 태국 북동부, 이싼 지역에 위치한 전통과 현대가 조화를 이루는 주(州)입니다. 태국 부리람 주에 있는 반크루앗 군(郡)은 부리람 도시에서 1시간 떨어진 곳에 위치한 자연과 유적지가 유명한 지역입니다. 손님 분들께서는 부리람에 있는 숙소에서 머물고, 우리의 결혼식은 반크루앗 군에서 진행될 예정입니다.
     - 주소: 12 Village No.9, Ban Kruat, Buriram, Thailand
   - 이미지: 태국 관련 이미지

   **✈️ 섹션 2: 찾아오는 방법 - Getting Here**
   - 아이콘: `plane`
   - 카테고리 태그: "TRANSPORTATION" (색상: #f8e68b)
   - 내용:
     - **2026년 2월 28일 부리람 공항 도착편**
     - Flight 1: 타이에어아시아 DMK 07:10 → BFV 08:05
     - Flight 2: 타이에어아시아 DMK 15:05 → BFV 16:05
     - Flight 3: 타이에어아시아 BKK 15:30 → BFV 16:35
     - 호텔 셔틀 안내
     - 공항 코드 설명 (DMK, BKK, BFV)
   - 이미지: 비행기/공항

   **🏨 섹션 3: 숙소 - Hotel de l'amour Buriram**
   - 아이콘: `hotel`
   - 카테고리 태그: "ACCOMMODATION" (색상: #f8e68b)
   - 내용:
     - 부리람 4성급 호텔
     - 체크인: 2026년 2월 28일 (금) 14:00
     - 체크아웃: 2026년 3월 2일 (일) 12:00
     - 방문 확정 시 호텔 예약 안내
   - 이미지: 호텔 전경

   **타임라인 레이아웃:**
   - PC: 아이콘 중앙, 이미지와 텍스트 좌우 교차 배치
   - 모바일: 아이콘 → 이미지 → 텍스트 순서 상하 배치
   - 각 섹션 높이: md:h-96 (충분한 간격 확보)

4. **Wedding Details Section** (배경: --muted)

   **THE BIG DAY / Wedding Schedule**

   **4-1. Ceremony & Reception (2칸 그리드)**
   - Ceremony: 09:00 AM, 2026년 3월 1일 (일)
   - Reception: Ceremony 종료 후, 야외 리셉션

   **4-2. Dress Code & Tips (2칸 그리드)**
   - Dress Code: White, Purple, Gold
   - Recommended Items:
     - ☀️ 선글라스 & 모자
     - 🧴 썬크림 (SPF 50+)
     - 👟 편한 신발
     - 💧 개인 물병

   **4-3. FAQ**
   - Q: 태국 날씨는? A: 3월 건기, 28-32°C
   - Q: 현지 통화는? A: 태국 바트(THB), 환전 정보
   - Q: 비자 필요? A: 한국인 30일 무비자
   - Q: 영어 통하나? A: 통역 지원 가능
   - Q: 선물? A: Account 페이지 참고

### 수정 가능 포인트
- [ ] 비행편 정보 업데이트
- [ ] 호텔 정보 추가/수정
- [ ] 부리람 소개 텍스트 수정
- [ ] FAQ 항목 추가/삭제
- [ ] 이미지 교체 (실제 부리람/호텔 사진)
- [ ] 지도 통합 (Google Maps)
- [ ] 드레스코드 상세 설명 추가

---

## 📄 3. ~~DETAILS.HTML (결혼식 상세정보)~~ → **OUR-STORY.HTML에 통합됨** ⚠️

**상태**: 이 페이지는 더 이상 사용되지 않습니다.
**대체 페이지**: our-story.html의 "Wedding Details" 섹션

---

## 📄 4. GALLERY.HTML (갤러리)

### ✅ 현재 반영된 내용
1. **Navigation**
   - 로고: **"J & J"**
   - 메뉴: **찾아오시는 길 | 사진첩 | 방명록**
   - 언어 전환: **한국어 | ไทย** (Thai)

2. **Header Section**
   - "OUR MEMORIES"
   - "사진첩"
   - Divider

3. **Gallery Grid**
   - 2x4 그리드 (모바일: 2칸, 태블릿: 3칸, 데스크탑: 4칸)
   - 8개 이미지 (Unsplash 플레이스홀더)
   - Hover 효과: scale(1.05)

4. **Lightbox**
   - 이미지 클릭 시 전체화면 표시
   - 닫기 버튼 (X)

### 수정 가능 포인트
- [ ] 실제 사진으로 교체
- [ ] 그리드 레이아웃 변경 (Masonry 등)
- [ ] 이미지 개수 조정
- [ ] 카테고리 필터 추가
- [ ] 라이트박스 디자인 개선
- [ ] 이미지 캡션 추가
- [ ] 슬라이더 추가
- [ ] Lazy loading 구현

---

## 📄 5. GUESTBOOK.HTML (방명록 & 계좌번호) ⭐ **Account 페이지 통합됨**

### ✅ 현재 반영된 내용
1. **Navigation**
   - 로고: **"J & J"**
   - 메뉴: **찾아오시는 길 | 사진첩 | 방명록**
   - 언어 전환: **한국어 | ไทย** (Thai)

2. **Guestbook Section** (#guestbook-section)
   - "SHARE YOUR WISHES"
   - "방명록"
   - Divider

3. **Write Message Form**
   - 이름 입력 (밑줄 스타일)
   - 메시지 입력 (텍스트영역)
   - Submit 버튼 (골드 배경)
   - 배경: 밝은 베이지
   - 언어 태그 자동 감지 (ko/th)

4. **Messages Display**
   - LocalStorage 기반 저장 (한/태 공유)
   - 카드 형식 (하트 아이콘 + 이름 + 메시지 + 날짜 + 국기 🇰🇷🇹🇭)
   - **페이지네이션**: 10개/페이지
   - **관리자 삭제**: 비밀번호 0121
   - 최신순 정렬

5. **CTA Button**
   - "마음전하실 곳 보기" → #account-section으로 스크롤

6. **Account Section** (#account-section)
   - "축하인사만으로 큰 선물입니다"
   - "마음전하실 곳(계좌번호)"
   - **계좌 정보** (1칸 그리드)
     - **<신랑측>**: 하나은행 / 조으렴 / 592-910150-09607
     - **<신부측>**: 하나은행 / Sadong Jitlada / 781-910706-02707
   - Thank You Section (하트 아이콘)
   - "방명록으로 돌아가기" 버튼

### 수정 가능 포인트
- [x] 페이지네이션 추가 ✅
- [x] 관리자 삭제 기능 ✅
- [x] Account 섹션 통합 ✅
- [ ] Firebase 연동 (실시간 DB)
- [ ] 계좌번호 복사 버튼 추가

---

## 📄 6. ~~REGISTRY.HTML / ACCOUNT.HTML~~ → **GUESTBOOK.HTML에 통합됨** ⚠️

**상태**: 이 페이지는 더 이상 별도로 존재하지 않습니다.
**대체 페이지**: guestbook.html의 "#account-section"
**이유**: 방명록과 계좌번호를 하나의 페이지로 통합하여 사용성 개선

---

## 📄 7. THAI LANGUAGE PAGES (태국어 버전) 🇹🇭 **NEW!**

### ✅ 생성된 페이지
1. **index-th.html** - 태국어 메인 페이지
2. **our-story-th.html** - 축소된 Wedding Details만 (여행 정보 제거)
3. **gallery-th.html** - 태국어 사진첩
4. **guestbook-th.html** - 공유 방명록 & 계좌번호

### 주요 특징
1. **언어 전환**
   - 모든 페이지에서 한국어 ↔ Thai 전환 가능
   - Navigation에 "한국어 | ไทย" 버튼
   - Anchor 링크 보존 (예: #account-section)

2. **공유 방명록**
   - Korean/Thai 페이지 모두 동일한 LocalStorage 사용
   - 메시지에 언어 태그 (🇰🇷🇹🇭) 자동 표시
   - 페이지네이션/삭제 기능 모두 이중 언어 지원

3. **OUR-STORY-TH.HTML 차이점**
   - ❌ 여행 정보 타임라인 제거 (Location, Transportation, Accommodation)
   - ❌ FAQ 제거
   - ❌ Recommended Items 제거
   - ✅ Wedding Details만 유지 (Ceremony, Reception, Dress Code)
   - **이유**: 태국 현지인은 여행 정보 불필요

4. **Navigation 문구**
   - 한국어: **찾아오시는 길 | 사진첩 | 방명록**
   - 태국어: **ข้อมูลงานแต่งงาน | อัลบั้มรูปภาพ | สมุดเยี่ยม**

---

## 🔧 공통 수정 가능 요소

### Navigation (모든 페이지 통일됨 ✅)
- [x] 로고: "S & M" → **"J & J"**
- [x] 메뉴 업데이트: ~~"Our Story"~~ → ~~"우리의 이야기"~~ → **"찾아오시는 길"** ✅
- [x] 메뉴 업데이트: ~~"Gallery"~~ → **"사진첩"**
- [x] 메뉴 업데이트: ~~"Guestbook"~~ → **"방명록"**
- [x] 메뉴 업데이트: ~~"Details"~~ → **삭제됨** (our-story에 통합)
- [x] 메뉴 업데이트: ~~"Registry"~~ → ~~"Account"~~ → **삭제됨** (guestbook에 통합)
- [x] 언어 전환 버튼 추가: **한국어 | ไทย** ✅
- [x] Thai 페이지 생성 (4개) ✅
- [ ] 로고를 텍스트에서 이미지로 변경
- [ ] 스크롤 시 배경 투명도 조정
- [ ] 모바일 메뉴 애니메이션

### Typography
- [x] 폰트: Playfair Display (세리프) + DM Sans (산세리프)
- [x] Hero 타이틀 모바일 크기: text-3xl
- [x] 드레스코드 크기: text-xl
- [ ] 폰트 크기 추가 조정
- [ ] Letter spacing 조정
- [ ] Line height 조정

### Animations
- [x] Fade in 효과 (타임라인)
- [x] Shimmer 효과 (카드)
- [ ] Scroll 애니메이션 추가
- [ ] Hover 효과 개선
- [ ] 페이지 전환 효과

### Responsive Design
- [x] 모바일 타임라인 레이아웃 (상하 배치)
- [x] PC 타임라인 레이아웃 (좌우 교차)
- [ ] 태블릿 최적화
- [ ] 브레이크포인트 조정

### Performance
- [ ] 이미지 최적화
- [ ] Lazy loading
- [ ] CSS 최적화
- [ ] JavaScript 번들링

---

## 📝 수정 요청 방법

각 페이지별로 수정하고 싶은 내용을 다음 형식으로 알려주세요:

```
페이지: [페이지명]
섹션: [섹션명]
수정내용: [구체적인 수정 요청]

예시:
페이지: our-story.html
섹션: 여행 정보 타임라인 - 비행편
수정내용: Flight 1 시간 07:10 → 08:00으로 변경
```

---

## 🎯 완료된 작업 (2025-10-12 기준)

### ✅ 페이지 구조
- [x] 전체 6개 페이지 → **3개 한국어 + 4개 Thai = 7개 페이지** (통합/최적화)
- [x] **한국어 페이지 (3개)**:
  - index.html (메인)
  - our-story.html (여행 가이드 + 결혼식 정보)
  - gallery.html (사진첩)
  - guestbook.html (방명록 + 계좌번호 통합)
- [x] **Thai 페이지 (4개)**:
  - index-th.html
  - our-story-th.html (Wedding Details만)
  - gallery-th.html
  - guestbook-th.html (공유 방명록)
- [x] ~~registry.html/account.html~~ → **guestbook.html에 통합** ✅
- [x] ~~details.html~~ (삭제됨)

### ✅ 디자인 시스템
- [x] 색상 테마 통일 (밝은 배경 + 골드 액센트)
- [x] 타이포그래피 통일
- [x] 네비게이션 통일
- [x] 반응형 레이아웃

### ✅ 기능 구현
- [x] 카운트다운 타이머 (2026-03-01 09:00 기준)
- [x] 갤러리 라이트박스
- [x] 방명록 LocalStorage 저장 (한/태 공유)
- [x] 방명록 페이지네이션 (10개/페이지)
- [x] 방명록 관리자 삭제 (비밀번호: 0121)
- [x] 언어 전환 기능 (한국어 ↔ Thai)
- [x] 언어 태그 자동 감지 및 표시 (🇰🇷🇹🇭)
- [x] 모바일 햄버거 메뉴
- [x] 타임라인 애니메이션
- [x] Anchor 스크롤 링크 (#account-section)

### ✅ 콘텐츠 업데이트
- [x] 신랑신부 이름: 조으렴 & 짙라다 사동 (Mr.Jo Euryeom & นางสาว จิตรลดา ซาดง)
- [x] 결혼식 날짜: 2026년 3월 1일 (일) 09:00 (1 มีนาคม พ.ศ. 2569)
- [x] 장소: Ban Kruat, Buriram, Thailand
- [x] 드레스코드: White, Purple, Gold (ครีม, เบจ, พาสเทล, สีขาว)
- [x] 비행편 정보 (3편)
- [x] 호텔 정보: Hotel de l'amour Buriram (부리람 4성급)
- [x] 계좌 정보 입력 완료 (신랑측/신부측)
- [x] 부리람 설명 업데이트: "주(州)" 및 "반크루앗 군(郡)" 정보 추가 ✅
- [x] Navigation 문구 변경: "우리의 이야기" → "찾아오시는 길" ✅

---

## 🚀 다음 단계

### 우선 순위 높음
1. 실제 이미지로 교체 (갤러리, 타임라인)
2. ~~계좌 정보 입력~~ ✅ **완료**
3. ~~방명록 & 계좌번호 페이지 통합~~ ✅ **완료**
4. ~~Thai 언어 페이지 생성~~ ✅ **완료**
5. FAQ 내용 검토 및 추가
6. 지도 통합 (Google Maps)

### 우선 순위 중간
7. 방명록 Firebase 연동 (실시간 DB)
8. 이미지 최적화
9. 계좌번호 복사 버튼 추가
10. QR 코드 추가 (계좌이체용)

### 우선 순위 낮음
11. 애니메이션 개선
12. SEO 최적화 (메타 태그, OG 이미지)
13. 성능 최적화 (이미지 lazy loading)
14. 도메인 연결 및 배포

---

## 📊 페이지 구조 요약

```
웨딩 웹사이트 (이중 언어 지원 🇰🇷🇹🇭)

[한국어 페이지]
├── index.html (메인 랜딩)
├── our-story.html (여행 가이드 + 결혼식 정보) ⭐
├── gallery.html (사진첩)
└── guestbook.html (방명록 + 계좌번호 통합) ⭐

[Thai 페이지]
├── index-th.html (메인 랜딩)
├── our-story-th.html (Wedding Details만) ⭐ 축소 버전
├── gallery-th.html (사진첩)
└── guestbook-th.html (공유 방명록 + 계좌번호) ⭐

삭제된 페이지:
- ~~details.html~~ (our-story.html에 통합)
- ~~registry.html / account.html~~ (guestbook.html에 통합)

Navigation:
- 한국어: J & J | 찾아오시는 길 | 사진첩 | 방명록 | [한국어 | ไทย]
- Thai: J & J | ข้อมูลงานแต่งงาน | อัลบั้มรูปภาพ | สมุดเยี่ยม | [한국어 | ไทย]
```

---

## 📝 최근 업데이트 내역 (2025-10-12)

1. ✅ **Thai 언어 페이지 4개 생성** (index-th, our-story-th, gallery-th, guestbook-th)
2. ✅ **언어 전환 기능 구현** (한국어 ↔ Thai, 모든 페이지)
3. ✅ **방명록 공유 기능** (한/태 페이지 간 LocalStorage 공유)
4. ✅ **방명록 페이지네이션** (10개/페이지, 이중 언어 지원)
5. ✅ **관리자 삭제 기능** (비밀번호 0121, 이중 언어 프롬프트)
6. ✅ **Navigation 문구 변경** ("우리의 이야기" → "찾아오시는 길")
7. ✅ **부리람 설명 업데이트** (주/군 정보 추가)
8. ✅ **Account 페이지 통합** (guestbook.html #account-section)

수정하고 싶은 페이지와 섹션을 알려주시면 즉시 반영하겠습니다! 🎯
