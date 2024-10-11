import { eq } from 'drizzle-orm';
import db from '../../db';
import { request, question, Question, RequestSchema } from '../../db/schema';

async function getOne(
  questionId: string
): Promise<{ question: Question; request: RequestSchema | null } | null> {
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
    if (result[0]) {
      return result[0];
    }

    return null;
  } catch (error) {
    console.error('Error fetching question:', error);
    throw error;
  }
}

export default getOne;
