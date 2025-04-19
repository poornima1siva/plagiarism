import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { connectToDatabase } from '../shared/database'; 
import { ObjectId } from 'mongodb';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';


require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
let db: any;
const upload = multer(); // Handle files in memory

const port: number = 4091;

const startServer = async () => {
  try {
    const db = await connectToDatabase();
    console.log('✅ Database connected successfully.');

    app.get('/', (req: Request, res: Response) => {
      res.send('Document Management API');
    });


    // Upload document
    app.post('/documents', upload.single('file'), async (req: Request, res: Response): Promise<void> => {
      try {
        if (!req.file) {
          res.status(400).json({ success: false, message: 'No file provided!' });
          return; // Ensure function does not continue
        }
    
        const documentData = {
          name: req.file.originalname,
          data: req.file.buffer, // Store file as buffer
          contentType: req.file.mimetype,
          createdAt: new Date(),
        };
    
        const db = await connectToDatabase();
        const result = await db.collection('documents').insertOne(documentData);
    
        res.json({ success: true, message: 'File uploaded successfully!', documentId: result.insertedId });
      } catch (error) {
        console.error('Error storing file:', error);
        res.status(500).json({ message: 'Failed to store document in MongoDB' });
      }
    }
  
  );
    

    // List all documents
    app.get('/documents', async (req: Request, res: Response) => {
      try {
        const db = await connectToDatabase();
        const documents = await db.collection('documents').find().toArray();
    
        // ✅ Check if `data` exists before calling `.toString()`
        const formattedDocs = documents.map(doc => ({
          ...doc,
          _id: doc._id.toString(),
          data: doc.data ? doc.data.toString() : 'No Data Available' // Handle undefined `data`
        }));
    
        res.json(formattedDocs);
      } catch (error) {
        console.error('Error fetching documents:', error);
        res.status(500).json({ message: 'Failed to fetch documents' });
      }
    });
    


    // Retrieve a specific document
    app.put('/documents/:id', async (req: Request, res: Response): Promise<void> => {
      try {
        const { id } = req.params;
        const updateData = req.body;
    
        const db = await connectToDatabase();
        const result = await db.collection('documents').updateOne(
          { _id: new ObjectId(id) }, // Convert string to ObjectId
          { $set: updateData }
        );
    
        if (result.modifiedCount === 0) {
          res.status(404).json({ message: 'Document not found or no changes made' });
          return;
        }
    
        res.json({ success: true, message: 'Document updated successfully' });
      } catch (error) {
        console.error('Error updating document:', error);
        res.status(500).json({ message: 'Failed to update document' });
      }
    });
    
    // 🟢 DELETE - Remove Document
   

    app.delete('/documents/:id', async (req: Request, res: Response) : Promise<void> => {
        const { id } = req.params;
    
        console.log('🗑️ Received request to delete ID:', id); // Debugging log
    
        // Ensure valid ObjectId before proceeding
        if (!ObjectId.isValid(id)) {
            console.error('❌ Invalid document ID:', id);
            res.status(400).json({ error: 'Invalid document ID' });
        }
    
        try {
            const db = await connectToDatabase();
            const result = await db.collection('documents').deleteOne({ _id: new ObjectId(id) });
    
            if (result.deletedCount === 0) {
                console.warn('⚠️ Document not found:', id);
                res.status(404).json({ error: 'Document not found' });
            }
    
            res.json({ message: '✅ Document deleted successfully' });
        } catch (error) {
            console.error('❌ Error deleting document:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
    
    app.get('/documents', async (req: Request, res: Response) => {
      try {
        const db = await connectToDatabase();
        const documents = await db.collection('documents').find().toArray();
    
        // ✅ Ensure `_id` is a string (MongoDB returns it as an ObjectId)
        const formattedDocs = documents.map(doc => ({
          ...doc,
          _id: doc._id.toString(),
          data: doc.data.toString() // Convert buffer to string for frontend
        }));
    
        res.json(formattedDocs);
      } catch (error) {
        console.error('Error fetching documents:', error);
        res.status(500).json({ message: 'Failed to fetch documents' });
      }
    });
    
    app.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('❌ Failed to connect to the database:', error);
    process.exit(1);
  }
};

startServer();


// Helper to extract text based on file type
async function extractTextFromBuffer(buffer: Buffer, mimeType: string): Promise<string> {
  try {
    if (mimeType === 'application/pdf') {
      const data = await pdfParse(buffer);
      return data.text;
    } else if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const result = await mammoth.extractRawText({ buffer });
      return result.value;
    } else {
      return buffer.toString(); // For text/plain or fallback
    }
  } catch (err) {
    console.error('❌ Error extracting text:', err);
    return '';
  }
}

// Updated /check-plagiarism endpoint
app.post('/check-plagiarism', async (req: Request, res: Response): Promise<void> => {
  const db = await connectToDatabase();
  const { documentId } = req.body;

  if (!ObjectId.isValid(documentId)) {
    res.status(400).json({ error: 'Invalid document ID' });
    return;
  }

  try {
    const targetDoc = await db.collection('documents').findOne({ _id: new ObjectId(documentId) });
    if (!targetDoc) {
      res.status(404).json({ error: 'Document not found' });
      return;
    }

    const allDocuments = await db.collection('documents')
      .find({ _id: { $ne: new ObjectId(documentId) } })
      .toArray();

    // 🟢 Extract text from uploaded buffer depending on type
    const targetText = await extractTextFromBuffer(targetDoc.data.buffer ?? targetDoc.data, targetDoc.contentType);

    const similarities = await Promise.all(allDocuments.map(async (doc) => {
      const compareText = await extractTextFromBuffer(doc.data.buffer ?? doc.data, doc.contentType);
      return {
        comparison: `${targetDoc.name} vs. ${doc.name}`,
        similarity: calculateSimilarity(targetText, compareText)
      };
    }));

    res.json({ similarities });
  } catch (error) {
    console.error('❌ Error checking plagiarism:', error);
    res.status(500).json({ error: 'Error checking plagiarism' });
  }
});





// 🟢 Fixing Similarity Calculation (Ensure String Input)
function calculateSimilarity(text1: string, text2: string): number {
  const words1 = new Set(text1.split(/\s+/));
  const words2 = new Set(text2.split(/\s+/));

  const commonWords = [...words1].filter(word => words2.has(word));
  const similarity = (commonWords.length / Math.max(words1.size, words2.size)) * 100;

  return Math.round(similarity);
}
