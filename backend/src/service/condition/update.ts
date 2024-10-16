import { eq } from 'drizzle-orm';
import db from '../../db';
import { condition, Condition, ConditionInsertSchema } from '../../db/schema';

type ConditionReturn = Omit<Condition, 'createdAt' | 'updatedAt'>;

const updateCondition = async (
  id: string,
  data: ConditionInsertSchema
): Promise<ConditionReturn> => {
  try {
    if (!id) {
      throw {
        status: 400,
        name: 'BadRequest',
        message: 'Condition id is required',
      };
    }
    const updatedCondition = await db
      .update(condition)
      .set({
        conditionText: data.conditionText,
        updatedAt: new Date(),
      })
      .where(eq(condition.id, id))
      .returning({
        id: condition.id,
        conditionText: condition.conditionText,
        questionId: condition.questionId,
      });

    if (updatedCondition[0]) {
      return updatedCondition[0];
    }
    throw new Error(
      'Error in Update Condition. Update Condition command returned empty array'
    );
  } catch (error) {
    throw error;
  }
};

export default updateCondition;
