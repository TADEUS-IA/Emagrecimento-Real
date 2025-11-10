/* ======================================================================
 * --- CONFIGURAÇÃO GLOBAL DA PÁGINA ---
 * ======================================================================
 */
const pageConfig = {
    // Webhooks
    n8nWebhookUrl: 'https://automacoe-n8n.bitxsu.easypanel.host/webhook-test/n8n',
    googleSheetWebhookUrl: 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL', 

    // Vídeos
    headerVideo: { src: 'https://www.youtube.com/watch?v=qLjl9V0uXzA' },
    demoVideo: { src: 'https://www.youtube.com/watch?v=gwbasDmCDp0' },
    
    // Links Estratégicos (Usados pelo Cérebro Interno)
    calculatorUrl: '#calculadora', 
    ebookCtaId: '#cta',
    whatsappUrl: 'https://wa.me/message/DQJBWVDS3BJ4N1' // Link do WhatsApp
};

/* ======================================================================
 * --- INÍCIO: "CÉREBRO" DE IA (LADO DO CLIENTE) ---
 * ======================================================================
 */

/**
 * NÍVEL 1: Cérebro Interno (Base de Conhecimento Local)
 * Esta é a "fonte da verdade". NÃO é mais usada para respostas diretas,
 * mas sim como a base para as 'internalResponses' abaixo.
 */
const internalKnowledgeBase = `
    Olá! Sou o assistente virtual do método Emagrecimento Real. Nossa filosofia é 100% honestidade e ciência. Não acreditamos em milagres. O que funciona é: Ciência, Consistência e Paciência.

    Sobre o início (Retenção Líquida): Nos primeiros 20 a 30 dias, a maior parte do peso perdido é retenção líquida (desinchaço), não gordura. É o corpo se adaptando.

    Sobre a queima de gordura real: A perda de gordura efetiva começa *depois* desses 30 dias, ativada pela constância na dieta e intensidade no treino.

    Sobre quanto tempo leva para ver resultados: Mudanças notáveis ocorrem entre 60 e 90 dias. Uma transformação profunda leva 120 dias ou mais.

    Sobre o Pilar 1: A Dieta. A dieta é o motor. Regra de ouro: Constância > Perfeição. Priorize proteínas, fibras e água. Você não está "de dieta", está em "reconstrução".

    Sobre o Pilar 2: A Academia (Treino). A academia é seu canteiro de obras. Treine com propósito e intensidade. Esqueça o celular. 45 minutos de treino focado valem mais que 2 horas de distração.

    Sobre o Pilar 3: Suplementação Inteligente. Suplementos são aliados, não milagres. Para começar: Whey Protein (recuperação) e Creatina (força). Evite produtos "secretos" da internet.

    Sobre a Mentalidade e Foco (Mindset). Mentalidade é o que muda o jogo. Você precisa de estratégia e consistência. A academia é lugar de treinar. Documente sua evolução em casa, não no espelho da academia.

    Sobre a Calculadora de Metas: A Calculadora é nossa ferramenta gratuita para te dar um ponto de partida. Ela calcula estimativas de consumo diário de água, proteínas, gorduras e carboidratos.

    Sobre a Oferta Principal (Guia Gratuito): O acesso ao Guia de Emagrecimento Real é 100% GRATUITO. Basta preencher seu e-mail na seção "CTA" no final da página.

    Sobre Garantia e Objeções (Seus Medos): 
    Objeção: "Já tentei de tudo e nada funcionou." Resposta: Entendemos. A maioria das dietas falha por serem restritivas demais. Nosso método foca em sustentabilidade e hábitos realistas.
    Objeção: "Eu não tenho tempo para cozinhar ou treinar." Resposta: O segredo é usar o tempo de forma inteligente. Ensinamos estratégias para refeições rápidas e treinos eficientes.
    Objeção: "Tenho medo de falhar de novo." Resposta: Esse medo é a razão pela qual o foco na mentalidade é um pilar. O fracasso só existe para quem desiste.
    Sobre a Garantia: Em nossos programas pagos, oferecemos uma Garantia Incondicional de 7 Dias.
`;


/**
 * Respostas Humanizadas do Agente Interno
 */
