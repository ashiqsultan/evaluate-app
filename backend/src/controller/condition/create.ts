import { Request, Response, NextFunction } from 'express';
import IAppRes from '../../types/IAppRes';
import createCondition from '../../service/condition/create';
import updateCondition from '../../service/condition/update';

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
      const id = req.body.id;
      if (!id || req.method === 'POST') {
        const createOperation = await createCondition(reqData);
        const response: IAppRes = { data: createOperation, isError: false };
        res.send(response);
        return;
      }
      // Update
      if (id) {
        const updateOperation = await updateCondition(id, reqData);
        const response: IAppRes = { data: updateOperation, isError: false };
        res.send(response);
        return;
      }
      throw new Error(
        'Error in Create Question Controller. No DB Operation Performed'
      );
    } else {
      send400Response(res, 'questionId and conditionText are required');
      return;
    }
  } catch (error) {
    next(error);
  }
};
