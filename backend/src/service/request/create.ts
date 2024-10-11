import db from '../../db';
import { request } from '../../db/schema';

type NewRequest = typeof request.$inferInsert;

// Create a new request
const createRequest = async (data: NewRequest): Promise<NewRequest> => {
  try {
    const { name, verb, url, headers, body, pathParams, queryParams } = data;
    const newRequest = await db
      .insert(request)
      .values({
        name,
        verb,
        url,
        headers,
        body,
        pathParams,
        queryParams,
      })
      .returning();
    return newRequest[0];
  } catch (error) {
    throw error;
  }
};

export default createRequest;