const internalResponses = {
    'GREETING': [
        "Olá! Sou a assistente do Emagrecimento Real. Como posso te ajudar hoje?",
        "Oi! 😊 Em que posso ser útil?",
        "Opa! Tudo bem? Me diga como posso auxiliar com sua jornada."
    ],
    'CALCULATOR': `Claro! A melhor forma de começar é pela nossa <strong>Calculadora de Metas</strong>. Ela vai te dar estimativas de água, proteínas e calorias.<br><br>Você pode acessá-la <a href="${pageConfig.calculatorUrl}" onclick="document.getElementById('ai-chat-close-btn').click()">clicando aqui</a>!`,
    'EBOOK': `O <strong>Guia de Emagrecimento Real</strong> é 100% gratuito! Você pode recebê-lo agora mesmo.<br><br>Basta rolar até a seção final da página e deixar seu e-mail <a href="${pageConfig.ebookCtaId}" onclick="document.getElementById('ai-chat-close-btn').click()">clicando neste link</a>.`,
    
    // Respostas de Conhecimento (Resumos do Prompt)
    'COMO_EMAGRECER': "Nosso método é baseado em 5 pilares: 1. Dieta em déficit calórico, 2. Treino intenso (musculação), 3. Suplementação inteligente (Whey/Creatina), 4. Mentalidade de foco, e 5. Descanso (sono).<br><br>Quer que eu detalhe algum desses pilares para você?",
    'RETENCAO_LIQUIDA': "Nos primeiros 20 a 30 dias, a maior parte do peso que você perde é <strong>retenção líquida</strong> (desinchaço), não gordura. É o corpo se adaptando à nova rotina. É o primeiro sinal de que você está no caminho certo!",
    'PERDA_GORDURA': "A queima de <strong>gordura real</strong> (aquela que muda o espelho) começa *depois* da fase de desinchaço (após 30 dias). Ela é ativada quando você mantém a <strong>constância na dieta</strong> e a <strong>intensidade no treino</strong>.",
    'SUPLEMENTOS': "Ótima pergunta! Os suplementos ideais para começar são <strong>Whey Protein</strong> (para recuperação muscular) e <strong>Creatina</strong> (para manter a força).<br><br>Eles não fazem milagres, mas aceleram os resultados do seu esforço. Recomendo os que estão na seção 'Suplementação Inteligente'!",
    'GARANTIA': "Sobre a Garantia: Se você, fizer tudo que está no Ebook. <strong>Não garantimos que vai dar certo temos certeza que irá da certo!</strong>.é a prova de falhas!",
    'DIETA': "A dieta é o motor de tudo! A regra de ouro é: <strong>Constância > Perfeição</strong>. Foque em priorizar proteínas, fibras e água. Ela não é um vilão, é sua aliada na reconstrução do seu corpo.",
    'ACADEMIA': "Pense na academia como seu 'canteiro de obras'. O foco total deve ser no <strong>ritmo e intensidade</strong>. Evite o celular, ele é o maior vilão do seu foco. 45 minutos focados valem mais que 2 horas de distração.",
    'TEMPO_RESULTADOS': "Você começará a ver mudanças notáveis no espelho e nas roupas entre <strong>60 e 90 dias</strong> de foco total. Uma transformação profunda, de mente e corpo, geralmente leva <strong>120 dias</strong> ou mais.",
    'MENTALIDADE': "A mentalidade é o que muda o jogo. Você não precisa de sorte, precisa de <strong>estratégia</strong>. Não precisa de milagres, precisa de <strong>consistência</strong>.",
    'OBJECAO_FALHA': "Eu entendo totalmente seu medo de falhar de novo. A maioria das dietas falha por serem restritivas demais. Nosso método foca na mentalidade e no acompanhamento. Lembre-se: o fracasso só existe para quem desiste.",
    'OBJECAO_TEMPO': "O segredo não é ter *mais* tempo, é usá-lo de forma *inteligente*. Ensinamos estratégias para refeições rápidas e treinos eficientes. <strong>45 minutos de treino focado</strong> valem mais que 2 horas de distração.",
};

/**
 * Mapa de Intenções
 */
