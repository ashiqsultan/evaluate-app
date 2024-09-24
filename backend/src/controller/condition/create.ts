import { Request, Response, NextFunction } from 'express';
import IAppRes from '../../types/IAppRes';
import createCondition from '../../service/condition/create';

const send400Response = (res: Response, message: string): void => {
  const response: IAppRes = {
    data: message,
    isError: true,
  };
  res.status(400).send(response);
};

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reqData = {
      questionId: req.body.questionId || null,
      conditionText: req.body.conditionText || null,
    };

    if (
      typeof reqData.conditionText === 'string' &&
      reqData.conditionText.length > 0 &&
      typeof reqData.questionId === 'string' &&
      reqData.questionId.length > 0
    ) {
      const createOperation = await createCondition(reqData);
      const response: IAppRes = { data: createOperation, isError: false };
      res.send(response);
      return;
    } else {
      send400Response(res, 'questionId and conditionText are required');
      return;
    }
  } catch (error) {
    next(error);
  }
};
