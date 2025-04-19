import { google } from "googleapis";
import path from "path";

export const auth = new google.auth.GoogleAuth({
    keyFile: path.join(__dirname, "../../service-account.json"), // Adjust the path if needed
    scopes: ["https://www.googleapis.com/auth/classroom.courses.readonly"],
});

export const classroom = google.classroom({ version: "v1", auth });
