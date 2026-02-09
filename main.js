// --- 1. CONFIG & DATA ---

const langData = {
    "ko": {
        "pageTitle": "각종 테스트",
        "mainSiteTitle": "각종 테스트", // 로고 텍스트용
        "navHome": "홈",
        "navLotto": "로또 추첨",
        "navMbti": "MBTI 테스트",
        "navLoveSkill": "연애스킬 테스트",
        "navLonerPower": "찐따력 테스트",
        "navFortune": "오늘의 운세",
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
        "startTest": "테스트 시작",
        "getFortune": "운세 보기",
        "linkCopied": "링크가 복사되었습니다!"
    },
    "en": {
        "pageTitle": "Various Tests",
        "mainSiteTitle": "Various Tests", // 로고 텍스트용
        "navHome": "Home",
        "navLotto": "Lotto Draw",
        "navMbti": "MBTI Test",
        "navLoveSkill": "Love Skill Test",
        "navLonerPower": "Loner Power Test",
        "navFortune": "Today's Fortune",
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
        "startTest": "Start Test",
        "getFortune": "Get Fortune",
        "linkCopied": "Link copied!"
    }
};

const tests = {
    "loveSkill": {
        questions: [
            { q: "연애할 때 나는?", img: "https://via.placeholder.com/400x200.png?text=Love+Q1", a: [{ text: "직진!", score: 2 }, { text: "천천히 탐색", score: 1 }] },
            { q: "데이트 코스는?", img: "https://via.placeholder.com/400x200.png?text=Love+Q2", a: [{ text: "내가 다 정한다", score: 2 }, { text: "상대에게 맞춘다", score: 1 }] },
            { q: "갈등이 생기면?", img: "https://via.placeholder.com/400x200.png?text=Love+Q3", a: [{ text: "바로 해결해야 직성이 풀린다", score: 2 }, { text: "시간을 갖고 생각한다", score: 1 }] }
        ],
        results: [
            { min: 0, title: "고양이형 연애 스타일", img: "https://via.placeholder.com/200x200.png?text=Cat", desc: "츤데레 매력으로 상대를 사로잡는 연애 고수. 쉽게 마음을 열지 않지만, 한번 빠지면 헤어나올 수 없게 만든다." },
            { min: 4, title: "강아지형 연애 스타일", img: "https://via.placeholder.com/200x200.png?text=Dog", desc: "애교 많고 직진하는 매력의 소유자. 한결같은 모습으로 상대에게 신뢰를 주며, 헌신적인 사랑을 한다." }
        ]
    },
    "lonerPower": { // 찐따력 테스트
        questions: [
            { q: "점심시간에 밥을 먹는 방법은?", img: "https://via.placeholder.com/400x200.png?text=Loner+Q1", a: [{ text: "혼자 먹는다", score: 3 }, { text: "친구들과 먹는다", score: 1 }] },
            { q: "쉬는 시간에 주로 무엇을 하나?", img: "https://via.placeholder.com/400x200.png?text=Loner+Q2", a: [{ text: "책을 읽거나 폰을 본다", score: 3 }, { text: "친구들과 수다 떤다", score: 1 }] },
            { q: "단체 사진 찍을 때 나는?", img: "https://via.placeholder.com/400x200.png?text=Loner+Q3", a: [{ text: "맨 뒤에서 얼굴만 내민다", score: 3 }, { text: "가운데서 포즈를 취한다", score: 1 }] }
        ],
        results: [
            { min: 0, title: "핵인싸", img: "https://via.placeholder.com/200x200.png?text=Popular", desc: "누구에게나 사랑받는 당신은 핵인싸! 당신이 가는 곳이 곧 인싸들의 성지다." },
            { min: 3, title: "찐따 지망생", img: "https://via.placeholder.com/200x200.png?text=Aspiring", desc: "찐따의 길로 들어서는 중... 아직 기회가 있다! 용기를 내자!" },
            { min: 6, title: "찐 중의 찐", img: "https://via.placeholder.com/200x200.png?text=Loner", desc: "당신은 이미 찐 중의 찐! 혼자가 편하고 혼자가 익숙한 당신. 하지만 당신만의 매력이 있다!" }
        ]
    },
    "fortune": { // 오늘의 운세
        fortunes: [
            "오늘은 행운이 가득한 하루가 될 거예요! 뜻밖의 좋은 소식이 찾아올지도 몰라요.",
            "새로운 도전을 하기에 아주 좋은 날입니다. 망설이지 말고 시도해 보세요!",
            "오늘은 주변 사람들과의 관계에 집중해 보세요. 소중한 인연을 만날 수 있을 거예요.",
            "잠시 쉬어가세요. 지친 몸과 마음을 달래면 더 좋은 내일을 맞이할 수 있을 겁니다.",
            "생각했던 대로 일이 풀리지 않을 수 있어요. 하지만 좌절하지 말고 다음 기회를 노려보세요.",
            "뜻밖의 지출이 생길 수 있으니, 지갑 관리에 신경 쓰는 것이 좋겠어요.",
            "오늘은 평범하지만 소소한 행복을 찾을 수 있는 날입니다. 주변을 둘러보세요.",
            "건강에 유의하세요! 충분한 휴식과 영양 섭취가 필요합니다."
        ]
    }
};

