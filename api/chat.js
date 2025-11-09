/* ======================================================================
 * --- BACKEND: VERCEL SERVERLESS FUNCTION (NODE.JS) ---
 * Arquivo: /api/chat.js
 * * Esta é a nossa "ponte" segura. Ela roda nos servidores da Vercel,
 * lê as chaves de API secretas (Environment Variables) e faz as
 * chamadas reais para as IAs, gerenciando o fallback.
 * ======================================================================
 */

// Esta função helper fará as chamadas reais de API
// Usamos o padrão compatível com OpenAI para DeepSeek e Groq
async function callChatAPI(endpoint, apiKey, model, query) {
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}` // Padrão OpenAI/Groq/DeepSeek
            },
            body: JSON.stringify({
                model: model,
                messages: [
                    { role: "system", content: "Você é um especialista em emagrecimento. Responda em 3 frases." },
                    { role: "user", content: query }
                ]
            })
        });

        if (!response.ok) {
            // Se falhar, loga o erro no servidor e retorna null
            console.error(`Falha na API: ${endpoint} - Status: ${response.status}`);
            return null;
        }

        const data = await response.json();
        return data.choices[0].message.content;

    } catch (error) {
        console.error(`Erro de rede ao chamar ${endpoint}:`, error.message);
        return null; // Permite o fallback
    }
}

// A função do Gemini tem um formato de corpo (body) ligeiramente diferente
async function callGeminiAPI(apiKey, query) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `Responda como um especialista em emagrecimento, de forma curta e direta (máx 3 frases): ${query}` }] }]
            })
        });

        if (!response.ok) {
            console.error(`Falha na API: Gemini - Status: ${response.status}`);
            return null;
        }

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;

    } catch (error) {
        console.error("Erro de rede ao chamar Gemini:", error.message);
        return null;
    }
}


// --- O HANDLER PRINCIPAL DA VERCEL ---
// A Vercel executará esta função a cada chamada para /api/chat
export default async function handler(req, res) {
    // 1. Validar a Requisição
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Método não permitido' });
    }
    const { query } = req.body;
    if (!query) {
        return res.status(400).json({ error: 'Query (pergunta) é obrigatória' });
    }

    // 2. Ler as Chaves de API com segurança (do painel Vercel)
    // Elas NUNCA saem do servidor.
    const apiKeys = {
        GEMINI: process.env.GEMINI_API_KEY,
        OPENAI: process.env.OPENAI_API_KEY,
        DEEPSEEK: process.env.DEEPSEEK_API_KEY,
        GROQ_1: process.env.GROQ_1_API_KEY,
        GROQ_2: process.env.GROQ_2_API_KEY,
        GROQ_3: process.env.GROQ_3_API_KEY,
        GROQ_4: process.env.GROQ_4_API_KEY,
        GROQ_5: process.env.GROQ_5_API_KEY,
    };

    // 3. Definir a Cadeia de Fallback (Orquestração)
    // O sistema tentará em ordem. Se um falhar ou estiver sem chave, tenta o próximo.
    const fallbackChain = [
        { name: "Gemini",   apiKey: apiKeys.GEMINI,   func: (q) => callGeminiAPI(apiKeys.GEMINI, q) },
        { name: "OpenAI",   apiKey: apiKeys.OPENAI,   func: (q) => callChatAPI('https://api.openai.com/v1/chat/completions', apiKeys.OPENAI, 'gpt-3.5-turbo', q) },
        { name: "DeepSeek", apiKey: apiKeys.DEEPSEEK, func: (q) => callChatAPI('https://api.deepseek.com/chat/completions', apiKeys.DEEPSEEK, 'deepseek-chat', q) },
        { name: "Groq 1",   apiKey: apiKeys.GROQ_1,   func: (q) => callChatAPI('https://api.groq.com/openai/v1/chat/completions', apiKeys.GROQ_1, 'llama3-8b-8192', q) },
        { name: "Groq 2",   apiKey: apiKeys.GROQ_2,   func: (q) => callChatAPI('https://api.groq.com/openai/v1/chat/completions', apiKeys.GROQ_2, 'llama3-8b-8192', q) },
        { name: "Groq 3",   apiKey: apiKeys.GROQ_3,   func: (q) => callChatAPI('https://api.groq.com/openai/v1/chat/completions', apiKeys.GROQ_3, 'llama3-8b-8192', q) },
        { name: "Groq 4",   apiKey: apiKeys.GROQ_4,   func: (q) => callChatAPI('https://api.groq.com/openai/v1/chat/completions', apiKeys.GROQ_4, 'llama3-8b-8192', q) },
        { name: "Groq 5",   apiKey: apiKeys.GROQ_5,   func: (q) => callChatAPI('https://api.groq.com/openai/v1/chat/completions', apiKeys.GROQ_5, 'llama3-8b-8192', q) },
    ];

    // 4. Executar a Cadeia de Fallback
    for (const api of fallbackChain) {
        // Pula se a chave de API não foi configurada
        if (!api.apiKey || api.apiKey.includes('SUA_CHAVE_API')) {
            console.log(`Pulando ${api.name}: Chave não configurada.`);
            continue;
        }

        console.log(`Orquestrador (Backend): Tentando ${api.name}...`);
        const responseText = await api.func(query);

        if (responseText) {
            console.log(`Orquestrador (Backend): Resposta obtida via ${api.name}.`);
            // Sucesso! Retorna a resposta da IA para o frontend
            return res.status(200).json({ response: responseText });
        }
    }

    // 5. Resposta de Falha Total
    // Se todas as IAs falharem (sem chave ou erro de rede)
    console.error("Orquestrador (Backend): Todas as IAs falharam.");
    return res.status(503).json({ error: "Todos os assistentes de IA estão indisponíveis no momento." });
}