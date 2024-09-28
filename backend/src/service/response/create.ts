import db from '../../db';
import {
  response,
  ResponseInsertSchema,
  ResponseSchema,
} from '../../db/schema';

type ResponseReturn = Omit<ResponseSchema, 'createdAt' | 'updatedAt'>;

const createResponse = async (
  data: ResponseInsertSchema
): Promise<ResponseReturn> => {
  try {
    const createdResponse = await db.insert(response).values(data).returning({
      id: response.id,
      questionId: response.questionId,
      responseBody: response.responseBody,
      statusCode: response.statusCode,
    });
    if (createdResponse[0]) {
      return createdResponse[0];
    }
    throw new Error('Error in Create Response Service');
  } catch (error) {
    throw error;
  }
};

export default createResponse;
