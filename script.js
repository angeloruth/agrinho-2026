// Agrinho 2026 - Agro Forte, Futuro Sustentável
// JavaScript — Versão integrada com Web3Forms

// ============================================================
// DADOS DO QUIZ
// ============================================================
const quizData = [
    {
        question: "Qual é o impacto da rotação de culturas?",
        options: ["Aumenta os custos de produção", "Melhora a saúde do solo", "Reduz a produção agrícola"],
        correct: 1
    },
    {
        question: "Quanto de água pode ser economizado com irrigação eficiente?",
        options: ["Cerca de 10%", "Cerca de 30%", "Cerca de 50%"],
        correct: 2
    },
    {
        question: "Qual tecnologia monitora plantações em tempo real pelo ar?",
        options: ["Drones com sensores", "Telescópios especiais", "Radares meteorológicos"],
        correct: 0
    }
];

let quizSubmitted = false;

// ============================================================
// INICIALIZAÇÃO
// ============================================================
document.addEventListener('DOMContentLoaded', function () {
    initializeNavigation();
    initializeQuiz();
    setupScrollListeners();
    setupFormListener();
});

// ============================================================
// NAVEGAÇÃO — MELHORIA: toggle por classe CSS, não style
// ============================================================
function initializeNavigation() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu    = document.getElementById('nav-menu');
    const navbar     = document.getElementById('navbar');

    if (menuToggle && navMenu) {
        // Abrir/fechar menu mobile via classe
        menuToggle.addEventListener('click', function () {
            const isOpen = navMenu.classList.toggle('open');
            menuToggle.classList.toggle('open', isOpen);
            menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
        });
    }

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && menuToggle) {
                navMenu.classList.remove('open');
                menuToggle.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.setAttribute('aria-label', 'Abrir menu');
            }
        });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', function (e) {
        if (navbar && navMenu && menuToggle && !navbar.contains(e.target)) {
            navMenu.classList.remove('open');
            menuToggle.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Mudar estilo da navbar ao rolar
    window.addEventListener('scroll', function () {
        if (navbar) {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }
    });

    // Botão CTA vai para contato
    const ctaBtn = document.getElementById('cta-button');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', () => {
            scrollToSection('contato');
        });
    }
}

// ============================================================
// SCROLL HELPERS
// ============================================================
function scrollToSection(sectionId) {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function setupScrollListeners() {
    window.addEventListener('scroll', function () {
        const btn = document.getElementById('scroll-top');
        if (btn) {
            btn.classList.toggle('show', window.scrollY > 300);
        }
    });
}

// ============================================================
// QUIZ — MELHORIA: feedback visual por questão
// ============================================================
function initializeQuiz() {
    const container = document.getElementById('quiz-questions');
    if (!container) return;
    
    container.innerHTML = '';
    quizSubmitted = false;

    quizData.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'quiz-question';
        div.dataset.index = index;

        const questionText = document.createElement('p');
        questionText.textContent = `${index + 1}. ${item.question}`;
        div.appendChild(questionText);

        item.options.forEach((option, optIndex) => {
            const label = document.createElement('label');
            label.setAttribute('for', `q${index}_opt${optIndex}`);

            const input = document.createElement('input');
            input.type  = 'radio';
            input.name  = `question${index}`;
            input.value = optIndex;
            input.id    = `q${index}_opt${optIndex}`;

            const text = document.createTextNode(option);
            const icon = document.createElement('span');
            icon.className = 'quiz-feedback-icon';

            label.appendChild(input);
            label.appendChild(text);
            label.appendChild(icon);
            div.appendChild(label);
        });

        container.appendChild(div);
    });
}

function submitQuiz() {
    if (quizSubmitted) return;

    let score = 0;

    quizData.forEach((item, index) => {
        const questionDiv = document.querySelector(`.quiz-question[data-index="${index}"]`);
        if (!questionDiv) return;
        
        const selected    = document.querySelector(`input[name="question${index}"]:checked`);
        const labels      = questionDiv.querySelectorAll('label');

        questionDiv.classList.add('submitted');

        labels.forEach((label, optIndex) => {
            const icon = label.querySelector('.quiz-feedback-icon');
            const isCorrect = optIndex === item.correct;
            const isSelected = selected && parseInt(selected.value) === optIndex;

            if (isSelected && isCorrect) {
                label.classList.add('correct');
                if (icon) icon.textContent = '✅';
                score++;
            } else if (isSelected && !isCorrect) {
                label.classList.add('wrong');
                if (icon) icon.textContent = '❌';
            } else if (!isSelected && isCorrect) {
                label.classList.add('correct-answer');
                if (icon) icon.textContent = '💡';
            }
        });
    });

    quizSubmitted = true;

    const percentage = Math.round((score / quizData.length) * 100);
    let emoji = '🌱';
    let msg   = 'Continue aprendendo sobre sustentabilidade!';

    if (percentage === 100) {
        emoji = '🏆';
        msg   = 'Parabéns! Você é um especialista em sustentabilidade!';
    } else if (percentage >= 66) {
        emoji = '🌿';
        msg   = 'Muito bem! Você conhece bastante sobre o tema!';
    }

    const resultDiv = document.getElementById('quiz-result');
    if (resultDiv) {
        resultDiv.innerHTML = `
            <span class="quiz-emoji">${emoji}</span>
            <p>${msg}</p>
            <p><strong>${score} de ${quizData.length} corretas — ${percentage}%</strong></p>
            <button class="btn-quiz-retry" onclick="retryQuiz()">🔄 Tentar novamente</button>
        `;
    }
}

function retryQuiz() {
    const resultDiv = document.getElementById('quiz-result');
    if (resultDiv) resultDiv.innerHTML = '';
    initializeQuiz();
}

// ============================================================
// AJUSTE DO FORMULÁRIO PARA WEB3FORMS
// ============================================================
function setupFormListener() {
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const submitText = document.getElementById('submit-text');
    const submitLoading = document.getElementById('submit-loading');

    if (!form) return;

    // Removemos o 'preventDefault' antigo para deixar o Web3Forms agir nativamente pelo HTML.
    // Usamos esse listener apenas para dar um feedback visual bonito enquanto a página carrega o envio.
    form.addEventListener('submit', function () {
        if (submitBtn && submitText && submitLoading) {
            submitText.style.display = 'none';
            submitLoading.style.display = 'inline';
            submitBtn.disabled = true;
        }
    });
}
