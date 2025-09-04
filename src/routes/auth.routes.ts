import Router from "@koa/router";
import { signIn, signUp } from "../controllers/auth.controller";

const router = new Router();

router.post('/signin', signIn);

router.post('/signup', signUp);

export default router;