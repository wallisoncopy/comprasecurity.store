
// Variáveis globais
let currentTab = 'tab-principal';

// Inicialização quando o DOM carrega
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Função principal de inicialização
function initializeApp() {
    setupLoginForm();
    setupNavigation();
    setupPerformanceOptimizations();
    setupColorTheme();
    loadSavedUserData();
}

// Configuração do formulário de login
function setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const userName = document.getElementById('userName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Simula autenticação (aceita qualquer nome, email e senha)
        if (userName && email && password) {
            login(userName);
        } else {
            showMessage('Por favor, preencha todos os campos', 'error');
        }
    });
}

// Função de login
function login(userName) {
    const loginScreen = document.getElementById('loginScreen');
    const mainApp = document.getElementById('mainApp');
    
    // Salva o nome do usuário
    localStorage.setItem('userName', userName);
    
    // Adiciona animação de saída para a tela de login
    loginScreen.style.transform = 'translateY(-100%)';
    loginScreen.style.opacity = '0';
    
    setTimeout(() => {
        loginScreen.style.display = 'none';
        mainApp.style.display = 'flex';
        
        // Atualiza o texto de boas-vindas
        updateWelcomeText(userName);
        
        // Animação de entrada do app principal
        mainApp.style.opacity = '0';
        setTimeout(() => {
            mainApp.style.transition = 'opacity 0.5s ease';
            mainApp.style.opacity = '1';
        }, 50);
        
        showMessage(`Bem-vindo(a) ${userName}! 🎉`, 'success');
    }, 300);
}

// Função de logout
function logout() {
    const loginScreen = document.getElementById('loginScreen');
    const mainApp = document.getElementById('mainApp');
    
    // Limpa os campos do formulário
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    
    // Animação de saída do app principal
    mainApp.style.opacity = '0';
    
    setTimeout(() => {
        mainApp.style.display = 'none';
        loginScreen.style.display = 'flex';
        loginScreen.style.transform = 'translateY(0)';
        loginScreen.style.opacity = '1';
        
        showMessage('Logout realizado com sucesso!', 'info');
    }, 300);
}

// Configuração da navegação entre abas
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
            
            // Adiciona feedback tátil (vibração) em dispositivos móveis
            if (navigator.vibrate) {
                navigator.vibrate(50);
            }
        });
    });
}

// Função para trocar de aba
function switchTab(tabId) {
    // Remove classe active de todas as abas
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove classe active de todos os itens de navegação
    document.querySelectorAll('.nav-item').forEach(nav => {
        nav.classList.remove('active');
    });
    
    // Adiciona classe active na aba selecionada
    const targetTab = document.getElementById(tabId);
    const targetNav = document.querySelector(`[data-tab="${tabId}"]`);
    
    if (targetTab && targetNav) {
        targetTab.classList.add('active');
        targetNav.classList.add('active');
        currentTab = tabId;
        
        // Scroll para o topo quando trocar de aba
        document.getElementById('content').scrollTop = 0;
    }
}

// Função para mostrar mensagens
function showMessage(message, type = 'info') {
    // Remove mensagem anterior se existir
    const existingMessage = document.querySelector('.app-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Cria nova mensagem
    const messageDiv = document.createElement('div');
    messageDiv.className = `app-message app-message-${type}`;
    messageDiv.textContent = message;
    
    // Estilos da mensagem
    Object.assign(messageDiv.style, {
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: getMessageColor(type),
        color: '#ffffff',
        padding: '12px 20px',
        borderRadius: '25px',
        fontSize: '14px',
        fontWeight: '500',
        zIndex: '9999',
        boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        opacity: '0',
        transition: 'all 0.3s ease'
    });
    
    document.body.appendChild(messageDiv);
    
    // Animação de entrada
    setTimeout(() => {
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateX(-50%) translateY(0)';
    }, 100);
    
    // Remove a mensagem após 3 segundos
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateX(-50%) translateY(-20px)';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 300);
    }, 3000);
}

