import { DocumentModel } from "../../models/documentModel";
import { cosineSimilarity } from "../../utils/cosineSimilarity";

export async function checkPlagiarism(newContent: string) {
    try {
        // Fetch all stored documents from MongoDB
        const storedDocs = await DocumentModel.find({});
        
        let results = [];

        for (const doc of storedDocs) {
            const similarity = cosineSimilarity(newContent, doc.content ?? "");

            results.push({
                documentId: doc._id,
                filename: doc.filename,
                similarity: similarity
            });
        }

        return results; // Return similarity results
    } catch (error) {
        console.error("Error in plagiarism check:", error);
        throw error;
    }
}
