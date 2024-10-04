import axios from 'axios';
import { IConditionEvaluateAPIRes } from '../types/IEvaluateAPIRes';
const evaluationApi = async (
  answer: string,
  condition: string
): Promise<IConditionEvaluateAPIRes> => {
  try {
    console.log('checking condition', condition);
    const response = await axios.post(
      'http://localhost:8000/verify/conditional',
      {
        answer,
        condition,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.status !== 200) {
      throw new Error('Error in Evaluation API Service');
    }
    if (!response.data) {
      throw new Error('Error in Evaluation API Service');
    }
    console.log('checking condition done', condition);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default evaluationApi;
