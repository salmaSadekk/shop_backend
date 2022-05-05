import express from 'express';
import products from './routes/product';

const routes = express.Router();

routes.use('/', products);

export default routes;