let currentTestInstance = null;
let testStep = 0;
let testScore = 0;


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

// Disqus 로더 함수
let disqus_script_loaded = false;
function loadDisqusScript() {
    if (disqus_script_loaded) return;
    const d = document, s = d.createElement('script');
    s.src = 'https://sgi217-2.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    s.async = true; // 비동기 로드
    (d.head || d.body).appendChild(s);
    disqus_script_loaded = true;
}


// --- 3. CORE LOGIC ---

// Page-Navigation Logic
const navLinks = document.querySelectorAll('.nav-link');
const pageContents = document.querySelectorAll('.page-content');

function showPage(pageId) {
    pageContents.forEach(page => {
        page.hidden = true;
    });
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.hidden = false;
        // Disqus 스레드 로드 또는 재설정
        // 페이지에 disqus_thread_ID가 있으면 해당 ID로 Disqus 로드
        if (typeof DISQUS !== 'undefined') {
            const disqusThreadId = `disqus_thread_${pageId.replace('-page', '')}`;
            DISQUS.reset({
                reload: true,
                config: function () {
                    this.page.url = window.location.href.split('#')[0] + '#' + pageId;
                    this.page.identifier = disqusThreadId;
                    this.page.title = langData[document.documentElement.lang][pageId.replace('-page', '') + 'Title'];
                }
            });
        } else if (!disqus_script_loaded) {
            loadDisqusScript(); // 아직 로드되지 않았다면 스크립트 로드
        }
    }

    navLinks.forEach(link => {
        link.classList.remove('active'); // 모든 active 클래스 제거
        if (link.dataset.page === pageId) {
            link.classList.add('active'); // 현재 페이지에만 active 클래스 추가
        }
    });

    // 홈으로 돌아가면 URL 해시 제거
    if (pageId === 'home-page') {
        history.replaceState(null, '', window.location.pathname + window.location.search);
    } else {
        history.replaceState(null, '', `#${pageId.replace('-page', '')}`);
    }
    // URL 변경 후 스크롤을 맨 위로
    window.scrollTo(0, 0);
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
    // logo 텍스트도 업데이트
    const logoEl = document.querySelector('.logo');
    if (logoEl && langData[lang]?.mainSiteTitle) {
        logoEl.textContent = langData[lang].mainSiteTitle;
    }

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
const generateLottoBtn = document.getElementById('generate-btn'); 
const lottoNumbersContainer = document.getElementById('lotto-numbers');
function generateLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}


// Test Logic (사용자 제공 로직 통합)
function startTest(testName) {
    currentTestInstance = tests[testName];
    testStep = 0;
    testScore = 0;

    // 해당 테스트 페이지의 요소들을 찾아 초기화
    const testQuestionArea = document.getElementById(`test-question-area-${testName}`);
    const testResultArea = document.getElementById(`test-result-area-${testName}`);
    
    if (testQuestionArea && testResultArea) {
        testQuestionArea.hidden = false;
        testResultArea.hidden = true;
        renderQuestion(testName);
    }
}

