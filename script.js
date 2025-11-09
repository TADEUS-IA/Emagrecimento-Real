/* ======================================================================
 * --- CONFIGURAÇÃO GLOBAL DA PÁGINA ---
 * ======================================================================
 */
const pageConfig = {
    // Webhooks (Mantidos)
    n8nWebhookUrl: 'https://automacoe-n8n.bitxsu.easypanel.host/webhook-test/n8n',
    googleSheetWebhookUrl: 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL', // <<<----- SUBSTITUA PELA URL DO SEU GOOGLE APPS SCRIPT WEB APP

    // Vídeos (Mantidos)
    headerVideo: { src: 'https://www.youtube.com/watch?v=qLjl9V0uXzA' },
    demoVideo: { src: 'https://www.youtube.com/watch?v=gwbasDmCDp0' },
    
    // Links Estratégicos (Mantidos)
    calculatorUrl: '#calculadora', // Link para a calculadora
    ebookCtaId: '#cta',        // ID da seção de captura de e-mail

    // --- (ATUALIZADO) CHAVES DAS APIs DE IA ---
    // Claude foi removido e DeepSeek foi adicionado. Os 5 slots Groq permanecem.
    apiKeys: {
        GEMINI: 'SUA_CHAVE_API_GEMINI_AQUI', 
        OPENAI: 'SUA_CHAVE_API_OPENAI_AQUI', 
        DEEPSEEK: 'SUA_CHAVE_API_DEEPSEEK_AQUI', // NOVO
        GROQ_1: 'SUA_CHAVE_API_GROQ_1_AQUI',
        GROQ_2: 'SUA_CHAVE_API_GROQ_2_AQUI',
        GROQ_3: 'SUA_CHAVE_API_GROQ_3_AQUI',
        GROQ_4: 'SUA_CHAVE_API_GROQ_4_AQUI',
        GROQ_5: 'SUA_CHAVE_API_GROQ_5_AQUI' 
    }
};

/* ======================================================================
 * --- INÍCIO: "CÉREBRO" DE IA E ORQUESTRAÇÃO (ATUALIZADO) ---
 * ======================================================================
 */

/**
 * NÍVEL 1: Cérebro Interno (Base de Conhecimento Local)
 * Este é o "prompt" que define a personalidade e o conhecimento base do agente.
 */
