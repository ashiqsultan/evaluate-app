import { Request, Response, NextFunction } from 'express';
import IAppRes from '../types/IAppRes';
import getOneQuestion from '../service/question/getOne';
import getAnswer from '../service/getAnswer';

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
    const questionData = await getOneQuestion(questionId);
    if (!questionData) {
      send400Response(res, 'question not found');
      return;
    }
    if (!questionData.request?.id) {
      send400Response(res, 'No request associated with this question.');
      return;
    }
    const request = questionData.request;
    const answer = await getAnswer(questionData.question, request);
    // TODO: Store answer in DB
    if (!answer) {
      send400Response(res, 'No answer found');
      return;
    }
    // TODO: Call request and get answer
    const response: IAppRes = { data: questionData, isError: false };
    res.send(response);
    return;
  } catch (error) {
    next(error);
  }
};

export default askQuestion;
