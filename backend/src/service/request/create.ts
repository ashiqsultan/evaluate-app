import db from '../../db';
import { request } from '../../db/schema';

type NewRequest = typeof request.$inferInsert;

// Create a new request
const createRequest = async (data: NewRequest): Promise<NewRequest> => {
  try {
    const { verb, url, headers, body, pathParams, queryParams } = data;
    const newRequest = await db
      .insert(request)
      .values({
        verb,
        url,
        headers,
        body,
        pathParams,
        queryParams,
      })
      .returning();
    console.log('newRequest');
    console.log(newRequest);
    return newRequest[0];
  } catch (error) {
    throw error;
  }
};

export default createRequest;
