import { Request, Response, NextFunction } from 'express';
import IAppRes from '../../types/IAppRes';
import createQuestion from '../../service/question/create';

const send400Response = (res: Response, message: string): void => {
  const response: IAppRes = {
    data: message,
    isError: true,
  };
  res.status(400).send(response);
};

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reqData: any = {
      requestId: req.body.requestId || null,
      questionText: req.body.questionText || null,
    };

    if (
      typeof reqData.questionText === 'string' &&
      reqData.questionText.length > 0
    ) {
      const createOperation = await createQuestion(reqData);
      const response: IAppRes = { data: createOperation, isError: false };
      res.send(response);
      return;
    } else {
      send400Response(res, 'questionText is required');
      return;
    }
  } catch (error) {
    next(error);
  }
};
