import natural from "natural";

export function cosineSimilarity(text1: string, text2: string): number {
    const tokenizer = new natural.WordTokenizer();
    const words1 = tokenizer.tokenize(text1.toLowerCase());
    const words2 = tokenizer.tokenize(text2.toLowerCase());

    const allWords = Array.from(new Set([...words1, ...words2]));
    
    const vector1 = allWords.map(word => words1.filter(w => w === word).length);
    const vector2 = allWords.map(word => words2.filter(w => w === word).length);

    const dotProduct = vector1.reduce((sum, val, i) => sum + val * vector2[i], 0);
    const magnitude1 = Math.sqrt(vector1.reduce((sum, val) => sum + val * val, 0));
    const magnitude2 = Math.sqrt(vector2.reduce((sum, val) => sum + val * val, 0));

    return magnitude1 && magnitude2 ? dotProduct / (magnitude1 * magnitude2) : 0;
}
