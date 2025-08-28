require('dotenv').config();
import Koa from 'koa';

const app = new Koa();

app.use(async ctx => {
  ctx.body = "Hello World";
});

const port = process.env.SERVER_PORT || 3000;

app.listen(port).on('listening', () => {
    console.log(`Server started on port ${port}`);
});