import validateTestData from '../helpers/validateTestData';
import getTestData from './getTestData';
import evaluationApi from '../util/evaluationApi';
import { IConditionEvaluateAPIRes } from '../types/IEvaluateAPIRes';

/**
 * Gets the response and condition for the given questionId and evaluates the answer for each condition.
 * Validates the data before evaluating. Throws an error if any data is missing like empty answer or empty condition.
 */
const evaluateQuestion = async (
  questionId: string
): Promise<IConditionEvaluateAPIRes[]> => {
  try {
    const testData = await getTestData(questionId);
    const errorsArr = validateTestData(testData);
    if (errorsArr.length > 0) {
      throw {
        id: 'invalid-test-data',
        status: 400,
        message: `Cannot Evaluate due to incomplete data, please check the missing data for the question. 
        Errors: ${errorsArr.join(', ')}`,
      };
    } else {
      const toEvalPromises = [];
      for (const conditionItem of testData.conditions) {
        toEvalPromises.push(
          evaluationApi(testData.responseBody, conditionItem.conditionText)
        );
      }
      const evaluationRes = await Promise.all(toEvalPromises);
      return evaluationRes;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default evaluateQuestion;
