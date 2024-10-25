import { Request, Response, NextFunction } from 'express';
import IAppRes from '../../types/IAppRes';
import getAllQuestion from '../../service/question/getAll';

export default async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const question = await getAllQuestion();
    const response: IAppRes = { data: question, isError: false };
    res.send(response);
  } catch (error: any) {
    next(error);
  }
};
