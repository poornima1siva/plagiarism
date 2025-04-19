import { MongoClient, Db } from 'mongodb';
import { google } from "googleapis";
import path from 'path';


const MONGODB_URI = "mongodb+srv://zapproject:zap@cluster0.d690f.mongodb.net/";
const DB_NAME = "plagiarism_checker";

export let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<Db> {
    if (cachedDb) {
        console.log("🟢 Using cached database connection");
        return cachedDb;
    }

    try {
        const client = new MongoClient(MONGODB_URI);
        await client.connect();
        const db = client.db(DB_NAME);
        cachedDb = db;

        console.log("✅ Connected to MongoDB:", db.databaseName);
        return db;
    } catch (error) {
        console.error("❌ DB connection failed:", error);
        throw error;
    }
}




export const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, "../../service-account.json"), // Adjust the path if needed
    scopes: ["https://www.googleapis.com/auth/classroom.courses.readonly"],
});

export const classroom = google.classroom({ version: "v1", auth });



