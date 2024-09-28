import apiService from '../util/apiService';
import { RequestSchema, Question } from '../db/schema';
import replaceQuestionPlaceholder from '../helpers/replaceQuestionPlaceholder';

const getAnswer = async (
  question: Question,
  request: RequestSchema
): Promise<any> => {
  try {
    const newRequest = replaceQuestionPlaceholder(
      request,
      question.questionText
    );
    const response = await apiService(newRequest);
    return response;
  } catch (error) {
    throw error;
  }
};

export default getAnswer;