// Função para obter cor da mensagem baseada no tipo
function getMessageColor(type) {
    const colors = {
        success: 'linear-gradient(135deg, #00c851 0%, #007e33 100%)',
        error: 'linear-gradient(135deg, #ff4757 0%, #ff3742 100%)',
        warning: 'linear-gradient(135deg, #ffbb33 0%, #ff8800 100%)',
        info: 'linear-gradient(135deg, #40c4ff 0%, #0080ff 100%)'
    };
    return colors[type] || colors.info;
}

// Otimizações de performance
function setupPerformanceOptimizations() {
    // Lazy loading para imagens (se houver)
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('loading');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // Preload de conteúdo crítico
    preloadCriticalResources();
    
    // Otimização de scroll
    optimizeScrollPerformance();
}

// Preload de recursos críticos
function preloadCriticalResources() {
    const criticalResources = [
        'https://checkout.seulink.com' // Link principal de checkout
    ];
    
    criticalResources.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        document.head.appendChild(link);
    });
}

// Otimização de performance do scroll
function optimizeScrollPerformance() {
    let ticking = false;
    
    function updateScrollEffects() {
        // Adiciona efeitos de parallax ou outros efeitos baseados em scroll aqui
        ticking = false;
    }
    
    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
}

// Função para detectar dispositivos móveis
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Função para detectar se está online
function isOnline() {
    return navigator.onLine;
}

// Event listeners para mudanças de conexão
window.addEventListener('online', function() {
    showMessage('Conexão restaurada! 🌐', 'success');
});

window.addEventListener('offline', function() {
    showMessage('Sem conexão com a internet ⚠️', 'warning');
});

// Função para copiar texto (útil para links)
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showMessage('Link copiado! 📋', 'success');
        });
    } else {
        // Fallback para browsers mais antigos
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showMessage('Link copiado! 📋', 'success');
    }
}

// Função para share nativo (se disponível)
function shareApp() {
    if (navigator.share) {
        navigator.share({
            title: 'App do Educador',
            text: 'Mais de 300 atividades prontas para professores!',
            url: window.location.href
        }).then(() => {
            showMessage('Compartilhado com sucesso! 📤', 'success');
        }).catch(() => {
            showMessage('Erro ao compartilhar', 'error');
        });
    } else {
        // Fallback: copiar URL
        copyToClipboard(window.location.href);
    }
}

// Prevenção de zoom em inputs (iOS)
if (isMobile()) {
    document.addEventListener('touchstart', function() {}, { passive: true });
    
    // Previne zoom em inputs no iOS
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            if (parseFloat(getComputedStyle(input).fontSize) < 16) {
                input.style.fontSize = '16px';
            }
        });
    });
}

// Função para animações de entrada quando elementos ficam visíveis
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observa cards para animação
    document.querySelectorAll('.card, .product-card, .content-card, .settings-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Inicializa animações de scroll quando o conteúdo carrega
window.addEventListener('load', setupScrollAnimations);

// Service Worker para cache (PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registrado com sucesso:', registration.scope);
            })
            .catch(function(error) {
                console.log('SW falhou ao registrar:', error);
            });
    });
}

// Função para atualizar texto de boas-vindas
function updateWelcomeText(userName) {
    const welcomeText = document.getElementById('welcomeText');
    const displayName = document.getElementById('displayName');
    
    if (welcomeText && userName) {
        const greetings = [
            `Olá, ${userName}! ✨`,
            `Bem-vindo(a), ${userName}! 🌟`,
            `Oi ${userName}! Que bom te ver! 😊`,
            `E aí, ${userName}! Pronto(a) para ensinar? 🚀`
        ];
        const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
        welcomeText.textContent = randomGreeting;
    }
    
    if (displayName && userName) {
        displayName.textContent = userName;
    }
}

// Função para configurar seletor de cores
function setupColorTheme() {
    const colorOptions = document.querySelectorAll('.color-option');
    
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            changeAppTheme(color);
            
            // Remove active de todos
            colorOptions.forEach(opt => opt.classList.remove('active'));
            // Adiciona active ao selecionado
            this.classList.add('active');
            
            // Salva preferência
            localStorage.setItem('appTheme', color);
            
            showMessage('Tema alterado com sucesso! 🎨', 'success');
        });
    });
}

