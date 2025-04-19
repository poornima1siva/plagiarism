import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema({
    filename: String,
    content: String
});

export const DocumentModel = mongoose.model("Document", DocumentSchema);
