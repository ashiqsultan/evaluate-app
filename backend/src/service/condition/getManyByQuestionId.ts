import { eq } from 'drizzle-orm';
import { condition } from '../../db/schema';
import db from '../../db';

async function getManyByQuestionId(questionId: string) {
  try {
    const conditions = await db
      .select({
        id: condition.id,
        questionId: condition.questionId,
        conditionText: condition.conditionText,
      })
      .from(condition)
      .where(eq(condition.questionId, questionId));

    return conditions;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export default getManyByQuestionId;
