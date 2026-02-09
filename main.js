// LottoBall Web Component (기존 코드 유지)
class LottoBall extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }
    connectedCallback() {
        const number = this.getAttribute('number');
        this.shadowRoot.innerHTML = `
            <style>
                .ball {
                    display: flex; justifyContent: center; align-items: center;
                    width: 50px; height: 50px; border-radius: 50%;
                    background-color: var(--ball-color-${Math.ceil(number / 4.5)});
                    color: white; font-size: 1.5rem; font-weight: bold;
                    box-shadow: 0 4px 8px rgba(0,0,0,0.2), inset 0 -3px 5px rgba(0,0,0,0.3);
                    text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
                }
            </style>
            <div class="ball">${number}</div>
        `;
    }
}
customElements.define('lotto-ball', LottoBall);


// 로또 번호 생성 로직 (기존 코드 유지)
const generateBtn = document.getElementById('generate-btn');
const lottoNumbersContainer = document.getElementById('lotto-numbers');

generateBtn.addEventListener('click', () => {
    lottoNumbersContainer.innerHTML = '';
    const numbers = generateLottoNumbers();
    numbers.forEach(number => {
        const lottoBall = document.createElement('lotto-ball');
        lottoBall.setAttribute('number', number);
        lottoNumbersContainer.appendChild(lottoBall);
    });
});

function generateLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}


// 테마 변경 로직 (기존 코드 유지)
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
themeToggle.addEventListener('change', () => {
    const newTheme = themeToggle.checked ? 'dark-mode' : 'light-mode';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
});


// --- 새로운 언어 변경 로직 ---
const languageSelect = document.getElementById('language-select');

const langData = {
    "ko": {
        "pageTitle": "로또 번호 생성기",
        "lottoTitle": "로또 번호 생성기",
        "generateButton": "번호 생성",
        "commentTitle": "댓글",
        "contactTitle": "제휴 문의",
        "contactName": "이름:",
        "contactEmail": "이메일:",
        "contactMessage": "문의 내용:",
        "contactSubmit": "문의 제출"
    },
    "en": {
        "pageTitle": "Lotto Number Generator",
        "lottoTitle": "Lotto Number Generator",
        "generateButton": "Generate Numbers",
        "commentTitle": "Comments",
        "contactTitle": "Partnership Inquiry",
        "contactName": "Name:",
        "contactEmail": "Email:",
        "contactMessage": "Message:",
        "contactSubmit": "Submit"
    }
};

function setLanguage(lang) {
    document.documentElement.lang = lang;
    const elements = document.querySelectorAll('[data-lang]');
    elements.forEach(el => {
        const key = el.getAttribute('data-lang');
        if (langData[lang] && langData[lang][key]) {
            el.textContent = langData[lang][key];
        }
    });
    languageSelect.value = lang;
}

languageSelect.addEventListener('change', (e) => {
    const selectedLang = e.target.value;
    localStorage.setItem('language', selectedLang);
    setLanguage(selectedLang);
});


// --- 초기화 로직 ---
function initialize() {
    // 테마 초기화
    const savedTheme = localStorage.getItem('theme') || 'light-mode';
    applyTheme(savedTheme);
    
    // 언어 초기화
    const savedLang = localStorage.getItem('language') || (navigator.language.startsWith('ko') ? 'ko' : 'en');
    setLanguage(savedLang);
}

// 페이지 로드 시 초기화 실행
document.addEventListener('DOMContentLoaded', initialize);