// Função para mudar tema do app
function changeAppTheme(colorName) {
    const root = document.documentElement;
    
    const themes = {
        blue: {
            primary: '#40c4ff',
            gradient: 'linear-gradient(135deg, #40c4ff 0%, #0080ff 100%)',
            shadow: 'rgba(64, 196, 255, 0.3)'
        },
        purple: {
            primary: '#9c27b0',
            gradient: 'linear-gradient(135deg, #9c27b0 0%, #673ab7 100%)',
            shadow: 'rgba(156, 39, 176, 0.3)'
        },
        green: {
            primary: '#4caf50',
            gradient: 'linear-gradient(135deg, #4caf50 0%, #2e7d32 100%)',
            shadow: 'rgba(76, 175, 80, 0.3)'
        },
        orange: {
            primary: '#ff9800',
            gradient: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
            shadow: 'rgba(255, 152, 0, 0.3)'
        },
        pink: {
            primary: '#e91e63',
            gradient: 'linear-gradient(135deg, #e91e63 0%, #c2185b 100%)',
            shadow: 'rgba(233, 30, 99, 0.3)'
        }
    };
    
    const theme = themes[colorName];
    if (theme) {
        root.style.setProperty('--primary-color', theme.primary);
        root.style.setProperty('--primary-gradient', theme.gradient);
        root.style.setProperty('--primary-shadow', theme.shadow);
    }
}

// Função para carregar dados salvos do usuário
function loadSavedUserData() {
    const savedName = localStorage.getItem('userName');
    const savedTheme = localStorage.getItem('appTheme');
    
    if (savedName) {
        updateWelcomeText(savedName);
    }
    
    if (savedTheme) {
        changeAppTheme(savedTheme);
        // Atualiza seletor visual
        const colorOption = document.querySelector(`[data-color="${savedTheme}"]`);
        if (colorOption) {
            document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('active'));
            colorOption.classList.add('active');
        }
    }
}

// Função de logout atualizada para limpar dados salvos
function logout() {
    const loginScreen = document.getElementById('loginScreen');
    const mainApp = document.getElementById('mainApp');
    
    // Limpa os campos do formulário
    document.getElementById('userName').value = '';
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    
    // Limpa dados salvos
    localStorage.removeItem('userName');
    
    // Animação de saída do app principal
    mainApp.style.opacity = '0';
    
    setTimeout(() => {
        mainApp.style.display = 'none';
        loginScreen.style.display = 'flex';
        loginScreen.style.transform = 'translateY(0)';
        loginScreen.style.opacity = '1';
        
        showMessage('Logout realizado com sucesso!', 'info');
    }, 300);
}

// Exporta funções para uso global
window.logout = logout;
window.shareApp = shareApp;
window.copyToClipboard = copyToClipboard;

// ============================================================
// GERADOR DE ATIVIDADES COM IA
// Obtenha sua chave gratuita em: https://aistudio.google.com
// ============================================================
const GEMINI_API_KEY = 'SUA_CHAVE_GEMINI_AQUI';

let lastGeneratedActivity = '';
let lastActivityMeta = {};

