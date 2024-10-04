import validateTestData from '../helpers/validateTestData';
import getTestData from './getTestData';
import evaluationApi from '../util/evaluationApi';

const runEvaluationByQuestionId = async (questionId: string) => {
  try {
    const testData = await getTestData(questionId);
    const errorsArr = validateTestData(testData);
    if (errorsArr.length > 0) {
      throw {
        id: 'invalid-test-data',
        status: 400,
        message: `Invalid test data: ${errorsArr.join(', ')}`,
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
    throw error;
  }
};

export default runEvaluationByQuestionId;
