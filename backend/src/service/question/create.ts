import db from '../../db';
import { question, Question } from '../../db/schema';

type QuestionReturn = Omit<Question, 'requestId' | 'createdAt' | 'updatedAt'>;

const createQuestion = async (data: Question): Promise<QuestionReturn> => {
  try {
    const createdQuestion = await db
      .insert(question)
      .values({
        requestId: data.requestId,
        questionText: data.questionText,
      })
      .returning({
        id: question.id,
        questionText: question.questionText,
      });
    if (createdQuestion[0]) {
      return createdQuestion[0];
    }
    throw new Error('Error in Create Question Service');
  } catch (error) {
    throw error;
  }
};

export default createQuestion;
