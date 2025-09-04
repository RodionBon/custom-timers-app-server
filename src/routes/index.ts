import Router from "@koa/router";
import authRouter from "./auth.routes";

const router = new Router();

router.get('/health', async ctx => {
  ctx.body = "Hello World";
});

router.use('/auth', authRouter.routes());

export default router;