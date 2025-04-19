import { OpenAI } from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function getEmbedding(text: string): Promise<number[]> {
    const response = await openai.embeddings.create({
        model: 'text-embedding-3-small', // More accurate than word-level comparison
        input: text
    });
    

    return response.data[0].embedding;
}

export function cosineSimilarity(vec1: number[], vec2: number[]): number {
    const dotProduct = vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
    const mag1 = Math.sqrt(vec1.reduce((sum, val) => sum + val * val, 0));
    const mag2 = Math.sqrt(vec2.reduce((sum, val) => sum + val * val, 0));

    return mag1 && mag2 ? dotProduct / (mag1 * mag2) : 0;
}

