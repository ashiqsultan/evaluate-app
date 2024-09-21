import { Request, Response, NextFunction } from 'express';
import IAppRes from '../../types/IAppRes';
import createRequest from '../../service/request/create';

/**
 * Function to check if a value is a valid JSON object
 */
const isValidJson = (value: any) => {
  if (typeof value === 'object' && value !== null) {
    try {
      JSON.stringify(value);
      console.log('JSON is valid');
      return true;
    } catch {
      console.log('JSON is INvalid catch');
      return false;
    }
  }
  console.log('JSON is INvalid catch not object');
  return false;
};

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reqdata = {
      verb: req.body.verb || null,
      url: req.body.url || null,
      headers: req.body.headers || null,
      body: req.body.body || null,
      pathParams: req.body.pathParams || null,
      queryParams: req.body.queryParams || null,
    };

    // validate request body
    if (!reqdata.verb || !reqdata.url) {
      const response: IAppRes = {
        data: "'verb' and 'url' are required",
        isError: false,
      };
      res.status(400).send(response);
      return;
    }

    // Validate headers if provided
    if (reqdata.headers && !isValidJson(reqdata.headers)) {
      const response: IAppRes = {
        data: 'Invalid JSON format in headers',
        isError: true,
      };
      res.status(400).send(response);
      return;
    }

    // Validate body if provided
    if (reqdata.body && !isValidJson(reqdata.body)) {
      const response: IAppRes = {
        data: 'Invalid JSON format in body',
        isError: true,
      };
      res.status(400).send(response);
      return;
    }

    // Validate pathParams if provided
    if (reqdata.pathParams && !isValidJson(reqdata.pathParams)) {
      const response: IAppRes = {
        data: 'Invalid JSON format in pathParams',
        isError: true,
      };
      res.status(400).send(response);
      return;
    }

    // Validate queryParams if provided
    if (reqdata.queryParams && !isValidJson(reqdata.queryParams)) {
      const response: IAppRes = {
        data: 'Invalid JSON format in queryParams',
        isError: true,
      };
      res.status(400).send(response);
      return;
    }
    const createOperation = await createRequest(reqdata);
    const response: IAppRes = { data: createOperation, isError: false };
    res.send(response);
  } catch (error) {
    next(error);
  }
};
