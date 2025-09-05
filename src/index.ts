import Koa from 'koa';
import Router from '@koa/router';
import cors from '@koa/cors';
import rootRouter from './routes/index';
import { bodyParser } from '@koa/bodyparser';

const app = new Koa();
const router = new Router();

app
  .use(cors())
  .use(bodyParser())
  .use(rootRouter.routes())
  .use(router.allowedMethods());

const port = process.env.SERVER_PORT || 3000;

app.listen(port).on('listening', () => {
  console.log(`Server started on port ${port}`);
});