
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Atualização da Data Dinâmica
    const dateEl = document.getElementById('current-date');
    if (dateEl) {
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        dateEl.textContent = new Date().toLocaleDateString('pt-BR', options);
    }

    // 2. Lógica das Notificações de Compra
    const names = ['Mariana', 'Cláudia', 'Renata', 'Patrícia', 'Fernanda', 'Amanda', 'Juliana', 'Beatriz', 'Camila', 'Larissa', 'Suelen', 'Tainá', 'Gisele', 'Bruna'];
    const notification = document.getElementById('notification');
    const notifName = document.getElementById('notif-name');
    const notifInitial = document.getElementById('notif-initial');

    function showNotification() {
        if (!notification) return;
        const randomName = names[Math.floor(Math.random() * names.length)];
        notifName.textContent = randomName;
        notifInitial.textContent = randomName[0];
        
        notification.classList.remove('-translate-y-20', 'opacity-0');
        notification.classList.add('translate-y-0', 'opacity-100');

        setTimeout(() => {
            notification.classList.remove('translate-y-0', 'opacity-100');
            notification.classList.add('-translate-y-20', 'opacity-0');
        }, 4000);
    }

    setInterval(showNotification, 12000);
    setTimeout(showNotification, 3000);

    // 3. Acordeão do FAQ
    const faqToggles = document.querySelectorAll('.faq-toggle');
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const item = toggle.parentElement;
            const answer = item.querySelector('.faq-answer');
            const icon = toggle.querySelector('i[data-lucide="chevron-down"]');
            
            const isOpen = answer.style.maxHeight !== '0px' && answer.style.maxHeight !== '';
            
            // Fecha todos os outros (opcional)
            document.querySelectorAll('.faq-answer').forEach(el => el.style.maxHeight = '0px');
            document.querySelectorAll('.faq-toggle i').forEach(el => el.style.transform = 'rotate(0deg)');

            if (!isOpen) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                if(icon) icon.style.transform = 'rotate(180deg)';
            }
        });
    });

    // 4. Renderização do Selo de Garantia SVG
    const sealContainer = document.getElementById('guarantee-seal-container');
    if (sealContainer) {
        sealContainer.innerHTML = `
            <div class="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
                <svg viewBox="0 0 200 200" class="w-full h-full drop-shadow-2xl animate-float">
                    <defs>
                        <path id="circlePath" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
                    </defs>
                    <circle cx="100" cy="100" r="95" fill="rgba(250, 204, 21, 0.2)" />
                    <circle cx="100" cy="100" r="90" fill="#facc15" stroke="#eab308" stroke-width="2" />
                    <circle cx="100" cy="100" r="82" fill="none" stroke="white" stroke-width="2" stroke-dasharray="5,5" />
                    <circle cx="100" cy="100" r="75" fill="#1e40af" />
                    <text fill="white" font-size="13" font-style="italic" font-weight="bold" letter-spacing="1">
                        <textPath href="#circlePath" startOffset="50%" text-anchor="middle">
                            • GARANTIA TOTAL • RISCO ZERO • SATISFAÇÃO •
                        </textPath>
                    </text>
                    <text x="100" y="95" text-anchor="middle" fill="white" font-size="55" font-weight="900" style="filter: drop-shadow(0px 2px 2px rgba(0,0,0,0.3))">7</text>
                    <text x="100" y="125" text-anchor="middle" fill="white" font-size="20" font-weight="bold" style="text-transform: uppercase">Dias</text>
                    <rect x="55" y="135" width="90" height="2" fill="rgba(255,255,255,0.4)" />
                    <text x="100" y="152" text-anchor="middle" fill="white" font-size="11" font-weight="extrabold" style="text-transform: uppercase">Incondicionais</text>
                </svg>
            </div>
        `;
    }
});
