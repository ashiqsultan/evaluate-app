import { eq, sql } from 'drizzle-orm';
import db from '../db';
import { question, condition, response } from '../db/schema';

const getTestData = async (questionId: string) => {
  try {
    const result = await db
      .select({
        questionId: question.id,
        questionText: question.questionText,
        responseBody: response.responseBody,
        conditions: sql<{ id: string; conditionText: string }[] | null>`
        CASE
          WHEN COUNT(${condition.id}) = 0 THEN NULL
          ELSE json_agg(
            json_build_object(
              'id', ${condition.id},
              'conditionText', ${condition.conditionText}
            )
          )
        END
      `.as('conditions'),
      })
      .from(question)
      .leftJoin(response, eq(response.questionId, question.id))
      .leftJoin(condition, eq(condition.questionId, question.id))
      .where(eq(question.id, questionId))
      .groupBy(question.id, question.questionText, response.responseBody)
      .execute();

    if (Array.isArray(result) && result.length > 0) {
      const questionDetails = {
        questionId: result[0].questionId || '',
        questionText: result[0].questionText || '',
        responseBody: result[0].responseBody || '',
        conditions: result[0].conditions || [],
      };
      return questionDetails;
    }
    return {};
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getTestData;