async function generateActivity() {
    const disciplina = document.getElementById('ia-disciplina').value;
    const serie = document.getElementById('ia-serie').value;
    const tema = document.getElementById('ia-tema').value.trim();
    const tipo = document.getElementById('ia-tipo').value;

    if (!disciplina || !serie || !tema || !tipo) {
        showMessage('Preencha todos os campos! 📝', 'warning');
        return;
    }

    if (GEMINI_API_KEY === 'SUA_CHAVE_GEMINI_AQUI') {
        showMessage('Configure a chave da API Gemini no script.js!', 'error');
        return;
    }

    lastActivityMeta = { disciplina, serie, tema, tipo };

    document.getElementById('ia-result').style.display = 'none';
    document.getElementById('ia-loading').style.display = 'block';
    document.getElementById('btn-gerar').disabled = true;

    const prompt = `Crie uma atividade educacional completa para professores brasileiros.

Disciplina: ${disciplina}
Ano/Série: ${serie}
Tema: ${tema}
Tipo: ${tipo}

Estruture a atividade exatamente assim:

TÍTULO: [título criativo relacionado ao tema]

OBJETIVOS:
- [objetivo 1]
- [objetivo 2]

MATERIAIS NECESSÁRIOS:
- [material 1]
- [material 2]

INSTRUÇÕES PARA O PROFESSOR:
[breve orientação de como aplicar a atividade]

ATIVIDADE:
[Escreva de 5 a 8 exercícios/questões numerados, adequados para a faixa etária]

GABARITO:
[Respostas esperadas numeradas, se aplicável]

Use linguagem clara, prática e adequada para impressão. Seja objetivo e didático.`;

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: {
                        temperature: 0.8,
                        maxOutputTokens: 1500
                    }
                })
            }
        );

        if (!response.ok) {
            const err = await response.json();
            throw new Error(err.error?.message || 'Erro na API');
        }

        const data = await response.json();
        const text = data.candidates[0].content.parts[0].text;

        lastGeneratedActivity = text;
        document.getElementById('ia-content').textContent = text;
        document.getElementById('ia-loading').style.display = 'none';
        document.getElementById('ia-result').style.display = 'block';
        showMessage('Atividade gerada! 🎉', 'success');

    } catch (error) {
        document.getElementById('ia-loading').style.display = 'none';
        showMessage('Erro ao gerar atividade. Verifique sua chave da API.', 'error');
        console.error('Erro Gemini:', error);
    }

    document.getElementById('btn-gerar').disabled = false;
}

function downloadPDF() {
    if (!lastGeneratedActivity) {
        showMessage('Gere uma atividade primeiro!', 'warning');
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const { disciplina, serie, tema } = lastActivityMeta;

    // Header roxo
    doc.setFillColor(156, 39, 176);
    doc.rect(0, 0, 210, 26, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(15);
    doc.setFont('helvetica', 'bold');
    doc.text('App Infantil Pro  |  Atividade com IA', 105, 12, { align: 'center' });
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`${disciplina}  •  ${serie}  •  Tema: ${tema}`, 105, 21, { align: 'center' });

    // Linha separadora
    doc.setDrawColor(156, 39, 176);
    doc.setLineWidth(0.5);
    doc.line(15, 30, 195, 30);

    // Conteúdo
    doc.setTextColor(30, 30, 30);
    doc.setFontSize(11);

    const sectionHeaders = /^(TÍTULO|OBJETIVOS|MATERIAIS|INSTRUÇÕES|ATIVIDADE|GABARITO)/;
    const lines = doc.splitTextToSize(lastGeneratedActivity, 175);
    let y = 38;
    const pageHeight = 280;
    const lineH = 6;

    for (const line of lines) {
        if (y > pageHeight) {
            doc.addPage();
            y = 20;
        }

        if (sectionHeaders.test(line.trim())) {
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(106, 27, 154);
            doc.text(line, 15, y);
        } else {
            doc.setFont('helvetica', 'normal');
            doc.setTextColor(30, 30, 30);
            doc.text(line, 15, y);
        }
        y += lineH;
    }

    // Footer
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
        doc.setPage(i);
        doc.setTextColor(150, 150, 150);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'italic');
        doc.text(
            `Gerado em ${new Date().toLocaleDateString('pt-BR')} — App Infantil Pro  |  Pág. ${i}/${totalPages}`,
            105, 292, { align: 'center' }
        );
    }

    const safeTema = tema.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();
    doc.save(`atividade-${safeTema}.pdf`);
    showMessage('PDF baixado! 📄', 'success');
}

function resetIA() {
    document.getElementById('ia-result').style.display = 'none';
    document.getElementById('ia-loading').style.display = 'none';
    document.getElementById('ia-disciplina').value = '';
    document.getElementById('ia-serie').value = '';
    document.getElementById('ia-tema').value = '';
    document.getElementById('ia-tipo').value = '';
    lastGeneratedActivity = '';
    lastActivityMeta = {};
    document.getElementById('content').scrollTop = 0;
}

window.generateActivity = generateActivity;
window.downloadPDF = downloadPDF;
window.resetIA = resetIA;
