import { Router } from 'express';
import pong from '../controller/pong';
import createRequest from '../controller/request/create';

let routes = Router();

// Health check route. Returns 200
routes.get('/ping', pong);
routes.post('/request', createRequest);

export default routes;
