import axios from 'axios';
import { ISimilarityEvaluateAPIRes } from '../types/IEvaluateAPIRes';
const conditionalEvaluation = async (
  expected: string,
  actual: string
): Promise<ISimilarityEvaluateAPIRes> => {
  try {
    const response = await axios.post(
      'http://localhost:8000/evaluate/similarity',
      {
        expected,
        actual,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (response.status !== 200) {
      throw new Error('Error in Similarity Evaluation API Service');
    }
    if (!response.data) {
      throw new Error('Error in Similarity Evaluation API Service');
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default conditionalEvaluation;
