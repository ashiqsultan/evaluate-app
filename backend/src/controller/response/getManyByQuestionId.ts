import { Request, Response, NextFunction } from 'express';
import IAppRes from '../../types/IAppRes';
import getManyByQuestionId from '../../service/response/getManyByQuestionId';

const sendErrRes = (res: Response, message: string, status = 400): void => {
  const response: IAppRes = {
    data: message,
    isError: true,
  };
  res.status(status).send(response);
  return;
};

const getManyByQuestionIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const questionId = req.params.questionId;
    if (!questionId) {
      sendErrRes(res, 'questionId is required');
      return;
    }
    const data = await getManyByQuestionId(questionId);
    const response: IAppRes = { data: data, isError: false };
    res.send(response);
  } catch (error: any) {
    next(error);
  }
};

export default getManyByQuestionIdController;
