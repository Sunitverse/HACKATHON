import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { KNOWLEDGE_BASE } from './src/data/knowledgeBase.ts';
import { getDeterministicRAGResponse } from './src/data/demoCases.ts';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Lazy Google GenAI Client
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    try {
      aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } catch (err) {
      console.error('Failed to initialize GoogleGenAI client:', err);
      aiClient = null;
    }
  }
  return aiClient;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    app: 'IP-SAKTI Sahayak',
    geminiConfigured: Boolean(process.env.GEMINI_API_KEY),
    knowledgeCount: KNOWLEDGE_BASE.length,
    timestamp: new Date().toISOString()
  });
});

// Grounded RAG Chat Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { query, jurisdiction = 'INDIA', language = 'en' } = req.body;
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    const ai = getAIClient();

    // Select candidate sources based on jurisdiction
    const relevantSources = KNOWLEDGE_BASE.filter(k => k.jurisdiction === jurisdiction).slice(0, 4);
    const sourceContextText = relevantSources.map(s => 
      `[${s.id}] Title: ${s.title}\nAuthority: ${s.authority}\nRef: ${s.statutoryRef || ''}\nRule: ${s.keyRule || ''}\nSummary: ${s.content}`
    ).join('\n\n');

    // If Gemini API is configured, generate grounded response
    if (ai && process.env.GEMINI_API_KEY) {
      try {
        const systemPrompt = `You are IP-SAKTI Sahayak, an AI information assistant specializing in Intellectual Property, Traditional Knowledge, Access and Benefit Sharing (ABS), and regulatory guidance related to Ayurveda.
Active Jurisdiction: ${jurisdiction}.
Respond in language code: ${language}.
Always maintain strict separation between Indian (Patents Act 1970, NBA, TKDL, Drugs & Cosmetics Act) and International (WIPO GRATK, PCT, Madrid, Nagoya Protocol, THMPD) regimes.
Rely on the provided retrieved context. Do NOT invent legal provisions or guarantee legal outcomes.
Format your output as valid JSON matching this schema:
{
  "quickAnswer": "short 2-sentence summary",
  "whyItMatters": "detailed explanation of statutory impact",
  "relevantAreas": [{"title": "domain name", "description": "domain analysis", "tag": "category tag"}],
  "potentialConcerns": [{"title": "statutory objection or flag", "description": "explanation", "severity": "LOW"|"MEDIUM"|"HIGH"}],
  "recommendedNextSteps": ["step 1", "step 2", "step 3", "step 4"]
}`;

        const prompt = `User Query: "${query}"

Retrieved Statutory Context:
${sourceContextText}`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: [
            { role: 'user', parts: [{ text: `${systemPrompt}\n\n${prompt}` }] }
          ],
          config: {
            responseMimeType: 'application/json'
          }
        });

        const rawText = response.text || '';
        const parsed = JSON.parse(rawText);

        const deterministic = getDeterministicRAGResponse(query, jurisdiction, language);

        return res.json({
          response: {
            query,
            jurisdiction,
            language,
            quickAnswer: parsed.quickAnswer || deterministic.quickAnswer,
            whyItMatters: parsed.whyItMatters || deterministic.whyItMatters,
            relevantAreas: parsed.relevantAreas || deterministic.relevantAreas,
            potentialConcerns: parsed.potentialConcerns || deterministic.potentialConcerns,
            recommendedNextSteps: parsed.recommendedNextSteps || deterministic.recommendedNextSteps,
            sources: relevantSources,
            confidence: 'HIGH',
            confidenceReason: 'Grounded in retrieved official statutory provisions with Gemini 3.8 Flash synthesis.',
            explainability: deterministic.explainability,
            risks: deterministic.risks,
            timestamp: new Date().toISOString()
          }
        });
      } catch (geminiError) {
        console.warn('Gemini API call failed, falling back to deterministic RAG engine:', geminiError);
      }
    }

    // Deterministic fallback if Gemini is not configured or fails
    const fallbackResponse = getDeterministicRAGResponse(query, jurisdiction, language);
    fallbackResponse.sources = relevantSources;
    return res.json({ response: fallbackResponse });
  } catch (error) {
    console.error('Error in /api/chat:', error);
    return res.status(500).json({ error: 'Internal server error in RAG service' });
  }
});

// Start Server with Vite Middleware
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`IP-SAKTI Sahayak server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
