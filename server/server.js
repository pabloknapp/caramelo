import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.OPENROUTER_API_KEY;
const MODEL = "openai/gpt-oss-120b:free";

if (!API_KEY) {
    console.error("Erro: configure OPENROUTER_API_KEY no arquivo .env.");
    process.exit(1);
}

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.get("/api/status", (req, res) => {
    res.json({ status: "API local funcionando", model: MODEL });
});

app.post("/api/llm", async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!prompt || prompt.trim().length === 0) {
            return res.status(400).json({ erro: "O campo prompt e obrigatorio." });
        }

        if (prompt.length > 2000) {
            return res.status(400).json({ erro: "Limite: 2000 caracteres." });
        }

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:3000",
                "X-OpenRouter-Title": "Chef Caramelo"
            },
            body: JSON.stringify({
                model: MODEL,
                messages: [
                    {
                        role: "system",
                        content: `Você é o Chef Caramelo, um cachorro vira-lata caramelo muito simpático e mestre na cozinha, apaixonado por comida caseira. Você fala de forma descontraída, sempre latindo ('Au au!').
É OBRIGATÓRIO retornar a resposta EXCLUSIVAMENTE no formato JSON válido. O JSON deve conter TODAS as chaves exatas listadas abaixo, sem exceção. Não inclua blocos markdown (como \`\`\`json). Responda apenas com o JSON puro:
{
  "nome_prato": ["String com o nome da receita"],
  "tempo_preparo": ["String com o tempo de preparo médio"],
  "entrada_caramelo": "Uma introdução cômica, no personagem Chef Caramelo, sobre o prato",
  "detalhes_prato": "Algumas curiosidades ou detalhes sobre o prato",
  "ingredientes": ["Lista de strings com os ingredientes e quantidades"],
  "receita": ["Lista de strings com o passo a passo da receita"],
  "dica_do_chefe": "A dica de ouro do Chef para melhorar o prato"

Regras Inquebráveis:
- Retorne TODAS as 7 chaves no JSON.
- Se o usuário não souber o que cozinhar, sugira algo seja simples de preparar com ingredientes acessíveis.
- Apenas responda sobre culinária e receitas. Para outros assuntos, retorne um JSON apenas com a chave 'erro_personagem' contendo uma recusa cômica (ex: 'Au au! Só entendo de panela!').
- Sempre mantenha-se no papel do cachorro Chef Caramelo.
- Sempre priorize culinária brasileira se não houver especificação.
- Priorize receitas caseiras e tradicionais.
- Não invente ou crie receitas que não existam.
- Garanta que a resposta seja um JSON perfeitamente válido.`
                    },
                    {
                        role: "user",
                        content: prompt
                    }
                ],
                temperature: 0.7,
                max_completion_tokens: 1000
            })
        });

        if (!response.ok) {
            const detalhe = await response.text();
            return res.status(502).json({
                erro: "Erro ao consultar o OpenRouter. Tente novamente.",
                status: response.status,
                detalhe
            });
        }

        const data = await response.json();
        const text = data.choices?.[0]?.message?.content;

        if (!text) {
            return res.status(502).json({ erro: "Resposta vazia ou inesperada." });
        }

        let textoLimpo = text.trim();
        if (textoLimpo.startsWith("```json")) {
            textoLimpo = textoLimpo.substring(7);
        } else if (textoLimpo.startsWith("```")) {
            textoLimpo = textoLimpo.substring(3);
        }
        if (textoLimpo.endsWith("```")) {
            textoLimpo = textoLimpo.substring(0, textoLimpo.length - 3);
        }
        textoLimpo = textoLimpo.trim();

        try {
            const receitaAnalisada = JSON.parse(textoLimpo);
            res.json({ modelo: MODEL, receita: receitaAnalisada, uso: data.usage ?? null });
        } catch (parseError) {
            console.error("Erro ao fazer parse do JSON retornado pela LLM:", parseError);
            console.error("Texto bruto retornado:", text);
            return res.status(502).json({
                erro: "A IA retornou um formato inválido. Tente novamente.",
                detalhe: parseError.message,
                raw: text
            });
        }
    } catch (error) {
        res.status(500).json({ erro: "Erro interno no servidor.", detalhe: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});