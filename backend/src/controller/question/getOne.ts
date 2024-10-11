import { Request, Response, NextFunction } from 'express';
import IAppRes from '../../types/IAppRes';
import getOneQuestion from '../../service/question/getOne';

const sendErrRes = (res: Response, message: string, status = 400): void => {
  const response: IAppRes = {
    data: message,
    isError: true,
  };
  res.status(status).send(response);
  return;
};

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    if (!id) {
      sendErrRes(res, 'id is required');
      return;
    }
    const question = await getOneQuestion(id);
    const response: IAppRes = { data: question, isError: false };
    res.send(response);
  } catch (error: any) {
    next(error);
  }
};
