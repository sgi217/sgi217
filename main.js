// --- 1. CONFIG & DATA ---

const langData = {
    "ko": {
        "pageTitle": "Test World",
        "siteTitle": "Test World",
        "navHome": "홈",
        "navLotto": "로또 추첨",
        "navMbti": "MBTI 테스트",
        "mbtiTitle": "MBTI 성격 테스트",
        "horrorTitle": "공포 테스트",
        "fortuneTitle": "오늘의 운세",
        "lottoTitle": "로또 번호 생성기",
        "generateButton": "번호 생성",
        "contactTitle": "제휴 문의",
        "contactSubmit": "문의 제출"
    },
    "en": {
        "pageTitle": "Test World",
        "siteTitle": "Test World",
        "navHome": "Home",
        "navLotto": "Lotto Draw",
        "navMbti": "MBTI Test",
        "mbtiTitle": "MBTI Personality Test",
        "horrorTitle": "Horror Test",
        "fortuneTitle": "Today's Fortune",
        "lottoTitle": "Lotto Number Generator",
        "generateButton": "Generate Numbers",
        "contactTitle": "Partnership Inquiry",
        "contactSubmit": "Submit"
    }
};


// --- 2. UI COMPONENTS & HELPERS ---

// LottoBall Web Component
class LottoBall extends HTMLElement {
    constructor() { super(); this.attachShadow({ mode: 'open' }); }
    connectedCallback() {
        const number = this.getAttribute('number');
        this.shadowRoot.innerHTML = `
            <style>
                :host { --ball-color: hsl(${number * 20}, 70%, 50%); }
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

function showPage(pageId) {
    pageContents.forEach(page => {
        page.hidden = page.id !== pageId;
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.page === pageId);
    });
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
const generateBtn = document.getElementById('generate-btn');
const lottoNumbersContainer = document.getElementById('lotto-numbers');
function generateLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}


// --- 4. EVENT LISTENERS & INITIALIZATION ---

// Navigation Listeners
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // e.preventDefault(); // Optional: if you want to control history manually
        const pageId = link.dataset.page;
        showPage(pageId);
    });
});
window.addEventListener('hashchange', handleRouting);

// Lotto Listener
generateBtn.addEventListener('click', () => {
    lottoNumbersContainer.innerHTML = '';
    const numbers = generateLottoNumbers();
    numbers.forEach(number => {
        const lottoBall = document.createElement('lotto-ball');
        lottoBall.setAttribute('number', number);
        lottoNumbersContainer.appendChild(lottoBall);
    });
});

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
    const savedTheme = localStorage.getItem('theme') || 'light-mode';
    applyTheme(savedTheme);
    
    const savedLang = localStorage.getItem('language') || (navigator.language.startsWith('ko') ? 'ko' : 'en');
    setLanguage(savedLang);

    handleRouting(); // Show the correct page on load
}

document.addEventListener('DOMContentLoaded', initialize);