const internalKnowledgeBase = `
    Olá! Sou o assistente virtual do método Emagrecimento Real. Estou aqui para te ajudar a entender nossa filosofia e tirar todas as suas dúvidas. Nossa filosofia é baseada em 100% de honestidade e ciência. Não acreditamos em milagres. Estamos aqui para ajudar mulheres que estão cansadas de promessas vazias, dietas malucas, cápsulas mágicas, chás milagrosos e "gurus" que não praticam o que pregam. Este método é para quem quer parar de tentar e começar a evoluir de verdade. O que funciona é a trindade da transformação: Ciência, Consistência e Paciência.

    Sobre o início do processo: A verdade que ninguém conta é que nos primeiros 20 a 30 dias, a maior parte do peso perdido é retenção líquida, não gordura. Nessa fase inicial, seu corpo está se adaptando à nova rotina e desinchando. É uma vitória, mas é apenas o começo.

    Sobre a queima de gordura real: A perda de gordura efetiva, aquela que muda o espelho, começa depois dessa fase inicial de 30 dias. A queima de gordura real é ativada pela constância na dieta e pela intensidade no treino.

    Sobre quanto tempo leva para ver resultados: Você começará a ver mudanças notáveis no espelho e nas roupas entre 60 e 90 dias de foco total. Uma transformação profunda e sustentável, onde sua mente e corpo realmente mudam, geralmente leva 120 dias ou mais. É importante entender que o processo de emagrecimento não é linear. Haverá altos e baixos, e isso é perfeitamente normal.

    Sobre o Pilar 1: A Dieta. A dieta é o motor da sua evolução. É o combustível certo para a sua máquina. Não trate a dieta como uma prisão ou um vilão. Ela é sua aliada. A regra de ouro do nosso método é: Constância é mais importante que perfeição. Nos primeiros 30 dias, foque em ter o máximo de disciplina de segunda a sexta. O fim de semana é consequência. É crucial priorizar o consumo de proteínas em todas as suas refeições. A proteína dá saciedade e constrói músculos. Fibras, vindas de vegetais e frutas, e o consumo adequado de água são essenciais para o funcionamento do intestino e para a saciedade. Recomendamos um bom nutricionista, mas temos uma regra: escolha um profissional que viva o que ensina. Você não está "de dieta", você está em um processo de "reconstrução" do seu corpo e da sua mente.

    Sobre o Pilar 2: A Academia (Treino). A academia é o seu canteiro de obras. É lá que você esculpe seu novo corpo. Você precisa treinar com propósito e intensidade, não apenas "matar tempo" ou socializar. O celular é o maior vilão do seu foco na academia. Deixe-o guardado. Se você precisa de música, use um relógio ou coloque o celular no modo avião. Ritmo, intensidade e suor são o que aceleram o metabolismo. O treino intenso ativa o glicogênio muscular e força o corpo a usar a gordura armazenada como fonte de energia.

    Sobre o Pilar 3: Suplementação Inteligente. Suplementos são aliados estratégicos, mas eles não fazem milagres sozinhos. Suplementos não substituem o esforço do treino e a disciplina da dieta. Para quem está começando, os suplementos ideais são Whey Protein e Creatina. O Whey Protein ajuda na recuperação muscular pós-treino e facilita a construção de massa magra, o que acelera o metabolismo. A Creatina é fundamental para manter a força e o desempenho, mesmo quando você está em déficit calórico (comendo menos). Sobre termogênicos: Eles podem dar um empurrãozinho na queima de gordura, mas devem ser usados com muita cautela e sempre associados a treino e dieta. Evite produtos milagrosos ou "fórmulas secretas" da internet. A maioria não tem respaldo científico e pode prejudicar seu metabolismo. A fórmula real do sucesso é simples: Treino Certo + Dieta Ajustada + Suplementos Confiáveis.

    Sobre a Mentalidade e Foco (Mindset). Sua mentalidade é o que realmente muda o jogo. Você não precisa de sorte, precisa de estratégia. Você não precisa de milagres, precisa de consistência. A nova seção "Foco Total" é sobre isso: a academia é lugar de treinar. Não perca seu tempo precioso de treino tirando fotos no espelho da academia. Documente sua evolução tirando fotos em casa, uma vez por semana, sempre no mesmo horário e com a mesma roupa. As redes sociais podem ser uma distração enorme no início do processo. Foque em você, não em provar algo para os outros.

    Sobre a Calculadora de Metas: A Calculadora de Metas Nutricionais na página é a nossa ferramenta gratuita para te dar um ponto de partida personalizado. Ela calcula estimativas de consumo diário de água (em litros), proteínas (em gramas), gorduras boas (em gramas) e carboidratos (em gramas). Para usar a calculadora, pedimos seu nome, idade, altura, peso e seu nível de treino (iniciante, intermediário ou avançado). Também perguntamos se você já usou remédio para emagrecer ou se tem vontade de usar suplemento, para entendermos melhor seu perfil. IMPORTANTE: Os resultados da calculadora são apenas estimativas e não substituem, de forma alguma, uma consulta com um nutricionista ou médico. Use-os como um guia inicial.

    Sobre a Oferta Principal (Guia Gratuito): A oferta principal desta página é o acesso ao Guia de Emagrecimento Real e à Lista Exclusiva, que é 100% GRATUITO. Para receber o Guia, basta preencher seu melhor e-mail no formulário da seção "CTA" no final da página. O Guia inclui dicas práticas de alimentação, estratégias de treino, foco mental e uma lista de suplementos confiáveis.

    Sobre Garantia e Objeções (Seus Medos): Objeção: "Já tentei de tudo e nada funcionou para mim." Resposta: Nós entendemos perfeitamente sua frustração. A maioria das dietas falha por serem restritivas demais ou genéricas. Nosso método foca em sustentabilidade e na criação de hábitos realistas que se encaixam na sua rotina. Nós não vendemos soluções temporárias, vendemos reeducação.

    Objeção: "Eu não tenho tempo para cozinhar ou treinar." Resposta: O segredo não é ter mais tempo, é usar o tempo de forma inteligente. Ensinamos estratégias para refeições rápidas (como batch cooking ou preparo semanal) e treinos eficientes que se encaixam até nas agendas mais corridas. 45 minutos de treino focado valem mais que 2 horas de distração.

    Objeção: "Tenho medo de falhar de novo e me frustrar." Resposta: Esse medo é a razão pela qual o acompanhamento e o foco na mentalidade são pilares do nosso método. Você não estará sozinha. Vamos trabalhar para construir sua confiança e resiliência, celebrando cada pequena vitória. O fracasso só existe para quem desiste.

    Sobre a Garantia: Em nossos programas pagos (que podem ser oferecidos após o cadastro), oferecemos uma Garantia Incondicional de 7 Dias. Se você entrar no programa e achar que não é para você nos primeiros 7 dias, devolvemos 100% do seu investimento. Sem perguntas, sem burocracia. O risco é todo nosso.

    Sobre a Criadora e os Depoimentos: Temos depoimentos reais de alunas como a Ana B. (mãe e profissional), a Carla M. (estudante) e a Sofia R. (empreendedora). Elas são pessoas reais, com rotinas reais, que também duvidaram e hoje inspiram outras mulheres com suas transformações. A criadora do método, [Nome da Mentora/Coach], já esteve exatamente onde você está. Ela lutou contra a balança, a frustração e as promessas vazias. Por isso, ela criou um método realista, baseado em ciência e focado em resultados duradouros. A promessa dela é: sem fórmulas mágicas. Apenas orientação honesta, prática e eficaz para você finalmente alcançar seus objetivos.

    Ações e Contato: Para começar sua jornada gratuita, o primeiro passo é usar nossa Calculadora de Metas Nutricionais, que está aqui mesmo nesta página, mais para baixo. ⬇️ Ela vai te dar estimativas de calorias e macros para você começar com o pé direito! Se preferir, pode também se cadastrar no formulário no final da página para receber o Guia Gratuito. Se você tiver dúvidas urgentes ou quiser falar sobre os programas pagos, pode clicar no botão flutuante do WhatsApp para falar diretamente com nossa equipe. A decisão de começar é hoje. Não espere a segunda-feira, o próximo mês ou o "momento perfeito". Ele não existe.

    Eu sou seu assistente virtual e fui programado com todas essas informações. Estou aqui para ajudar a esclarecer qualquer um desses pontos. Basta perguntar.
    ${document.body.innerText || ''}
`;

