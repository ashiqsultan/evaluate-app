import { eq } from 'drizzle-orm';
import db from '../../db';
import { request, RequestInsertSchema } from '../../db/schema';

const updateRequest = async (
  id: string,
  data: RequestInsertSchema
): Promise<RequestInsertSchema> => {
  try {
    if (!id) {
      throw new Error('Request ID is required');
    }
    const { name, verb, url, headers, body, pathParams, queryParams } = data;

    const updatedRequest = await db
      .update(request)
      .set({
        name,
        verb,
        url,
        headers,
        body,
        pathParams,
        queryParams,
      })
      .where(eq(request.id, id))
      .returning();

    if (!updatedRequest.length) {
      throw new Error('Error in updatedRequest. sql returned null');
    }

    return updatedRequest[0];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default updateRequest;
