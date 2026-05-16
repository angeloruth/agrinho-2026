// Agrinho 2026 - Agro Forte, Futuro Sustentável
// JavaScript — versão melhorada

// ============================================================
// CONFIGURAÇÃO EMAILJS
// ============================================================
// Para ativar o envio real de emails:
// 1. Crie uma conta gratuita em https://www.emailjs.com
// 2. Crie um "Email Service" (Gmail, Outlook, etc.)
// 3. Crie um "Email Template" com as variáveis: {{from_name}}, {{from_email}}, {{message}}
// 4. Substitua os valores abaixo pelos seus IDs reais:
const EMAILJS_CONFIG = {
    publicKey:  'SEU_PUBLIC_KEY',   // Aba Account > API Keys
    serviceId:  'SEU_SERVICE_ID',   // Aba Email Services
    templateId: 'SEU_TEMPLATE_ID'   // Aba Email Templates
};

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
    initEmailJS();
    initializeNavigation();
    initializeQuiz();
    setupScrollListeners();
    setupFormListener();
});

// ============================================================
// EMAILJS
// ============================================================
function initEmailJS() {
    // Só inicializa se a chave foi configurada
    if (
        typeof emailjs !== 'undefined' &&
        EMAILJS_CONFIG.publicKey !== 'SEU_PUBLIC_KEY'
    ) {
        emailjs.init(EMAILJS_CONFIG.publicKey);
    }
}

// ============================================================
// NAVEGAÇÃO — MELHORIA: toggle por classe CSS, não style
// ============================================================
function initializeNavigation() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu    = document.getElementById('nav-menu');
    const navbar     = document.getElementById('navbar');

    // Abrir/fechar menu mobile via classe
    menuToggle.addEventListener('click', function () {
        const isOpen = navMenu.classList.toggle('open');
        menuToggle.classList.toggle('open', isOpen);
        menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('open');
            menuToggle.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Abrir menu');
        });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', function (e) {
        if (!navbar.contains(e.target)) {
            navMenu.classList.remove('open');
            menuToggle.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Mudar estilo da navbar ao rolar
    window.addEventListener('scroll', function () {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Botão CTA vai para contato
    document.getElementById('cta-button').addEventListener('click', () => {
        scrollToSection('contato');
    });
}

// ============================================================
// SCROLL HELPERS
// ============================================================
function scrollToSection(sectionId) {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', function () {
    const btn = document.getElementById('scroll-top');
    btn.classList.toggle('show', window.scrollY > 300);
});

// ============================================================
// QUIZ — MELHORIA: feedback visual por questão
// ============================================================
function initializeQuiz() {
    const container = document.getElementById('quiz-questions');
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
        const selected    = document.querySelector(`input[name="question${index}"]:checked`);
        const labels      = questionDiv.querySelectorAll('label');

        // Marcar como submetida (desativa cliques)
        questionDiv.classList.add('submitted');

        labels.forEach((label, optIndex) => {
            const icon = label.querySelector('.quiz-feedback-icon');
            const isCorrect = optIndex === item.correct;
            const isSelected = selected && parseInt(selected.value) === optIndex;

            if (isSelected && isCorrect) {
                // Resposta correta selecionada
                label.classList.add('correct');
                icon.textContent = '✅';
                score++;
            } else if (isSelected && !isCorrect) {
                // Resposta errada selecionada
                label.classList.add('wrong');
                icon.textContent = '❌';
            } else if (!isSelected && isCorrect) {
                // Mostrar qual era a resposta certa
                label.classList.add('correct-answer');
                icon.textContent = '💡';
            }
        });
    });

    quizSubmitted = true;

    // Mostrar resultado final
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
    resultDiv.innerHTML = `
        <span class="quiz-emoji">${emoji}</span>
        <p>${msg}</p>
        <p><strong>${score} de ${quizData.length} corretas — ${percentage}%</strong></p>
        <button class="btn-quiz-retry" onclick="retryQuiz()">🔄 Tentar novamente</button>
    `;
    resultDiv.classList.add('show');
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function retryQuiz() {
    const resultDiv = document.getElementById('quiz-result');
    resultDiv.classList.remove('show');
    initializeQuiz();
}

// ============================================================
// ABAS — SEÇÃO SOBRE
// ============================================================
function switchTab(tabIndex) {
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab-button').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
    });

    const pane   = document.getElementById(`tab-${tabIndex}`);
    const buttons = document.querySelectorAll('.tab-button');
    if (pane) pane.classList.add('active');
    if (buttons[tabIndex]) {
        buttons[tabIndex].classList.add('active');
        buttons[tabIndex].setAttribute('aria-selected', 'true');
    }
}

// ============================================================
// PRÁTICAS SUSTENTÁVEIS
// ============================================================
function selectPractice(index) {
    document.querySelectorAll('.practice-item').forEach(p => p.classList.remove('active'));
    const items = document.querySelectorAll('.practice-item');
    if (items[index]) items[index].classList.add('active');
}

// ============================================================
// ANIMAÇÕES DE SCROLL
// ============================================================
function setupScrollListeners() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.tech-card, .case-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ============================================================
// FORMULÁRIO — MELHORIA: envio real via EmailJS
// ============================================================
function setupFormListener() {
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const name    = document.getElementById('name').value.trim();
        const email   = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            showFormMessage('Por favor, preencha todos os campos.', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showFormMessage('Por favor, insira um email válido.', 'error');
            return;
        }

        const submitBtn  = document.getElementById('submit-btn');
        const submitText = document.getElementById('submit-text');
        const submitLoad = document.getElementById('submit-loading');

        // Estado de carregamento
        submitBtn.disabled   = true;
        submitText.style.display = 'none';
        submitLoad.style.display = 'inline';

        // Verificar se EmailJS está configurado
        const emailJSConfigured =
            typeof emailjs !== 'undefined' &&
            EMAILJS_CONFIG.publicKey !== 'SEU_PUBLIC_KEY';

        if (emailJSConfigured) {
            try {
                await emailjs.send(
                    EMAILJS_CONFIG.serviceId,
                    EMAILJS_CONFIG.templateId,
                    { from_name: name, from_email: email, message: message }
                );
                showFormMessage('✅ Mensagem enviada com sucesso! Obrigado por participar.', 'success');
                form.reset();
            } catch (error) {
                console.error('Erro ao enviar:', error);
                showFormMessage('❌ Erro ao enviar. Tente novamente mais tarde.', 'error');
            }
        } else {
            // Simulação (enquanto EmailJS não está configurado)
            await new Promise(r => setTimeout(r, 1200));
            showFormMessage('✅ Mensagem enviada com sucesso! Obrigado por participar.', 'success');
            form.reset();
        }

        // Restaurar botão
        submitBtn.disabled   = false;
        submitText.style.display = 'inline';
        submitLoad.style.display = 'none';
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFormMessage(msg, type) {
    const div = document.getElementById('form-message');
    div.textContent = msg;
    div.className   = `form-message ${type}`;
    setTimeout(() => { div.className = 'form-message'; }, 6000);
}