/**
 * NÍVEL 1: Agente Interno (queryInternalKnowledge)
 * Processa a query contra a base de conhecimento local e metas estratégicas.
 * Retorna 'null' se não encontrar uma resposta boa o suficiente.
 */
function queryInternalKnowledge(query) {
    const lowerQuery = query.toLowerCase().trim();
    if (!lowerQuery) return "Por favor, digite sua pergunta.";

    // --- 1. Triage: Saudações (Empatia) ---
    const greetings = ['oi', 'olá', 'ola', 'bom dia', 'boa tarde', 'boa noite', 'e aí', 'eae', 'tudo bem', 'tudo bom'];
    const isGreeting = greetings.some(greeting => lowerQuery === greeting || lowerQuery.startsWith(greeting + ' ') || lowerQuery.startsWith(greeting + '!'));

    if (isGreeting) {
        const greetingResponses = [
            "Olá! Como posso te ajudar hoje sobre o Emagrecimento Real?",
            "Oi! 😊 Em que posso ser útil?",
            "Opa! Tudo bem? Me diga como posso auxiliar com sua jornada de emagrecimento.",
            "Olá! Pronto para tirar suas dúvidas sobre o método?"
        ];
        return greetingResponses[Math.floor(Math.random() * greetingResponses.length)];
    }
    
    // --- 2. Triage: Metas Estratégicas (Induzimento) ---
    const closeChatOnNav = `onclick="document.getElementById('ai-chat-close-btn').click()"`;

    // Induzir à CALCULADORA
    const calcKeywords = ['calculadora', 'calcular', 'meta', 'imc', 'peso', 'água', 'proteína', 'calorias'];
    if (calcKeywords.some(word => lowerQuery.includes(word))) {
        return `Claro! A melhor forma de começar é pela nossa <strong>Calculadora de Metas</strong>. Ela vai te dar estimativas de água, proteínas e calorias.<br><br>Você pode acessá-la <a href="${pageConfig.calculatorUrl}" ${closeChatOnNav}>clicando aqui</a>!`;
    }

    // Induzir ao EBOOK
    const ebookKeywords = ['ebook', 'guia', 'gratuito', 'e-book', 'email', 'cadastrar', 'receber o guia'];
    if (ebookKeywords.some(word => lowerQuery.includes(word))) {
        return `O <strong>Guia de Emagrecimento Real</strong> é 100% gratuito! Você pode recebê-lo agora mesmo.<br><br>Basta rolar até a seção final da página e deixar seu e-mail <a href="${pageConfig.ebookCtaId}" ${closeChatOnNav}>clicando neste link</a>.`;
    }

    // --- 3. Triage: Busca no Conhecimento Local (Keyword search) ---
    const cleanQuery = lowerQuery.replace(/[.,!?;:]/g, '').replace(/\s+/g, ' ');
    const queryWords = cleanQuery.split(' ').filter(word => word.length > 2);
    if (lowerQuery.includes('ia')) queryWords.push('ia');
    if (lowerQuery.includes('imc')) queryWords.push('imc');
    
    const cleanBaseText = internalKnowledgeBase.toLowerCase().replace(/[.,!?;:]/g, '').replace(/\s+/g, ' ');
    const sentences = cleanBaseText.split(/[.\n।?]+/).map(s => s.trim()).filter(s => s.length > 15);

    let bestMatch = null;
    let maxMatchScore = 0;

    for (const sentence of sentences) {
        if (sentence.length < 10) continue;
        let currentMatchScore = 0;
        let matchedWords = new Set();
        for (const word of queryWords) {
            const regex = new RegExp(`\\b${word}\\b`);
            if (regex.test(sentence) && !matchedWords.has(word)) {
                currentMatchScore += 1;
                matchedWords.add(word);
            }
        }
        const relevance = queryWords.length > 0 ? currentMatchScore / queryWords.length : 0;
        
        const originalSentenceFind = internalKnowledgeBase.split(/[.\n।?]/).find(orig => orig.toLowerCase().includes(sentence.substring(0, 20).trim()));
        if (originalSentenceFind && originalSentenceFind.toLowerCase().includes(lowerQuery)) {
             currentMatchScore += 2; // Bônus por correspondência exata
        }

        if (relevance > maxMatchScore) {
            maxMatchScore = relevance;
            bestMatch = (originalSentenceFind || sentence).trim();
        } else if (relevance > 0 && maxMatchScore === 0) {
            bestMatch = (originalSentenceFind || sentence).trim();
            maxMatchScore = relevance;
        }
    }

    // --- 4. Verificação de Relevância ---
    if (bestMatch && maxMatchScore > 0.1) {
        let finalResponse = bestMatch.replace(/\(Assistente simples\)/i, '').trim();
        return finalResponse.length > 350 ? finalResponse.substring(0, 347) + '...' : finalResponse;
    }

    // --- 5. Triage: Falha (Sinaliza para o Orquestrador) ---
    return null; 
}


