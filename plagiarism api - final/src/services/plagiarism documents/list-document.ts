import { connectToDatabase } from '../../shared/database';
import { classroom } from '../../shared/database';
export async function documentList() {
    const db = await connectToDatabase();
    try{
        const documents = await db.collection('documents').find().toArray();
        return documents;
    }catch(error){
        console.error('Error Fetching Error', error);
        throw new Error('Failed to fetch documents');
    }

}