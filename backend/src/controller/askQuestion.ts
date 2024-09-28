import { Request, Response, NextFunction } from 'express';
import IAppRes from '../types/IAppRes';
import getOneQuestion from '../service/question/getOne';

const send400Response = (res: Response, message: string): void => {
  const response: IAppRes = {
    data: message,
    isError: true,
  };
  res.status(400).send(response);
};
const askQuestion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // get questionId from path param
    const questionId = req?.params?.questionId;
    // validate questionId
    if (typeof questionId !== 'string' || questionId.length < 1) {
      send400Response(res, 'Invalid questionId');
      return;
    }
    // get question
    const question = await getOneQuestion(questionId);
    if (!question) {
      send400Response(res, 'question not found');
    }
    if (!question.request?.id) {
      send400Response(res, 'No request associated with this question.');
    }
    // Main
    const request = question.request;
    // Get Answer
    // TODO: Call request and get answer
    const response: IAppRes = { data: question, isError: false };
    res.send(response);
    return;
  } catch (error) {
    next(error);
  }
};

export default askQuestion;