/* ======================================================================
 * --- NÍVEL 2: Funções das APIs Externas (Simuladas) ---
 * ======================================================================
 */

/**
 * Simulação de chamada à API do Google Gemini.
 * Retorna `null` se a API falhar ou não estiver configurada.
 */
async function callGeminiAPI(query) {
    const apiKey = pageConfig.apiKeys.GEMINI;
    if (!apiKey || apiKey === 'SUA_CHAVE_API_GEMINI_AQUI') {
        console.warn("API Key do Gemini não configurada. Pulando...");
        return null;
    }
    
    await new Promise(resolve => setTimeout(resolve, 1200)); 
    
    // LÓGICA DE FETCH REAL (EXEMPLO COMENTADO):
    /*
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `Responda como um especialista em emagrecimento, de forma curta e direta (máx 3 frases): ${query}` }] }]
            })
        });
        if (!response.ok) throw new Error('Falha na resposta do Gemini');
        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        console.error("Erro ao chamar API do Gemini:", error);
        return null; // Falha na API, permite o fallback
    }
    */
    
    console.log("Orquestrador: Usando Gemini (simulado)");
    return `(Resposta simulada do Gemini) Para a sua pergunta sobre "${query}", a resposta é...`;
}

/**
 * Simulação de chamada à API do OpenAI (ChatGPT).
 * Retorna `null` se a API falhar ou não estiver configurada.
 */
