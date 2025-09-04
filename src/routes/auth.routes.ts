import Router from "@koa/router";
import { signIn, signUp } from "../controllers/auth.controller";

const router = new Router();

router.post('/signin', async ctx => {
    await signIn(ctx);
})

router.post('/signup', async ctx => {
    await signUp(ctx);
})

export default router;