import { eq } from 'drizzle-orm';
import db from '../../db';
import { request, RequestSchema } from '../../db/schema';

const getOne = async (id: string): Promise<RequestSchema | null> => {
  try {
    if (!id) throw new Error('Request ID is required');

    const data = await db.select().from(request).where(eq(request.id, id));

    if (!data?.[0]) {
      return null;
    }

    return data[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default getOne;