async function callOpenAIAPI(query) {
    const apiKey = pageConfig.apiKeys.OPENAI;
    if (!apiKey || apiKey === 'SUA_CHAVE_API_OPENAI_AQUI') {
        console.warn("API Key do OpenAI não configurada. Pulando...");
        return null;
    }
    
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    // LÓGICA DE FETCH REAL (EXEMPLO COMENTADO):
    /*
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "Você é um especialista em emagrecimento. Responda em 3 frases." },
                    { role: "user", content: query }
                ]
            })
        });
        if (!response.ok) throw new Error('Falha na resposta do OpenAI');
        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error("Erro ao chamar API do OpenAI:", error);
        return null;
    }
    */
    
    console.log("Orquestrador: Usando OpenAI (simulado)");
    return `(Resposta simulada do OpenAI) Sobre "${query}", o processamento indica que...`;
}

/**
 * (NOVO) Simulação de chamada à API do DeepSeek.
 * Substitui o Claude.
 * Retorna `null` se a API falhar ou não estiver configurada.
 */
async function callDeepSeekAPI(query) {
    const apiKey = pageConfig.apiKeys.DEEPSEEK;
    if (!apiKey || apiKey === 'SUA_CHAVE_API_DEEPSEEK_AQUI') {
        console.warn("API Key do DeepSeek não configurada. Pulando...");
        return null;
    }
    
    await new Promise(resolve => setTimeout(resolve, 1200));

    // LÓGICA DE FETCH REAL (EXEMPLO COMENTADO - API DeepSeek é compatível com OpenAI):
    /*
    try {
        const response = await fetch('https://api.deepseek.com/chat/completions', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "deepseek-chat", // Modelo padrão da DeepSeek
                messages: [
                    { role: "system", content: "Você é um especialista em emagrecimento. Responda em 3 frases." },
                    { role: "user", content: query }
                ]
            })
        });
        if (!response.ok) throw new Error('Falha na resposta do DeepSeek');
        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error("Erro ao chamar API do DeepSeek:", error);
        return null;
    }
    */
    
    console.log("Orquestrador: Usando DeepSeek (simulado)");
    return `(Resposta simulada do DeepSeek) Analisando "${query}", a perspectiva é...`;
}

/**
 * Simulação de chamada à API do Groq (x5).
 * Esta função agora aceita a chave e o nome para reutilização.
 * Retorna `null` se a API falhar ou não estiver configurada.
 */
async function callGroqAPI(query, apiKey, apiName = "Groq") {
    if (!apiKey || apiKey.startsWith('SUA_CHAVE_API_GROQ')) {
        console.warn(`API Key do ${apiName} não configurada. Pulando...`);
        return null;
    }

    await new Promise(resolve => setTimeout(resolve, 800)); // Groq é rápido, simulamos menos delay
    
    // LÓGICA DE FETCH REAL (EXEMPLO COMENTADO):
    /*
    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "llama3-8b-8192", // Exemplo de modelo rápido no Groq
                messages: [
                    { role: "system", content: "Você é um especialista em emagrecimento. Responda em 3 frases." },
                    { role: "user", content: query }
                ]
            })
        });
        if (!response.ok) throw new Error(`Falha na resposta do ${apiName}`);
        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error(`Erro ao chamar API do ${apiName}:`, error);
        return null;
    }
    */
    
    console.log(`Orquestrador: Usando ${apiName} (simulado)`);
    return `(Resposta simulada do ${apiName}) De forma rápida, sobre "${query}": ...`;
}


/**
 * (ATUALIZADO) NÍVEL 3: Orquestrador de IA
 * Gerencia o fallback:
 * 1. Tenta Cérebro Interno
 * 2. Tenta Gemini
 * 3. Tenta OpenAI
 * 4. Tenta DeepSeek (substituindo Claude)
 * 5. Tenta Groq (x5)
 * 6. Falha e redireciona para o WhatsApp
 */
