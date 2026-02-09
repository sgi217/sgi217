// --- 1. CONFIG & DATA ---

const langData = {
    "ko": {
        "pageTitle": "Test World",
        "siteTitle": "Test World",
        "navHome": "홈",
        "navLotto": "로또 추첨",
        "navMbti": "MBTI 테스트",
        "navLoveSkill": "연애스킬 테스트",
        "navLonerPower": "찐따력 테스트",
        "mbtiTitle": "MBTI 성격 테스트",
        "loveSkillTitle": "연애스킬 테스트",
        "lonerPowerTitle": "찐따력 테스트",
        "fortuneTitle": "오늘의 운세",
        "lottoTitle": "로또 번호 생성기",
        "generateButton": "번호 생성",
        "commentTitle": "댓글",
        "contactTitle": "제휴 문의",
        "contactSubmit": "문의 제출",
        "shareResult": "결과 공유",
        "startTest": "테스트 시작"
    },
    "en": {
        "pageTitle": "Test World",
        "siteTitle": "Test World",
        "navHome": "Home",
        "navLotto": "Lotto Draw",
        "navMbti": "MBTI Test",
        "navLoveSkill": "Love Skill Test",
        "navLonerPower": "Loner Power Test",
        "mbtiTitle": "MBTI Personality Test",
        "loveSkillTitle": "Love Skill Test",
        "lonerPowerTitle": "Loner Power Test",
        "fortuneTitle": "Today's Fortune",
        "lottoTitle": "Lotto Number Generator",
        "generateButton": "Generate Numbers",
        "commentTitle": "Comments",
        "contactTitle": "Partnership Inquiry",
        "contactSubmit": "Submit",
        "shareResult": "Share Result",
        "startTest": "Start Test"
    }
};

const tests = {
    "loveSkill": {
        questions: [
            { q: "연애할때 나는?", a: [{ text: "직진", score: 2 }, { text: "천천히", score: 1 }] },
            { q: "데이트 코스는?", a: [{ text: "내가 정한다", score: 2 }, { text: "상대에게 맞춘다", score: 1 }] }
        ],
        results: [
            { min: 0, title: "고양이형", img: "https://via.placeholder.com/200x200.png?text=Cat", desc: "츤데레 스타일의 연애 고수" },
            { min: 3, title: "강아지형", img: "https://via.placeholder.com/200x200.png?text=Dog", desc: "애교 많고 직진하는 연애 초보" }
        ]
    },
    "lonerPower": { // 찐따력 테스트 예시 데이터
        questions: [
            { q: "점심시간에 밥을 먹는 방법은?", a: [{ text: "혼자 먹는다", score: 3 }, { text: "친구들과 먹는다", score: 1 }] },
            { q: "쉬는 시간에 주로 무엇을 하나?", a: [{ text: "책을 읽거나 폰을 본다", score: 3 }, { text: "친구들과 수다 떤다", score: 1 }] }
        ],
        results: [
            { min: 0, title: "핵인싸", img: "https://via.placeholder.com/200x200.png?text=Popular", desc: "누구에게나 사랑받는 당신은 핵인싸!" },
            { min: 3, title: "찐따 지망생", img: "https://via.placeholder.com/200x200.png?text=Aspiring", desc: "찐따의 길로 들어서는 중..." },
            { min: 5, title: "찐 중의 찐", img: "https://via.placeholder.com/200x200.png?text=Loner", desc: "당신은 이미 찐 중의 찐!" }
        ]
    }
};

let currentTest = null;
let step = 0;
let score = 0;


// --- 2. UI COMPONENTS & HELPERS ---

// LottoBall Web Component
class LottoBall extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: 'open' }); }
    connectedCallback() {
        const number = this.getAttribute('number');
        this.shadowRoot.innerHTML = `
            <style>
                :host { --ball-color: hsl(${number * 8}, 70%, 50%); } /* 색상 다양화 */
                .ball {
                    display: flex; justify-content: center; align-items: center;
                    width: 50px; height: 50px; border-radius: 50%;
                    background-color: var(--ball-color);
                    color: white; font-size: 1.5rem; font-weight: bold;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.2), inset 0 -3px 5px rgba(0,0,0,0.3);
                }
            </style>
            <div class="ball">${number}</div>`;
    }
}
customElements.define('lotto-ball', LottoBall);


// --- 3. CORE LOGIC ---

// Page-Navigation Logic
const navLinks = document.querySelectorAll('.nav-link');
const pageContents = document.querySelectorAll('.page-content');
let currentDisqusIdentifier = '';

function showPage(pageId) {
    pageContents.forEach(page => {
        page.hidden = true;
    });
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.hidden = false;
        // Disqus 스레드 로드 또는 재설정
        // Disqus 로직은 embed.js가 로드된 후에만 작동함
        if (typeof DISQUS !== 'undefined') {
            currentDisqusIdentifier = pageId; // 현재 페이지 ID를 식별자로 사용
            DISQUS.reset({
                reload: true,
                config: function () {
                    this.page.url = window.location.href.split('#')[0] + '#' + pageId;
                    this.page.identifier = currentDisqusIdentifier;
                }
            });
        }
    }

    navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.page === pageId);
    });
    // 홈으로 돌아가면 URL 해시 제거
    if (pageId === 'home-page') {
        history.pushState("", document.title, window.location.pathname + window.location.search);
    } else {
        history.pushState(null, null, `#${pageId.replace('-page', '')}`);
    }
}

