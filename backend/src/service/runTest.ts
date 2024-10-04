import validateTestData from '../helpers/validateTestData';
import getTestData from './getTestData';
const runTest = async (questionId: string) => {
  try {
    const testData = await getTestData(questionId);
    const errorsArr = validateTestData(testData);
    if (errorsArr.length > 0) {
      throw {
        id: 'invalid-test-data',
        status: 400,
        message: 'Invalid test data',
        errors: errorsArr.join(', '),
      };
    } else {
      // TODO: Call Python test api to run the test
      return testData;
    }
  } catch (error) {
    throw error;
  }
};

export default runTest;
