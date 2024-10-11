import { Request, Response, NextFunction } from 'express';
import IAppRes from '../../types/IAppRes';
import getOneRequest from '../../service/request/getOne';

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
    const getOneOperation = await getOneRequest(id);
    const response: IAppRes = { data: getOneOperation, isError: false };
    res.send(response);
  } catch (error: any) {
    if (error.name === 'NotFound') {
      sendErrRes(res, error.message, 404);
      return;
    }
    if (error.name === 'BadRequest') {
      sendErrRes(res, error.message, 400);
      return;
    }

    next(error);
  }
};
