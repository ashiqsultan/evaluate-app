import db from '../../db';
import { condition, Condition } from '../../db/schema';

type ConditionCreate = Omit<Condition, 'id' | 'createdAt' | 'updatedAt'>;
type ConditionReturn = Omit<Condition, 'createdAt' | 'updatedAt'>;

const createCondition = async (
  data: ConditionCreate
): Promise<ConditionReturn> => {
  try {
    const createdCondition = await db
      .insert(condition)
      .values({
        questionId: data.questionId,
        conditionText: data.conditionText,
      })
      .returning({
        id: condition.id,
        questionId: condition.questionId,
        conditionText: condition.conditionText,
      });
    if (createdCondition[0]) {
      return createdCondition[0];
    }
    throw new Error('Error in Create Condition Service');
  } catch (error) {
    throw error;
  }
};

export default createCondition;
