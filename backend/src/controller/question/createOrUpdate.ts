import { Request, Response, NextFunction } from 'express';
import IAppRes from '../../types/IAppRes';
import createQuestion from '../../service/question/create';
import updateQuestion from '../../service/question/update';

const send400Response = (res: Response, message: string): void => {
  const response: IAppRes = {
    data: message,
    isError: true,
  };
  res.status(400).send(response);
  return;
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
      const id = req.body.id;

      if (!id || req.method === 'POST') {
        const createOperation = await createQuestion(reqData);
        const response: IAppRes = { data: createOperation, isError: false };
        res.send(response);
        return;
      }
      // Update
      if (id) {
        const updateOperation = await updateQuestion(id, reqData);
        const response: IAppRes = { data: updateOperation, isError: false };
        res.send(response);
        return;
      }
      throw new Error(
        'Error in Create Question Controller. No DB Operation Performed'
      );
    } else {
      send400Response(res, 'questionText is required');
      return;
    }
  } catch (error) {
    next(error);
  }
};
