import Router from "@koa/router";
import authRouter from "./auth.routes";
import timerRouter from "./timer.routes";
import { auth } from "../middleware/token.middleware";

const router = new Router();

router.get('/health', async ctx => {
  ctx.body = "Hello World";
});

router.use('/auth', authRouter.routes());

router.use('/timer', auth, timerRouter.routes());

export default router;