import { z } from 'zod';
import { connectToDatabase } from '../../shared/database';
import { documents } from './document-type';
import{Db} from 'mongodb';
const documentSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }), 
  image: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: 'Description is required' }), 
});

export async function Createdocument(data:documents) {
    const db = await connectToDatabase();
    const document = await db.collection('documents').insertOne(data); // Update database and collection names 
    return document;
}

const validateCourseInput = (data: documents) => {
    try {
      documentSchema.parse(data);
    } catch (e) {
      if (e instanceof z.ZodError) {
        console.error('Validation errors:', e.errors);
        throw new Error(JSON.stringify(e.errors))
      } else {
        console.error('Unknown error', e);
        throw new Error(JSON.stringify(e))
      }
    }
};