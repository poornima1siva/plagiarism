import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../shared/database";

export async function updatedocument(id: string, updateData: Record<string, any>) {
    const db = await connectToDatabase();

    try {
        if (!ObjectId.isValid(id)) {
            return { success: false, message: "Invalid ID format." };
        }

        // Ensure _id is not modified
        if ('_id' in updateData) {
            delete updateData._id;
        }

        // Proceed with the update
        const result = await db.collection("documents").updateOne(
            { _id: new ObjectId(id) }, 
            { $set: updateData } 
        );

        if (result.matchedCount > 0) {
            return { success: true, message: "document updated successfully." };
        } else {
            return { success: false, message: "document not found." };
        }
    } catch (error) {
        console.error('❌ Error updating document:', error);
        return { success: false, message: "An error occurred while updating the document.", error };
    }
}
