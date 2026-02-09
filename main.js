class LottoBall extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const number = this.getAttribute('number');
        const color = this.getColor(number);

        this.shadowRoot.innerHTML = `
            <style>
                .ball {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background-color: ${color};
                    color: white;
                    font-size: 1.5rem;
                    font-weight: bold;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2), inset 0 -3px 5px rgba(0,0,0,0.3);
                    text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
                }
            </style>
            <div class="ball">${number}</div>
        `;
    }

    getColor(number) {
        const colors = [
            'var(--ball-color-1)', 'var(--ball-color-2)', 'var(--ball-color-3)', 'var(--ball-color-4)', 'var(--ball-color-5)',
            'var(--ball-color-6)', 'var(--ball-color-7)', 'var(--ball-color-8)', 'var(--ball-color-9)', 'var(--ball-color-10)'
        ];
        return colors[Math.floor((number - 1) / 4.5)];
    }
}

customElements.define('lotto-ball', LottoBall);

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
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}
