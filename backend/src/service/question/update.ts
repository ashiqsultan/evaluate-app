import { eq } from 'drizzle-orm';
import db from '../../db';
import { question, Question } from '../../db/schema';

type QuestionReturn = Omit<Question, 'requestId' | 'createdAt' | 'updatedAt'>;

const updateQuestion = async (
  id: string,
  data: Question
): Promise<QuestionReturn> => {
  try {
    if (!id) {
      throw {
        status: 400,
        name: 'BadRequest',
        message: 'Question id is required',
      };
    }
    const updatedQuestion = await db
      .update(question)
      .set({
        requestId: data.requestId,
        questionText: data.questionText,
        updatedAt: new Date(),
      })
      .where(eq(question.id, id))
      .returning({
        id: question.id,
        questionText: question.questionText,
      });

    if (updatedQuestion[0]) {
      return updatedQuestion[0];
    }
    throw new Error(
      'Error in Update Question. Update Question command returned empty array'
    );
  } catch (error) {
    throw error;
  }
};

export default updateQuestion;
