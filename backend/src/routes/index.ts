import { Router } from 'express';
import pong from '../controller/pong';
import createOrUpdateReq from '../controller/request/createOrUpdate';
import getOneReq from '../controller/request/getOne';
import createOrUpdateQuestion from '../controller/question/createOrUpdate';
import getOneQuestion from '../controller/question/getOne';
import createCondition from '../controller/condition/create';
import getManyByQuestionId from '../controller/condition/getManyByQuestionId';
import askQuestion from '../controller/askQuestion';

let routes = Router();

// Health check route. Returns 200
routes.get('/ping', pong);
routes.post('/request', createOrUpdateReq);
routes.put('/request', createOrUpdateReq);
routes.get('/request/:id', getOneReq);
routes.post('/question', createOrUpdateQuestion);
routes.put('/question', createOrUpdateQuestion);
routes.get('/question/:id', getOneQuestion);
routes.post('/condition', createCondition);
routes.get('/condition/question/:questionId', getManyByQuestionId);

routes.get('/ask-question/:questionId', askQuestion);
// routes.post('/test-question/:questionId', pong);

export default routes;
