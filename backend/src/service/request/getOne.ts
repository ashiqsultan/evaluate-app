import { eq } from 'drizzle-orm';
import db from '../../db';
import { request, RequestSchema } from '../../db/schema';

const getOne = async (id: string): Promise<RequestSchema> => {
  try {
    if (!id) {
      throw {
        status: 400,
        name: 'BadRequest',
        message: 'Request id is required',
      };
    }

    const data = await db.select().from(request).where(eq(request.id, id));

    if (!data?.[0]) {
      throw {
        status: 404,
        name: 'NotFound',
        message: 'Request not found for id: ' + id,
      };
    }

    return data[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getOne;