const keywordMap = {
    'GREETING': ['oi', 'olá', 'ola', 'bom dia', 'boa tarde', 'boa noite', 'e aí', 'eae', 'tudo bem', 'tudo bom'],
    'CALCULATOR': ['calculadora', 'calcular', 'meta', 'imc', 'peso', 'água', 'proteína', 'calorias'],
    'EBOOK': ['ebook', 'guia', 'gratuito', 'e-book', 'email', 'cadastrar', 'receber o guia'],
    'COMO_EMAGRECER': ['como emagrecer', 'como perder peso', 'perder peso', 'emagrecimento', 'emagrecer', 'o que fazer para'],
    'RETENCAO_LIQUIDA': ['retenção líquida', 'retenção', 'desinchar', 'inchaço', 'o que é retenção'],
    'PERDA_GORDURA': ['gordura', 'queima de gordura', 'perder gordura', 'quando começo a perder gordura'],
    'SUPLEMENTOS': ['suplemento', 'suplementos', 'tomar', 'whey', 'creatina', 'termogênico', 'quais suplementos tomar'],
    'GARANTIA': ['garantia', 'garantido', 'devolver', 'reembolso', 'risco', 'qual a garantia'],
    'DIETA': ['dieta', 'alimentação', 'comer', 'refeição', 'prato', 'como funciona a dieta'],
    'ACADEMIA': ['academia', 'treino', 'treinar', 'exercício', 'musculação', 'cardio', 'preciso ir à academia'],
    'TEMPO_RESULTADOS': ['tempo', 'resultado', 'quando', 'demora', '60 dias', '90 dias'],
    'MENTALIDADE': ['mentalidade', 'mente', 'foco', 'mindset', 'consistência'],
    'OBJECAO_FALHA': ['falhar', 'falhei', 'medo de falhar', 'nada funciona', 'tentei de tudo'],
    'OBJECAO_TEMPO': ['não tenho tempo', 'sem tempo', 'corrido', 'cozinhar'],
};

/**
 * NÍVEL 1: Agente Interno (queryInternalKnowledge)
 * Lógica de triagem: Saudações -> Metas -> Intenções por Keyword -> Fallback (null)
 */
function queryInternalKnowledge(query) {
    const lowerQuery = query.toLowerCase().trim();
    if (!lowerQuery) return { response: "Por favor, digite sua pergunta.", isHtml: false };

    // --- 1. Triagem: Saudações (Empatia) ---
    if (keywordMap.GREETING.some(greeting => lowerQuery === greeting || lowerQuery.startsWith(greeting + ' '))) {
        const responses = internalResponses.GREETING;
        return { response: responses[Math.floor(Math.random() * responses.length)], isHtml: false };
    }
    
    // --- 2. Triagem: Metas Estratégicas (Induzimento) ---
    if (keywordMap.CALCULATOR.some(word => lowerQuery.includes(word))) {
        return { response: internalResponses.CALCULATOR, isHtml: true };
    }
    if (keywordMap.EBOOK.some(word => lowerQuery.includes(word))) {
        return { response: internalResponses.EBOOK, isHtml: true };
    }

    // --- 3. (LÓGICA CORRIGIDA) Triage: Respostas de Conhecimento (Baseado em Intenção) ---
    let bestIntent = null;
    let maxScore = 0;

    // AQUI ESTÁ A CORREÇÃO do erro de sintaxe:
    const cleanQuery = lowerQuery.replace(/[.,!?;:]/g, ''); // Corrigido: /g, ''
    
    // Itera sobre todas as intenções de conhecimento
    const knowledgeIntents = Object.keys(keywordMap).filter(k => !['GREETING', 'CALCULATOR', 'EBOOK'].includes(k));

    for (const intent of knowledgeIntents) {
        let currentScore = 0;
        const keywords = keywordMap[intent];
        
        for (const keyword of keywords) {
            // Verifica se a *query inteira* (limpa) contém a palavra-chave
            if (cleanQuery.includes(keyword)) {
                // Pontuação baseada no tamanho da palavra-chave (palavras mais longas são mais relevantes)
                currentScore += keyword.length;
            }
        }
        
        // Bônus se a query for muito parecida com uma pergunta dos botões (correspondência exata)
        if (keywords.some(k => k === cleanQuery)) {
            currentScore += 50; // Pontuação alta para garantir a seleção
        }

        if (currentScore > maxScore) {
            maxScore = currentScore;
            bestIntent = intent;
        }
    }

    // --- 4. Verificação de Relevância ---
    if (bestIntent && maxScore > 0) { 
        console.log(`Cérebro Interno: Intenção '${bestIntent}' detectada com pontuação ${maxScore}.`);
        return { response: internalResponses[bestIntent], isHtml: true };
    }

    // --- 5. Triage: Falha (Sinaliza para o Orquestrador) ---
    // Se nenhuma intenção foi encontrada, retorna null.
    console.log("Cérebro Interno: Nenhuma intenção local encontrada. Acionando IAs externas.");
    return null; 
}


