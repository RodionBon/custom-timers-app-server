import Router from "@koa/router";
import { createTimer, deleteTimer, getAllTimers, getTimerById, updateTimer } from "../controllers/timer.controller";

const router = new Router();

router.get('/:id', getTimerById);

router.get('/', getAllTimers);

router.post('/', createTimer);

router.put('/:id', updateTimer);

router.delete('/:id', deleteTimer);

export default router;