async function handleChatOrchestration(query) {
    
    // 1. Tenta o Cérebro Interno (Rápido e Gratuito)
    let response = queryInternalKnowledge(query);
    if (response) {
        console.log("Orquestrador: Resposta encontrada no Cérebro Interno.");
        const isHtml = response.includes('<a href=') || response.includes('<strong>');
        return { response, isHtml };
    }

    // 2. Fallback para IAs Externas
    console.log("Orquestrador: Cérebro interno não encontrou. Tentando IAs externas...");

    // A ordem de fallback, agora com DeepSeek
    const apiCallChain = [
        { name: "Gemini", func: () => callGeminiAPI(query) },
        { name: "OpenAI", func: () => callOpenAIAPI(query) },
        { name: "DeepSeek", func: () => callDeepSeekAPI(query) }, // SUBSTITUÍDO
        { name: "Groq 1", func: () => callGroqAPI(query, pageConfig.apiKeys.GROQ_1, "Groq 1") },
        { name: "Groq 2", func: () => callGroqAPI(query, pageConfig.apiKeys.GROQ_2, "Groq 2") },
        { name: "Groq 3", func: () => callGroqAPI(query, pageConfig.apiKeys.GROQ_3, "Groq 3") },
        { name: "Groq 4", func: () => callGroqAPI(query, pageConfig.apiKeys.GROQ_4, "Groq 4") },
        { name: "Groq 5", func: () => callGroqAPI(query, pageConfig.apiKeys.GROQ_5, "Groq 5") }
    ];

    for (const api of apiCallChain) {
        response = await api.func();
        if (response) { // Se a API retornar uma resposta (não nula)
            console.log(`Orquestrador: Resposta obtida via ${api.name}.`);
            return { response, isHtml: false }; // Respostas de API são sempre texto puro
        }
    }

    // 3. Resposta final de fallback (WhatsApp) se todas as IAs falharem
    console.log("Orquestrador: Todas as IAs falharam ou estão desconfiguradas. Redirecionando para WhatsApp.");
    const whatsappLink = "https://wa.me/message/DQJBWVDS3BJ4N1"; // Link do HTML
    return {
        response: `Puxa, essa é uma ótima pergunta que eu (ainda) não sei responder! 🤔<br><br>Que tal falar diretamente com nossa equipe de especialistas no <a href="${whatsappLink}" target="_blank">WhatsApp</a>? Eles vão te ajudar!`,
        isHtml: true
    };
}
// --- FIM: "CÉREBRO" DE IA E ORQUESTRAÇÃO ---