/**
 * (Mantido) NÍVEL 2: Orquestrador de IA (Lado do Cliente)
 * Chama o Cérebro Interno. Se ele retornar null,
 * chama o backend (/api/chat) para o fallback de IAs externas.
 */
async function handleChatOrchestration(query) {
    
    // 1. Tenta o Cérebro Interno
    const internalResponse = queryInternalKnowledge(query);
    
    if (internalResponse) {
        // Cérebro Interno encontrou uma resposta (Saudação, Meta ou Conhecimento)
        return internalResponse; // Retorna o objeto { response, isHtml }
    }

    // 2. Fallback para o Backend (Função Serverless)
    console.log("Orquestrador (Frontend): Cérebro interno não encontrou. Chamando /api/chat...");

    try {
        const apiResponse = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: query })
        });

        if (!apiResponse.ok) {
            console.error("Orquestrador (Frontend): A API /api/chat falhou.", apiResponse.status);
            throw new Error("Falha no servidor de IA");
        }

        const data = await apiResponse.json();
        return { response: data.response, isHtml: false }; // Respostas de IA externa são sempre texto puro

    } catch (error) {
        // 3. Resposta final de fallback (WhatsApp) se TUDO falhar
        console.error("Orquestrador (Frontend): Erro de rede ou falha total.", error);
        return {
            response: `Puxa, essa é uma ótima pergunta que eu (ainda) não sei responder! 🤔<br><br>Que tal falar diretamente com nossa equipe de especialistas no <a href="${pageConfig.whatsappUrl}" target="_blank">WhatsApp</a>? Eles vão te ajudar!`,
            isHtml: true
        };
    }
}
// --- FIM: "CÉREBRO" DE IA E ORQUESTRAÇÃO ---


/* ======================================================================
 * --- INÍCIO: LÓGICA DO DOCUMENTO (Listeners e Funções) ---
 * ======================================================================
 */

// Função auxiliar para obter URL de embed (Mantida)
function getVideoEmbedUrl(url) {
    if (!url) return null;
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/;
    const youtubeMatch = url.match(youtubeRegex);
    if (youtubeMatch) { const videoId = youtubeMatch[1]; return { type: 'iframe', src: `https://www.youtube.com/embed/${videoId}?playlist=${videoId}&loop=1&rel=0&iv_load_policy=3&showinfo=0&modestbranding=1&controls=0` }; }
    const gdriveRegex = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/;
    const gdriveMatch = url.match(gdriveRegex);
    if (gdriveMatch) { const fileId = gdriveMatch[1]; return { type: 'iframe', src: `https://drive.google.com/file/d/${fileId}/preview` }; }
    if (url.match(/\.(mp4|webm|ogg)$/i) || !url.startsWith('http')) { return { type: 'video', src: url }; }
    console.warn("Tipo de URL de vídeo não reconhecido:", url); return { type: 'iframe', src: url };
}

// Funções de Webhook (Mantidas)
async function sendToWebhook(data) {
    const webhookUrl = pageConfig.n8nWebhookUrl;
    if (!webhookUrl || webhookUrl.trim() === '' || webhookUrl.includes('substitua-pela-url')) { console.warn('N8N Webhook URL não configurada.'); return; }
    try {
        const response = await fetch(webhookUrl, { method: 'POST', mode: 'cors', headers: { 'Content-Type': 'application/json', }, body: JSON.stringify(data), });
        if (response.ok) { console.log('Dados enviados ao N8N Webhook!', data); } else { console.error('Falha ao enviar dados para o N8N Webhook. Status:', response.status); }
    } catch (error) { console.error('Erro de rede ou na requisição para o N8N Webhook:', error); }
}

async function sendToGoogleSheet(data) {
    const sheetUrl = pageConfig.googleSheetWebhookUrl;
    if (!sheetUrl || sheetUrl.trim() === '' || sheetUrl.includes('YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL')) {
        console.warn('Google Apps Script Web App URL não configurada.');
        return;
    }
    const payload = {
        timestamp: new Date().toLocaleString("pt-BR"),
        source: data.form_id || 'Unknown Form',
        ...data
    };
    try {
        const response = await fetch(sheetUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(payload)
        });
        console.log('Tentativa de envio para Google Sheet realizada.', payload);
    } catch (error) {
        console.error('Erro ao tentar enviar dados para o Google Sheet via Apps Script:', error);
    }
}

