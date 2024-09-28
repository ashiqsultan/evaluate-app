import apiService from '../util/apiService';
import { RequestSchema } from '../db/schema';

const getAnswerForQuestion = async (questionId: string, requestId: string) => {
  try {
    //  TODO: Get Request data from table
    //  TODO: Get Question data from table
    const testData: RequestSchema = {
      id: '',
      name: 'Test Request',
      url: 'https://succqdbuhw57ytxeohmhfsc3ey0ndulb.lambda-url.ap-south-1.on.aws/chat',
      verb: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: { msg: 'What locations are available in dirt game' },
      queryParams: { some_id: '12345', foo: 'bar' },
      pathParams: {},
    };
    const response = await apiService(testData);
    // TODO; store the response in table
  } catch (error) {
    throw error;
  }
};

export default getAnswerForQuestion;
