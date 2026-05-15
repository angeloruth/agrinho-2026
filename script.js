// Agrinho 2026 - Agro Forte, Futuro Sustentável
// JavaScript - Projeto Front-End

// Dados do quiz sobre sustentabilidade
const quizData = [
    {
        question: "Qual é o impacto da rotação de culturas?",
        options: ["Aumenta custos", "Melhora saúde do solo", "Reduz produção"],
        correct: 1
    },
    {
        question: "Quanto de água pode ser economizado com irrigação eficiente?",
        options: ["10%", "30%", "50%"],
        correct: 2
    },
    {
        question: "Qual tecnologia monitora plantações em tempo real?",
        options: ["Drones com sensores", "Telescópios", "Radares"],
        correct: 0
    }
];

let quizAnswers = {};

// Inicializa quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeQuiz();
    setupScrollListeners();
    setupFormListener();
});

// Configurar navegação e menu mobile
function initializeNavigation() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');
    
    // Abrir/fechar menu mobile
    menuToggle.addEventListener('click', function() {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.style.display = 'none';
        });
    });
    
    // Mudar cor da navbar ao rolar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Botão CTA
    const ctaButton = document.getElementById('cta-button');
    ctaButton.addEventListener('click', function() {
        scrollToSection('contato');
    });
}

// Rolar até uma seção
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Voltar ao topo
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Mostrar/esconder botão voltar ao topo
window.addEventListener('scroll', function() {
    const scrollTopBtn = document.getElementById('scroll-top');
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

// Inicializar quiz
function initializeQuiz() {
    const quizContainer = document.getElementById('quiz-questions');
    
    // Criar as questões
    quizData.forEach((item, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'quiz-question';
        
        let optionsHTML = '';
        item.options.forEach((option, optIndex) => {
            optionsHTML += `
                <label>
                    <input type="radio" name="question${index}" value="${optIndex}">
                    ${option}
                </label>
            `;
        });
        
        questionDiv.innerHTML = `
            <p>${index + 1}. ${item.question}</p>
            ${optionsHTML}
        `;
        
        quizContainer.appendChild(questionDiv);
    });
}

// Enviar quiz e mostrar resultado
function submitQuiz() {
    let score = 0;
    
    // Verificar respostas
    quizData.forEach((item, index) => {
        const selected = document.querySelector(`input[name="question${index}"]:checked`);
        if (selected && parseInt(selected.value) === item.correct) {
            score++;
        }
    });
    
    // Mostrar resultado
    const resultDiv = document.getElementById('quiz-result');
    const percentage = Math.round((score / quizData.length) * 100);
    
    resultDiv.innerHTML = `
        <p>Sua pontuação:</p>
        <p><strong>${score} de ${quizData.length}</strong></p>
        <p><strong>${percentage}%</strong></p>
    `;
    
    resultDiv.classList.add('show');
}

// Abas na seção Sobre
function switchTab(tabIndex) {
    // Esconder todos os painéis
    const panes = document.querySelectorAll('.tab-pane');
    panes.forEach(pane => pane.classList.remove('active'));
    
    // Remover classe active de todos os botões
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Mostrar painel selecionado
    const selectedPane = document.getElementById(`tab-${tabIndex}`);
    if (selectedPane) {
        selectedPane.classList.add('active');
    }
    
    // Ativar botão selecionado
    buttons[tabIndex].classList.add('active');
}

// Selecionar prática sustentável
function selectPractice(index) {
    const practices = document.querySelectorAll('.practice-item');
    practices.forEach(practice => practice.classList.remove('active'));
    practices[index].classList.add('active');
}

// Listeners para scroll
function setupScrollListeners() {
    // Animar elementos ao entrar na viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    const elements = document.querySelectorAll('.tech-card, .case-card');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Formulário de contato
function setupFormListener() {
    const form = document.getElementById('contact-form');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Validar campos
        if (!name || !email || !message) {
            showFormMessage('Por favor, preencha todos os campos', 'error');
            return;
        }
        
        // Validar email
        if (!isValidEmail(email)) {
            showFormMessage('Por favor, insira um email válido', 'error');
            return;
        }
        
        // Simular envio
        showFormMessage('Mensagem enviada com sucesso! Obrigado por participar.', 'success');
        form.reset();
    });
}

// Validar email
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Mostrar mensagem do formulário
function showFormMessage(message, type) {
    const messageDiv = document.getElementById('form-message');
    messageDiv.textContent = message;
    messageDiv.className = `form-message ${type}`;
    
    // Esconder mensagem após 5 segundos
    setTimeout(() => {
        messageDiv.className = 'form-message';
    }, 5000);
}
