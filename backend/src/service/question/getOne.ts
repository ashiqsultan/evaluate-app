import { eq } from 'drizzle-orm';
import db from '../../db';
import { request, question } from '../../db/schema';

async function getOne(questionId: string) {
  try {
    const result = await db
      .select({
        question: question,
        request: request,
      })
      .from(question)
      .leftJoin(request, eq(question.requestId, request.id))
      .where(eq(question.id, questionId))
      .limit(1);
    return result[0] || null;
  } catch (error) {
    console.error('Error fetching question:', error);
    throw error;
  }
}

export default getOne;
