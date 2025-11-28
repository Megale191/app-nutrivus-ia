// Nutrivus.IA - OpenAI Integration

import OpenAI from 'openai';
import { NutritionAnalysis } from './types';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Para uso client-side
});

export async function analyzeMealImage(imageBase64: string): Promise<NutritionAnalysis> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Analise esta imagem de refeição e forneça uma análise nutricional detalhada em formato JSON. 
              
              Retorne APENAS um objeto JSON válido com esta estrutura exata:
              {
                "calories": número estimado de calorias totais,
                "protein": gramas de proteína,
                "carbs": gramas de carboidratos,
                "fats": gramas de gorduras,
                "fiber": gramas de fibras,
                "foodItems": array com lista de alimentos identificados,
                "confidence": número de 0 a 100 indicando confiança na análise
              }
              
              Seja preciso e realista nas estimativas nutricionais.`
            },
            {
              type: "image_url",
              image_url: {
                url: imageBase64
              }
            }
          ]
        }
      ],
      max_tokens: 1000,
      response_format: { type: "json_object" }
    });;

    const content = response.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error('Resposta vazia da OpenAI');
    }

    // Parse JSON da resposta
    const analysis = JSON.parse(content) as NutritionAnalysis;
    
    return analysis;
  } catch (error) {
    console.error('Erro ao analisar imagem:', error);
    
    // Retorna análise padrão em caso de erro
    return {
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
      fiber: 0,
      foodItems: ['Erro ao analisar imagem. Verifique sua chave da API OpenAI.'],
      confidence: 0
    };
  }
}

export async function getMealSuggestions(goal: string, preferences: string[]): Promise<string[]> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: `Sugira 5 refeições saudáveis para alguém com objetivo de ${goal} e preferências: ${preferences.join(', ')}. 
          Retorne apenas um array JSON com os nomes das refeições.`
        }
      ],
      max_tokens: 300,
      response_format: { type: "json_object" }
    });

    const content = response.choices[0]?.message?.content;
    if (!content) return [];
    
    const parsed = JSON.parse(content);
    return parsed.meals || parsed.suggestions || Object.values(parsed)[0] || [];
  } catch (error) {
    console.error('Erro ao obter sugestões:', error);
    return [];
  }
}
