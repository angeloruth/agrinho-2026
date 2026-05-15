/* ============================================
   AGRINHO 2026 - AGRO FORTE, FUTURO SUSTENTÁVEL
   JavaScript - Projeto Front-End HTML/CSS/JS
   ============================================ */

// ============================================
// 1. CONFIGURAÇÃO INICIAL E DADOS
// ============================================

/**
 * Dados do Quiz sobre Sustentabilidade Agrícola
 * Cada questão contém pergunta, opções e índice da resposta correta
 */
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

// Variável para armazenar respostas do usuário
let quizAnswers = {};

// ============================================
// 2. INICIALIZAÇÃO
// ============================================

/**
 * Função executada quando o DOM está pronto
 * Inicializa todos os event listeners e componentes
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeQuiz();
    setupScrollListeners();
    setupFormListener();
});

// ============================================
// 3. NAVEGAÇÃO
// ============================================

/**
 * Inicializa funcionalidades da navegação
 * - Menu mobile
 * - Scroll reveal da navbar
 * - Links de navegação
 */
function initializeNavigation() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');
    
    // Toggle do menu mobile
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
    
    // Scroll reveal da navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // CTA Button
    const ctaButton = document.getElementById('cta-button');
    ctaButton.addEventListener('click', function() {
        scrollToSection('contato');
    });
}

/**
 * Função para rolar até uma seção específica
 * @param {string} sectionId - ID da seção para rolar
 */
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

/**
 * Função para rolar até o topo da página
 */
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// 4. SCROLL LISTENERS
// ============================================

/**
 * Configura listeners para eventos de scroll
 * - Mostra/oculta botão de voltar ao topo
 */
function setupScrollListeners() {
    const scrollTopButton = document.getElementById('scroll-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopButton.classList.add('show');
        } else {
            scrollTopButton.classList.remove('show');
        }
    });
}

// ============================================
// 5. ABAS (TABS)
// ============================================

/**
 * Alterna entre abas na seção "Sobre"
 * @param {number} tabIndex - Índice da aba a exibir (0, 1, ou 2)
 */
function switchTab(tabIndex) {
    // Oculta todas as abas
    const allPanes = document.querySelectorAll('.tab-pane');
    allPanes.forEach(pane => {
        pane.classList.remove('active');
    });
    
    // Remove classe active de todos os botões
    const allButtons = document.querySelectorAll('.tab-button');
    allButtons.forEach(button => {
        button.classList.remove('active');
    });
    
    // Mostra aba selecionada
    const selectedPane = document.getElementById(`tab-${tabIndex}`);
    if (selectedPane) {
        selectedPane.classList.add('active');
    }
    
    // Marca botão como ativo
    allButtons[tabIndex].classList.add('active');
}

// ============================================
// 6. SELEÇÃO DE PRÁTICAS SUSTENTÁVEIS
// ============================================

/**
 * Seleciona uma prática sustentável na seção de Sustentabilidade
 * @param {number} practiceIndex - Índice da prática a selecionar
 */
function selectPractice(practiceIndex) {
    // Remove classe active de todos os itens
    const allPractices = document.querySelectorAll('.practice-item');
    allPractices.forEach(practice => {
        practice.classList.remove('active');
    });
    
    // Adiciona classe active ao item selecionado
    allPractices[practiceIndex].classList.add('active');
}

// ============================================
// 7. QUIZ
// ============================================

/**
 * Inicializa o quiz renderizando as questões
 */
function initializeQuiz() {
    const quizContainer = document.getElementById('quiz-questions');
    
    quizData.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'quiz-question';
        
        let optionsHTML = '';
        q.options.forEach((option, optIndex) => {
            optionsHTML += `
                <label>
                    <input type="radio" name="q${index}" value="${optIndex}" 
                           onchange="quizAnswers[${index}] = '${optIndex}'">
                    ${option}
                </label>
            `;
        });
        
        questionDiv.innerHTML = `
            <p>${index + 1}. ${q.question}</p>
            ${optionsHTML}
        `;
        
        quizContainer.appendChild(questionDiv);
    });
}

/**
 * Calcula e exibe o resultado do quiz
 */
function submitQuiz() {
    let score = 0;
    
    // Verifica respostas corretas
    quizData.forEach((q, index) => {
        if (parseInt(quizAnswers[index]) === q.correct) {
            score++;
        }
    });
    
    // Exibe resultado
    const resultDiv = document.getElementById('quiz-result');
    const percentage = Math.round((score / quizData.length) * 100);
    
    resultDiv.innerHTML = `
        <p>Você acertou <strong>${score} de ${quizData.length}</strong> questões!</p>
        <p>Desempenho: <strong>${percentage}%</strong></p>
    `;
    resultDiv.classList.add('show');
}

// ============================================
// 8. FORMULÁRIO DE CONTATO
// ============================================

/**
 * Configura listener para o formulário de contato
 */
function setupFormListener() {
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', submitForm);
}

/**
 * Submete o formulário de contato
 * @param {Event} event - Evento do formulário
 */
function submitForm(event) {
    event.preventDefault();
    
    // Obtém valores do formulário
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Valida campos
    if (name && email && message) {
        // Exibe mensagem de sucesso
        const messageDiv = document.getElementById('form-message');
        messageDiv.innerHTML = '✓ Mensagem enviada com sucesso!';
        messageDiv.classList.add('show');
        
        // Limpa formulário
        document.getElementById('contact-form').reset();
        
        // Remove mensagem após 3 segundos
        setTimeout(() => {
            messageDiv.classList.remove('show');
        }, 3000);
    }
}

// ============================================
// 9. UTILITÁRIOS
// ============================================

/**
 * Função auxiliar para adicionar classe com delay
 * Útil para animações em cascata
 * @param {Element} element - Elemento a animar
 * @param {string} className - Classe a adicionar
 * @param {number} delay - Delay em milissegundos
 */
function addClassWithDelay(element, className, delay) {
    setTimeout(() => {
        element.classList.add(className);
    }, delay);
}

/**
 * Função auxiliar para remover classe
 * @param {Element} element - Elemento
 * @param {string} className - Classe a remover
 */
function removeClass(element, className) {
    element.classList.remove(className);
}

// ============================================
// 10. EVENT LISTENERS GLOBAIS
// ============================================

/**
 * Listener para detectar cliques fora de menus
 * Fecha menu mobile ao clicar fora
 */
document.addEventListener('click', function(event) {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (!navbar.contains(event.target)) {
        navMenu.style.display = 'none';
    }
});

/**
 * Listener para tecla Escape
 * Fecha menu mobile ao pressionar Escape
 */
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        navMenu.style.display = 'none';
    }
});

// ============================================
// FIM DO SCRIPT
// ============================================
