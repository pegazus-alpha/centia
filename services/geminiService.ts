import { GoogleGenAI, Type } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Tu es "100-Bot", l'assistant interactif de 100% ACADEMY, un centre de formation à Douala, Cameroun. 
Ton but est d'aider les visiteurs à comprendre nos formations en manipulation d'outils IA.

Détails de 100% ACADEMY :
- Localisation : Douala, Cameroun.
- Formations : Développement Web avec IA, Design & Créativité (Midjourney/Canva), Montage Vidéo (Runway/Pika), Data Science.
- Contact WhatsApp : 679910922.
- Ton : Dynamique, professionnel, technologique et encourageant.
- Point important : Les formations ne sont pas gratuites (contrairement à ce que certains peuvent penser), elles sont des investissements pour l'avenir.
- Spécialité Juin 2026 : Une session intensive sur la maîtrise totale de l'écosystème IA.

Réponds de manière concise. Si l'utilisateur veut s'inscrire, suggère-lui de cliquer sur le bouton WhatsApp ou d'utiliser le formulaire.
`;

export const getGeminiChatResponse = async (userMessage: string, history: {role: 'user' | 'model', text: string}[]) => {
  try {
    // Fix: Always use process.env.API_KEY directly for initialization as per @google/genai guidelines.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({ role: h.role, parts: [{ text: h.text }] })),
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
        // Fixed: Removed maxOutputTokens to prevent potential response blocking as per @google/genai guidelines
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Désolé, j'ai une petite interférence dans mes circuits. Peux-tu réessayer ou nous contacter sur WhatsApp au 679910922 ?";
  }
};