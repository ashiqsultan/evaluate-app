import axios from 'axios';
import { IConditionEvaluateAPIRes } from '../types/IEvaluateAPIRes';
const conditionalEvaluation = async (
  answer: string,
  condition: string
): Promise<IConditionEvaluateAPIRes> => {
  try {
    const response = await axios.post(
      'http://localhost:8000/evaluate/condition',
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
      throw new Error('Error in Conditional Evaluation API Service');
    }
    if (!response.data) {
      throw new Error('Error in Conditional Evaluation API Service');
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default conditionalEvaluation;
