import { Request, Response, NextFunction } from 'express';
import IAppRes from '../../types/IAppRes';
import createRequest from '../../service/request/create';
import { RequestInsertSchema } from '../../db/schema';

/**
 * Function to check if a value is a valid JSON object
 */
const isValidJson = (value: any): boolean => {
  if (typeof value === 'object' && value !== null) {
    try {
      JSON.stringify(value);
      return true;
    } catch {
      return false;
    }
  }
  return false;
};

const send400Response = (res: Response, message: string): void => {
  const response: IAppRes = {
    data: message,
    isError: true,
  };
  res.status(400).send(response);
};

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reqdata: RequestInsertSchema = {
      name: req.body.name || null,
      verb: req.body.verb || null,
      url: req.body.url || null,
      headers: req.body.headers || null,
      body: req.body.body || null,
      pathParams: req.body.pathParams || null,
      queryParams: req.body.queryParams || null,
    };

    // Validate request body
    if (!reqdata.verb || !reqdata.url) {
      send400Response(res, "'verb' and 'url' are required");
      return;
    }

    // Validate JSON format for different fields
    const jsonFields = ['headers', 'body', 'queryParams'];
    for (const field of jsonFields) {
      // @ts-ignore
      if (reqdata[field] && !isValidJson(reqdata[field])) {
        send400Response(res, `Invalid JSON format in ${field}`);
        return;
      }
    }

    const createOperation = await createRequest(reqdata);
    const response: IAppRes = { data: createOperation, isError: false };
    res.send(response);
  } catch (error) {
    next(error);
  }
};