/* ======================================================================
 * --- INÍCIO: LÓGICA DO DOCUMENTO (Listeners e Funções) ---
 * (Esta parte permanece idêntica à versão anterior, apenas colada)
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
    const aiChatPanel = document.getElementById('ai-chat-panel');
    const aiChatBtn = document.getElementById('ai-chat-btn');
    const aiChatCloseBtn = document.getElementById('ai-chat-close-btn');
    const aiChatDisplay = document.getElementById('ai-chat-display');
    const aiChatInput = document.getElementById('ai-chat-input');
    const aiChatSubmit = document.getElementById('ai-chat-submit');
    const quickQuestionsContainer = document.getElementById('ai-quick-questions');
    let firstUserInteraction = true;

    function toggleChatPanel() {
        aiChatPanel.classList.toggle('active');
        if(aiChatPanel.classList.contains('active')) {
            aiChatInput.focus();
            if(firstUserInteraction && quickQuestionsContainer) {
                quickQuestionsContainer.style.display = 'flex';
            }
        }
    }

    /**
     * Adiciona mensagem ao chat, com suporte a HTML e indicador de "digitando".
     */
    function addMessageToChat(message, sender = 'ai', options = {}) {
        const { isHtml = false, isTyping = false } = options;
        
        if (!aiChatDisplay) return;
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
        
        aiChatDisplay.appendChild(messageElement);
        aiChatDisplay.scrollTop = aiChatDisplay.scrollHeight;
        return messageElement;
    }

    /**
     * Gerencia o envio da query para o orquestrador.
     */
    async function handleChatSubmit(queryOverride = null) {
        if (!aiChatInput || !aiChatSubmit) return;
        const userQuery = queryOverride || aiChatInput.value.trim();
        if (!userQuery) return;

        if(firstUserInteraction && quickQuestionsContainer) {
            quickQuestionsContainer.style.display = 'none';
            firstUserInteraction = false;
        }

        addMessageToChat(userQuery, 'user');
        if(!queryOverride) aiChatInput.value = '';
        aiChatInput.disabled = true;
        aiChatSubmit.disabled = true;
        aiChatSubmit.textContent = '...';

        const typingIndicator = addMessageToChat("", 'ai', { isTyping: true });

        // Chama o orquestrador
        const { response, isHtml } = await handleChatOrchestration(userQuery);

        if (typingIndicator) {
            typingIndicator.remove();
        }
        addMessageToChat(response, 'ai', { isHtml });

        aiChatInput.disabled = false;
        aiChatSubmit.disabled = false;
        aiChatSubmit.textContent = 'Enviar';
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

    // --- (ATUALIZADO) LÓGICA DA CALCULADORA INTELIGENTE (COM IMC) ---
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

            // Cálculo do IMC
            const alturaM = altura / 100;
            const imc = (peso / (alturaM * alturaM)).toFixed(1);

            const resultadosCalculo = {
                agua_litros: aguaLitros,
                proteina_g: proteinaG,
                gordura_g: gorduraG,
                carboidrato_g: carboidratoG,
                imc: imc 
            };

            // 3. (NOVO) Lógica de Avaliação de Peso Corporal (IMC)
            let imcMessage = '';
            let statusClass = 'status-sucesso'; // Padrão

            if (imc < 18.5) {
                imcMessage = `<p><strong>Atenção:</strong> Seu IMC (${imc}) indica que você está abaixo do peso ideal. Nossas estimativas podem precisar de ajuste. É fundamental focar em ganhar massa com qualidade.</p>`;
                statusClass = 'status-aviso';
            } else if (imc >= 18.5 && imc <= 24.9) {
                // Mensagem "está bom, mas dá para melhorar e ficar seca"
                imcMessage = `<p><strong>Parabéns!</strong> Seu IMC (${imc}) está na faixa ideal. Nossas estimativas são um ótimo ponto de partida para você "secar" e definir!</p>`;
                statusClass = 'status-sucesso';
            } else if (imc >= 25 && imc <= 29.9) {
                // Alerta claro para "acima do peso"
                imcMessage = `<p><strong>Alerta:</strong> Seu IMC (${imc}) indica que você está acima do peso (sobrepeso). Nossas estimativas focam no déficit calórico para iniciar a queima de gordura.</p>`;
                statusClass = 'status-aviso';
            } else { // imc >= 30
                // Alerta claro para "acima do peso" (obesidade)
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
            
            // Adiciona a mensagem de status do IMC primeiro
            resultadoHTML += imcMessage; 
            
            // Adiciona as metas nutricionais
            resultadoHTML += `<p>Com base nos seus dados, aqui estão suas <strong>estimativas</strong> diárias:</p>
                              <ul>
                                <li>💧 <strong>Água:</strong> ${resultadosCalculo.agua_litros} L</li>
                                <li>🍗 <strong>Proteínas:</strong> ${resultadosCalculo.proteina_g}g</li>
                                <li>🥑 <strong>Gorduras:</strong> ${resultadosCalculo.gordura_g}g</li>
                                <li>🍚 <strong>Carboidratos:</strong> ${resultadosCalculo.carboidrato_g}g</li>
                              </ul>`;
            
            // Lógica de Upsell contextual (Mantida)
            if (querSuplemento === 'sim' || querSuplemento === 'talvez') {
                 resultadoHTML += `<p><strong>Obrigado!</strong> Como você demonstrou interesse em suplementos, confira as recomendações de curadoria na seção <strong>"Suplementação Inteligente"</strong> acima.</p>`;
            } else {
                 resultadoHTML += `<p><strong>Obrigado!</strong> Suas metas foram calculadas. Lembre-se de anotá-las e rolar para baixo para baixar seu Guia Gratuito.</p>`;
            }

            // Atualiza o DOM e aplica a classe de status
            resultadoDiv.innerHTML = resultadoHTML;
            
            // Gerencia as classes de status
            resultadoDiv.classList.remove('status-sucesso', 'status-aviso', 'status-alerta');
            resultadoDiv.classList.add(statusClass);

            resultadoDiv.style.display = 'block';
            void resultadoDiv.offsetWidth; // Força o reflow para a animação
            resultadoDiv.classList.add('visible');
            resultadoDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });

        });
    }

}); // Fim DOMContentLoaded