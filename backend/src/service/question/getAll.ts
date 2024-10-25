import { desc } from 'drizzle-orm';
import { db } from '../../db'; // adjust this import to your db instance
import { question, Question } from '../../db/schema'; // adjust this import to your schema file

const getAll = async (): Promise<Question[]> => {
  try {
    const questions = await db
      .select()
      .from(question)
      .orderBy(desc(question.updatedAt));
    return questions;
  } catch (error: any) {
    console.error('Error fetching all questions:', error);
    throw error;
  }
};

export default getAll;
