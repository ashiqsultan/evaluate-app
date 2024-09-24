import { Router } from 'express';
import pong from '../controller/pong';
import createRequest from '../controller/request/create';
import createQuestion from '../controller/question/create';
import createCondition from '../controller/condition/create';

let routes = Router();

// Health check route. Returns 200
routes.get('/ping', pong);
routes.post('/request', createRequest);
routes.post('/question', createQuestion);
routes.post('/condition', createCondition);

export default routes;