function handleRouting() {
    const hash = window.location.hash.substring(1);
    const pageId = hash ? `${hash}-page` : 'home-page';
    
    // Check if the page exists, otherwise default to home
    if (document.getElementById(pageId)) {
        showPage(pageId);
    } else {
        showPage('home-page');
    }
}

// Language Logic
const languageSelect = document.getElementById('language-select');
function setLanguage(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.dataset.lang;
        if (langData[lang]?.[key]) {
            el.textContent = langData[lang][key];
        }
    });
    languageSelect.value = lang;
}

// Theme Logic
const themeToggle = document.getElementById('checkbox');
function applyTheme(theme) {
    if (theme === 'dark-mode') {
        document.body.classList.add('dark-mode');
        themeToggle.checked = true;
    } else {
        document.body.classList.remove('dark-mode');
        themeToggle.checked = false;
    }
}

// Lotto Logic
const generateLottoBtn = document.getElementById('generate-btn'); // ID 변경
const lottoNumbersContainer = document.getElementById('lotto-numbers');
function generateLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

// Test Logic (사용자 제공 로직 통합)
let currentTestInstance = null; // 현재 진행 중인 테스트 인스턴스
let testStep = 0; // 테스트 단계
let testScore = 0; // 테스트 점수

function startTest(testName) {
    currentTestInstance = tests[testName];
    testStep = 0;
    testScore = 0;
    document.getElementById('test-question-area').hidden = false;
    document.getElementById('test-result-area').hidden = true; // 결과 영역 숨김
    // showPage('test-page'); // 연애스킬 테스트는 자체 div를 가짐
    renderQuestion(testName);
}

function renderQuestion(testName) {
    const q = currentTestInstance.questions[testStep];
    document.getElementById('question').textContent = q.q;

    const ansDiv = document.getElementById('answers');
    ansDiv.innerHTML = '';

    q.a.forEach(a => {
        const btn = document.createElement('button');
        btn.textContent = a.text;
        btn.onclick = () => {
            testScore += a.score;
            testStep++;
            if (testStep >= currentTestInstance.questions.length) {
                showResult(testName);
            } else {
                renderQuestion(testName);
            }
        };
        ansDiv.appendChild(btn);
    });
}

function showResult(testName) {
    document.getElementById('test-question-area').hidden = true;
    document.getElementById('test-result-area').hidden = false;

    let result = currentTestInstance.results[0];
    currentTestInstance.results.forEach(r => {
        if (testScore >= r.min) result = r;
    });

    document.getElementById('result-title').textContent = result.title;
    document.getElementById('result-img').src = result.img;
    document.getElementById('result-desc').textContent = result.desc;

    // saveRanking(result.title); // 랭킹 기능은 별도로 구현 필요
    // renderRanking(); // 랭킹 기능은 별도로 구현 필요
}

function shareResult() {
    navigator.clipboard.writeText(window.location.href);
    alert("링크가 복사되었습니다!"); // TODO: 다국어 지원
}


// --- 4. EVENT LISTENERS & INITIALIZATION ---

// Navigation Listeners
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // e.preventDefault(); // Optional: if you want to control history manually, but showPage handles hash
        const pageId = link.dataset.page;
        showPage(pageId);
    });
});
window.addEventListener('hashchange', handleRouting);

// Lotto Listener
if (generateLottoBtn) { // 로또 버튼이 있을 때만 이벤트 리스너 추가
    generateLottoBtn.addEventListener('click', () => {
        lottoNumbersContainer.innerHTML = '';
        const numbers = generateLottoNumbers();
        numbers.forEach(number => {
            const lottoBall = document.createElement('lotto-ball');
            lottoBall.setAttribute('number', number);
            lottoNumbersContainer.appendChild(lottoBall);
        });
    });
}


// Test Specific Listeners
const startLoveSkillTestBtn = document.getElementById('start-love-skill-test');
if (startLoveSkillTestBtn) {
    startLoveSkillTestBtn.addEventListener('click', () => startTest('loveSkill'));
}


// Language Listener
languageSelect.addEventListener('change', (e) => {
    const selectedLang = e.target.value;
    localStorage.setItem('language', selectedLang);
    setLanguage(selectedLang);
});

// Theme Listener
themeToggle.addEventListener('change', () => {
    const newTheme = themeToggle.checked ? 'dark-mode' : 'light-mode';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
});

// Initialization on page load
function initialize() {
    // 테마 초기화
    const savedTheme = localStorage.getItem('theme') || 'light-mode';
    applyTheme(savedTheme);
    
    // 언어 초기화
    const savedLang = localStorage.getItem('language') || (navigator.language.startsWith('ko') ? 'ko' : 'en');
    setLanguage(savedLang);

    handleRouting(); // Show the correct page on load
}

document.addEventListener('DOMContentLoaded', initialize);