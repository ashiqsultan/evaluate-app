import { eq } from 'drizzle-orm';
import { response } from '../../db/schema';
import db from '../../db';

async function getManyByQuestionId(questionId: string) {
  try {
    const responses = await db
      .select()
      .from(response)
      .where(eq(response.questionId, questionId));

    return responses;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default getManyByQuestionId;
