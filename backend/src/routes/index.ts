import { Router } from 'express';
import pong from '../controller/pong';

let routes = Router();

// Health check route. Returns 200
routes.get('/ping', pong);

export default routes;