function renderQuestion(testName) {
    const q = currentTestInstance.questions[testStep];
    
    const questionEl = document.getElementById(`question-${testName}`);
    const questionImgEl = document.getElementById(`question-img-${testName}`);
    const ansDiv = document.getElementById(`answers-${testName}`);

    if(questionEl) questionEl.textContent = q.q;

    if(questionImgEl) {
        if(q.img) {
            questionImgEl.src = q.img;
            questionImgEl.hidden = false;
        } else {
            questionImgEl.hidden = true;
        }
    }

    if (ansDiv) {
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
}

function showResult(testName) {
    const testQuestionArea = document.getElementById(`test-question-area-${testName}`);
    const testResultArea = document.getElementById(`test-result-area-${testName}`);
    
    if (testQuestionArea) testQuestionArea.hidden = true;
    if (testResultArea) testResultArea.hidden = false;

    let result = currentTestInstance.results[0];
    currentTestInstance.results.forEach(r => {
        if (testScore >= r.min) result = r;
    });

    const resultTitleEl = document.getElementById(`result-title-${testName}`);
    const resultImgEl = document.getElementById(`result-img-${testName}`);
    const resultDescEl = document.getElementById(`result-desc-${testName}`);

    if(resultTitleEl) resultTitleEl.textContent = result.title;
    if(resultImgEl) resultImgEl.src = result.img;
    if(resultDescEl) resultDescEl.textContent = result.desc;

    // saveRanking(result.title); // 랭킹 기능은 별도로 구현 필요
    // renderRanking(); // 랭킹 기능은 별도로 구현 필요
}

function shareResult() {
    const copiedText = langData[document.documentElement.lang].linkCopied;
    navigator.clipboard.writeText(window.location.href);
    alert(copiedText); 
}

// Fortune Logic
const getFortuneBtn = document.getElementById('get-fortune-btn');
const fortuneResultEl = document.getElementById('fortune-result');

function generateFortune() {
    const fortunes = tests.fortune.fortunes;
    const randomIndex = Math.floor(Math.random() * fortunes.length);
    fortuneResultEl.textContent = fortunes[randomIndex];
}


// --- 4. EVENT LISTENERS & INITIALIZATION ---

// Navigation Listeners
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // e.preventDefault(); // showPage handles hash change implicitly or by history.replaceState
        const pageId = link.dataset.page;
        showPage(pageId);
    });
});
window.addEventListener('hashchange', handleRouting);

// Lotto Listener
if (generateLottoBtn) { 
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

const startLonerPowerTestBtn = document.getElementById('start-loner-power-test');
if (startLonerPowerTestBtn) {
    startLonerPowerTestBtn.addEventListener('click', () => startTest('lonerPower'));
}

// Fortune Listener
if (getFortuneBtn) {
    getFortuneBtn.addEventListener('click', generateFortune);
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
    // Disqus embed script 로드
    loadDisqusScript();

    // 테마 초기화
    const savedTheme = localStorage.getItem('theme') || 'light-mode';
    applyTheme(savedTheme);
    
    // 언어 초기화
    const savedLang = localStorage.getItem('language') || (navigator.language.startsWith('ko') ? 'ko' : 'en');
    setLanguage(savedLang);

    handleRouting(); // Show the correct page on load
}

document.addEventListener('DOMContentLoaded', initialize);

function saveRanking(title){
    let rank=JSON.parse(localStorage.getItem("rank")||"{}");
    rank[title]=(rank[title]||0)+1;
    localStorage.setItem("rank",JSON.stringify(rank));
    }
    
    function increaseView(page){
    let view=JSON.parse(localStorage.getItem("views")||"{}");
    view[page]=(view[page]||0)+1;
    localStorage.setItem("views",JSON.stringify(view));
    }
    
    const oldShowPage=showPage;
    showPage=function(pageId){
    increaseView(pageId);
    oldShowPage(pageId);
    }
    