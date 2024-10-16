import { eq } from 'drizzle-orm';
import { condition } from '../../db/schema';
import db from '../../db';

async function getManyByQuestionId(questionId: string) {
  const conditions = await db
    .select({
      id: condition.id,
      questionId: condition.questionId,
      conditionText: condition.conditionText,
    })
    .from(condition)
    .where(eq(condition.questionId, questionId));

  return conditions;
}

export default getManyByQuestionId;
