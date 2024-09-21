import { Request, Response, NextFunction } from 'express';
import IAppRes from '../../types/IAppRes';
import createRequest from '../../service/request/create';

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { verb, url, headers, body } = req.body;
    // validate request body
    if (!verb || !url) {
      throw new Error('verb and url are required');
    }
    const createOperation = await createRequest({
      verb,
      url,
      headers,
      body,
    });
    const response: IAppRes = { data: createOperation, isError: false };
    res.send(response);
  } catch (error) {
    next(error);
  }
};
