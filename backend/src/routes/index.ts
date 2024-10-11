import { Router } from 'express';
import pong from '../controller/pong';
import createOrUpdateReq from '../controller/request/createOrUpdate';
import createQuestion from '../controller/question/create';
import createCondition from '../controller/condition/create';
import askQuestion from '../controller/askQuestion';

let routes = Router();

// Health check route. Returns 200
routes.get('/ping', pong);
routes.post('/request', createOrUpdateReq);
routes.put('/request', createOrUpdateReq);
routes.post('/question', createQuestion);
routes.post('/condition', createCondition);

routes.get('/ask-question/:questionId', askQuestion);
// routes.post('/test-question/:questionId', pong);

export default routes;
