import apiService from '../util/apiService';
import { RequestSchema, Question } from '../db/schema';
import replaceQuestionPlaceholder from '../helpers/replaceQuestionPlaceholder';

const getAnswer = async (
  question: Question,
  request: RequestSchema
): Promise<string> => {
  try {
    const newRequest = replaceQuestionPlaceholder(
      request,
      question.questionText
    );
    const response = await apiService(newRequest);
    const stringifiedResponse = JSON.stringify(response);
    return stringifiedResponse;
  } catch (error) {
    throw error;
  }
};

export default getAnswer;