// --- Listener Principal (DOMContentLoaded) ---
document.addEventListener("DOMContentLoaded", function() {
    
    // Função de setup inicial da página (Mantida)
    function setupPage() {
        const headerVideoEl = document.getElementById('video-background'); const headerIframeEl = document.getElementById('iframe-background'); const configSrc = pageConfig.headerVideo.src;
        headerVideoEl.style.display = 'none'; headerIframeEl.style.display = 'none';
        if (configSrc) {
            const videoData = getVideoEmbedUrl(configSrc);
            if (videoData) {
                if (videoData.type === 'iframe') { headerIframeEl.src = `${videoData.src}&autoplay=1&mute=1`; headerIframeEl.style.display = 'block'; }
                else { headerVideoEl.innerHTML = `<source src="${videoData.src}" type="video/mp4">`; headerVideoEl.load(); headerVideoEl.play().catch(e => console.error("Header video autoplay failed:", e)); headerVideoEl.style.display = 'block'; }
            } else { console.error("Não foi possível processar a URL do vídeo do cabeçalho:", configSrc); }
        }

        // Listener de clique em botões (Mantido)
        document.querySelectorAll('.btn, .btn-secundario, .btn-secundario-inline').forEach(button => {
            button.addEventListener('click', () => {
                const isExternalLink = button.tagName === 'A' && button.href && button.href.startsWith('http');
                const isSubmitButton = button.tagName === 'BUTTON' && button.type === 'submit';
                
                if (isExternalLink || (isSubmitButton && button.closest('form')?.id === 'email-form')) {
                     if(isExternalLink && (button.getAttribute('href').startsWith('[') || button.getAttribute('href') === '#')) { 
                         console.warn('Link de CTA placeholder clicado, envio para webhook ignorado.');
                         return;
                     }

                    sendToWebhook({
                        event: 'cta_click',
                        target_url: isExternalLink ? button.href : (button.closest('form')?.id || 'N/A'),
                        button_id: button.id || 'N/A',
                        button_text: button.textContent.trim(),
                        timestamp: new Date().toISOString()
                    });
                }
            });
        });

        // Formulário de E-mail (Mantido)
        const emailForm = document.getElementById('email-form');
        if (emailForm) {
            emailForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const emailInput = document.getElementById('email-input');
                const email = emailInput ? emailInput.value : 'N/A';

                try {
                    localStorage.setItem('submittedEmail', email);
                } catch (storageError) { console.error('Erro ao salvar email no localStorage:', storageError); }

                const submitData = {
                    event: 'email_submit',
                    email: email,
                    form_id: 'email-form',
                    timestamp: new Date().toISOString()
                };

                sendToWebhook(submitData);
                sendToGoogleSheet(submitData);

                alert('Obrigado por se inscrever! Seu Guia será baixado/aberto agora.');
                if(emailInput) emailInput.value = '';

                const ebookLink = 'https://drive.google.com/file/d/1n7s4FiiXFrKOAn-_kcLOQm-bsGz-kv1u/view?usp=drive_link';
                if (ebookLink && ebookLink !== '#') {
                    setTimeout(() => { window.location.href = ebookLink; }, 300);
                } else {
                    console.warn('Link do eBook não configurado no formulário de email.');
                }
            });
        }
    } // Fim setupPage()

    setupPage();

    // --- LÓGICA DO CHAT AI FLUTUANTE (ATUALIZADA) ---
    // (Lógica dos botões persistentes)
    const aiChatPanel = document.getElementById('ai-chat-panel');
    const aiChatBtn = document.getElementById('ai-chat-btn');
    const aiChatCloseBtn = document.getElementById('ai-chat-close-btn');
    const aiChatDisplay = document.getElementById('ai-chat-display');
    const aiChatInput = document.getElementById('ai-chat-input');
    const aiChatSubmit = document.getElementById('ai-chat-submit');
    const quickQuestionsContainer = document.getElementById('ai-quick-questions');

    function toggleChatPanel() {
        aiChatPanel.classList.toggle('active');
        if(aiChatPanel.classList.contains('active')) {
            aiChatInput.focus();
        }
    }

    /**
     * (ATUALIZADO) Adiciona mensagem ao chat E move os botões rápidos para o fim.
     */
    function addMessageToChat(message, sender = 'ai', options = {}) {
        const { isHtml = false, isTyping = false } = options;
        
        if (!aiChatDisplay) return;
        
        // Remove indicador de "digitando" anterior, se houver
        const existingTypingIndicator = aiChatDisplay.querySelector('.ai-message.typing');
        if (existingTypingIndicator) {
            existingTypingIndicator.remove();
        }

        const messageElement = document.createElement('p');
        messageElement.classList.add(sender === 'user' ? 'user-message' : 'ai-message');

        if (isTyping) {
            messageElement.classList.add('typing');
            messageElement.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
        } else if (isHtml) {
            messageElement.innerHTML = message;
        } else {
            messageElement.textContent = message;
        }
        
        // Lógica para manter os botões no final
        // Insere a nova mensagem ANTES do container dos botões
        if (quickQuestionsContainer) {
            aiChatDisplay.insertBefore(messageElement, quickQuestionsContainer);
        } else {
            aiChatDisplay.appendChild(messageElement);
        }
        
        aiChatDisplay.scrollTop = aiChatDisplay.scrollHeight;
        return messageElement;
    }

    /**
     * (ATUALIZADO) Gerencia o envio da query para o orquestrador.
     */
    async function handleChatSubmit(queryOverride = null) {
        if (!aiChatInput || !aiChatSubmit) return;
        const userQuery = queryOverride || aiChatInput.value.trim();
        if (!userQuery) return;

        addMessageToChat(userQuery, 'user');
        if(!queryOverride) aiChatInput.value = '';
        aiChatInput.disabled = true;
        aiChatSubmit.disabled = true;
        
        // UX de carregamento no botão
        aiChatSubmit.innerHTML = '<span class="typing-dot" style="background-color: #fff;"></span><span class="typing-dot" style="background-color: #fff;"></span><span class="typing-dot" style="background-color: #fff;"></span>';

        const typingIndicator = addMessageToChat("", 'ai', { isTyping: true });

        // Chama o orquestrador (que agora chama o /api/chat se necessário)
        const { response, isHtml } = await handleChatOrchestration(userQuery);

        if (typingIndicator) {
            typingIndicator.remove();
        }
        addMessageToChat(response, 'ai', { isHtml });

        aiChatInput.disabled = false;
        aiChatSubmit.disabled = false;
        aiChatSubmit.innerHTML = 'Enviar'; // Restaura o botão
        aiChatInput.focus();
    }

    if (aiChatBtn) aiChatBtn.addEventListener('click', toggleChatPanel);
    if (aiChatCloseBtn) aiChatCloseBtn.addEventListener('click', toggleChatPanel);
    if (aiChatSubmit) aiChatSubmit.addEventListener('click', () => handleChatSubmit());
    if (aiChatInput) {
        aiChatInput.addEventListener('keypress', function (e) {
             if (e.key === 'Enter' && !aiChatSubmit.disabled) {
                 handleChatSubmit();
             }
        });
    }
    if (quickQuestionsContainer) {
        // Move os botões para o final do chat assim que a página carrega
        aiChatDisplay.appendChild(quickQuestionsContainer);
        
        quickQuestionsContainer.addEventListener('click', function(e) {
             if (e.target.classList.contains('quick-question-btn')) {
                 const question = e.target.textContent;
                 handleChatSubmit(question); // Processa a pergunta do botão
             }
        });
    }
    // --- FIM: LÓGICA DO CHAT AI ---


    // Lógica de Animação de Scroll (Mantida)
    const observer = new IntersectionObserver((entries) => { entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); }); }, { threshold: 0.1 });
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    // Lógica Botão Voltar ao Topo (Mantida)
    const backToTopButton = document.getElementById('back-to-top-btn');
    window.addEventListener('scroll', () => { backToTopButton.classList.toggle('visible', window.scrollY > 300); });

    // Lógica Carrossel (Mantida)
    const carouselWrapper = document.getElementById('carousel-wrapper');
    if(carouselWrapper) {
        const prevBtn = document.getElementById('prev-btn'); const nextBtn = document.getElementById('next-btn'); let autoScrollInterval;
        const getScrollAmount = () => { const card = carouselWrapper.querySelector('.depoimento-card'); if (!card) return 300; const gap = parseInt(window.getComputedStyle(carouselWrapper).gap) || 32; return card.offsetWidth + gap; };
        const scrollNext = () => { if (!carouselWrapper) return; if (carouselWrapper.scrollLeft + carouselWrapper.clientWidth >= carouselWrapper.scrollWidth - 1) { carouselWrapper.scrollTo({ left: 0, behavior: 'smooth' }); } else { carouselWrapper.scrollBy({ left: getScrollAmount(), behavior: 'smooth' }); } };
        const scrollPrev = () => { if (!carouselWrapper) return; if (carouselWrapper.scrollLeft <= 0) { carouselWrapper.scrollTo({ left: carouselWrapper.scrollWidth, behavior: 'smooth' }); } else { carouselWrapper.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' }); } };
        const startAutoScroll = () => { if (!autoScrollInterval) { autoScrollInterval = setInterval(scrollNext, 4000); } }; const stopAutoScroll = () => { clearInterval(autoScrollInterval); autoScrollInterval = null; };
        if (nextBtn) nextBtn.addEventListener('click', () => { stopAutoScroll(); scrollNext(); startAutoScroll(); });
        if (prevBtn) prevBtn.addEventListener('click', () => { stopAutoScroll(); scrollPrev(); startAutoScroll(); });
        carouselWrapper.addEventListener('mouseenter', stopAutoScroll); carouselWrapper.addEventListener('mouseleave', startAutoScroll); startAutoScroll();
     }

    // Lógica Modal de Vídeo (Mantida)
    const playDemoBtn = document.getElementById('play-demo-video-btn');
    const videoModal = document.getElementById('video-modal'); 
    const closeModalBtn = document.getElementById('close-modal-btn'); 
    const modalVideoLocal = document.getElementById('modal-video-local'); 
    const modalVideoYoutube = document.getElementById('modal-video-youtube');
    
    function openModal() {
         const videoSrc = pageConfig.demoVideo.src; if (!videoSrc) { console.error('Fonte do vídeo de demonstração não definida.'); return; }
         if (modalVideoLocal) modalVideoLocal.style.display = 'none';
         if (modalVideoYoutube) modalVideoYoutube.style.display = 'none';
         const videoData = getVideoEmbedUrl(videoSrc);
         if (videoData) {
             if (videoData.type === 'iframe') { if(modalVideoYoutube) {modalVideoYoutube.src = `${videoData.src}?autoplay=1&rel=0`; modalVideoYoutube.style.display = 'block';} }
             else { if(modalVideoLocal) {modalVideoLocal.src = videoData.src; modalVideoLocal.muted = false; modalVideoLocal.style.display = 'block'; modalVideoLocal.currentTime = 0; modalVideoLocal.play().catch(e => console.error("Erro ao tentar tocar vídeo no modal:", e));} }
             if(videoModal) videoModal.classList.add('active');
         } else { console.error("Não foi possível processar a URL do vídeo de demonstração:", videoSrc); }
    }
    function closeModal() {
         if(videoModal) videoModal.classList.remove('active');
         if (modalVideoLocal) { modalVideoLocal.pause(); modalVideoLocal.src = ''; }
         if (modalVideoYoutube) { try { if (modalVideoYoutube.contentWindow) modalVideoYoutube.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*'); } catch(e) { console.warn("Não foi possível pausar o vídeo do YouTube via postMessage."); } setTimeout(() => { if(modalVideoYoutube) modalVideoYoutube.src = ''; }, 300); }
    }
    if (playDemoBtn) playDemoBtn.addEventListener('click', openModal); 
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (videoModal) { videoModal.addEventListener('click', (event) => { if (event.target === videoModal) closeModal(); }); }

    // --- LÓGICA DA CALCULADORA INTELIGENTE (COM IMC) ---
    // (Esta lógica está 100% mantida)
    const calculadoraForm = document.getElementById('calculadora-form');
    const resultadoDiv = document.getElementById('resultado-calculadora');
    if (calculadoraForm && resultadoDiv) {
        calculadoraForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // 1. Coleta de dados
            const nome = document.getElementById('calc-nome').value.trim();
            const idade = parseInt(document.getElementById('calc-idade').value);
            const altura = parseInt(document.getElementById('calc-altura').value);
            const peso = parseFloat(document.getElementById('calc-peso').value);
            const nivelTreino = document.getElementById('calc-treino').value;
            const usouRemedio = document.getElementById('calc-remedio').value;
            const querSuplemento = document.getElementById('calc-suplemento').value;
            const saudeGeral = document.getElementById('calc-saude').value.trim();

            if (!nome || isNaN(idade) || isNaN(altura) || isNaN(peso) || !nivelTreino || !usouRemedio || !querSuplemento) {
                alert('Por favor, preencha todos os campos obrigatórios corretamente.');
                return;
            }

            // 2. Cálculos (Estimativas + NOVO Cálculo de IMC)
            const aguaLitros = (peso * 35 / 1000).toFixed(1);
            const proteinaG = Math.round(peso * 2);
            const gorduraG = Math.round(peso * 0.8);
            const carboidratoG = Math.round(peso * 2);

            const alturaM = altura / 100;
            const imc = (peso / (alturaM * alturaM)).toFixed(1);

            const resultadosCalculo = {
                agua_litros: aguaLitros,
                proteina_g: proteinaG,
                gordura_g: gorduraG,
                carboidrato_g: carboidratoG,
                imc: imc 
            };

            // 3. Lógica de Avaliação de Peso Corporal (IMC)
            let imcMessage = '';
            let statusClass = 'status-sucesso';

            if (imc < 18.5) {
                imcMessage = `<p><strong>Atenção:</strong> Seu IMC (${imc}) indica que você está abaixo do peso ideal. Nossas estimativas podem precisar de ajuste. É fundamental focar em ganhar massa com qualidade.</p>`;
                statusClass = 'status-aviso';
            } else if (imc >= 18.5 && imc <= 24.9) {
                imcMessage = `<p><strong>Parabéns!</strong> Seu IMC (${imc}) está na faixa ideal. Nossas estimativas são um ótimo ponto de partida para você "secar" e definir!</p>`;
                statusClass = 'status-sucesso';
            } else if (imc >= 25 && imc <= 29.9) {
                imcMessage = `<p><strong>Alerta:</strong> Seu IMC (${imc}) indica que você está acima do peso (sobrepeso). Nossas estimativas focam no déficit calórico para iniciar a queima de gordura.</p>`;
                statusClass = 'status-aviso';
            } else { // imc >= 30
                imcMessage = `<p><strong>Alerta de Saúde:</strong> Seu IMC (${imc}) está na faixa de obesidade. O foco total deve ser no déficit calórico e no aumento da atividade física. Recomendamos procurar um profissional.</p>`;
                statusClass = 'status-alerta';
            }

            // 4. Envio de Webhooks (Incluindo IMC)
            const dataToSend = {
                event: 'calculadora_submit',
                form_id: 'calculadora-form',
                nome: nome,
                idade: idade,
                altura_cm: altura,
                peso_kg: peso,
                nivel_treino: nivelTreino,
                usou_remedio: usouRemedio,
                quer_suplemento: querSuplemento,
                saude_geral: saudeGeral,
                resultado: resultadosCalculo,
                timestamp: new Date().toISOString()
            };
            
            try {
                localStorage.setItem('calculatorData', JSON.stringify(dataToSend));
            } catch (storageError) { console.error('Erro ao salvar dados da calculadora no localStorage:', storageError); }

            sendToWebhook(dataToSend);
            sendToGoogleSheet(dataToSend);
            
            // 5. Lógica de Exibição (ATUALIZADA com IMC e Status)
            let resultadoHTML = `<p>Olá, <strong>${nome}</strong>!</p>`;
            resultadoHTML += imcMessage; 
            resultadoHTML += `<p>Com base nos seus dados, aqui estão suas <strong>estimativas</strong> diárias:</p>
                              <ul>
                                <li>💧 <strong>Água:</strong> ${resultadosCalculo.agua_litros} L</li>
                                <li>🍗 <strong>Proteínas:</strong> ${resultadosCalculo.proteina_g}g</li>
                                <li>🥑 <strong>Gorduras:</strong> ${resultadosCalculo.gordura_g}g</li>
                                <li>🍚 <strong>Carboidratos:</strong> ${resultadosCalculo.carboidrato_g}g</li>
                              </ul>`;
            
            if (querSuplemento === 'sim' || querSuplemento === 'talvez') {
                 resultadoHTML += `<p><strong>Obrigado!</strong> Como você demonstrou interesse em suplementos, confira as recomendações de curadoria na seção <strong>"Suplementação Inteligente"</strong> acima.</p>`;
            } else {
                 resultadoHTML += `<p><strong>Obrigado!</strong> Suas metas foram calculadas. Lembre-se de anotá-las e rolar para baixo para baixar seu Guia Gratuito.</p>`;
            }

            resultadoDiv.innerHTML = resultadoHTML;
            resultadoDiv.classList.remove('status-sucesso', 'status-aviso', 'status-alerta');
            resultadoDiv.classList.add(statusClass);
            resultadoDiv.style.display = 'block';
            void resultadoDiv.offsetWidth;
            resultadoDiv.classList.add('visible');
            resultadoDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

        });
    }

}); // Fim DOMContentLoaded
