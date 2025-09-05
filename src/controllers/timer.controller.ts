import { Context } from "koa";
import { Timer } from "../models";
import { getAllTimersByUserId } from "../services/timer.service";
import Joi from "joi";

const getTimerByIdWithAuth = async (ctx: Context) => {
    const { id } = ctx.params;
    const userId = ctx.state.user.id;

    if (!id) {
        ctx.status = 400;
        ctx.body = { error: 'Timer id is required' };
        return;
    }

    const timer = await Timer.findByPk(id);
    const timerUserId = parseInt(timer?.getDataValue('userId'));

    if (!timer || timerUserId !== userId) {
        ctx.status = 404;
        ctx.body = { error: `Timer with id ${id} not found for this user` };
        return;
    }
    return timer;
}

export const getTimerById = async (ctx: Context) => {
    try {
        const timer = await getTimerByIdWithAuth(ctx);
        if (!timer) return;

        ctx.status = 200;
        ctx.body = timer;
    } catch (error) {
        console.error(error);
        ctx.status = 500;
        ctx.body = { error: 'Internal Server Error' };
    }
}

export const getAllTimers = async (ctx: Context) => {
    try {
        const userId = ctx.state.user.id;
        const timers = await getAllTimersByUserId(userId);

        ctx.status = 200;
        ctx.body = timers;
    } catch (error) {
        console.error(error);
        ctx.status = 500;
        ctx.body = { error: 'Internal Server Error' };
    }
}

export const createTimer = async (ctx: Context) => {
    try {
        const userId = ctx.state.user.id;
        const registerSchema = Joi.object({
            name: Joi.string().required(),
            exerciseDuration: Joi.number().required(),
            restDuration: Joi.number().required(),
            rounds: Joi.number().required(),
        });

        const { error, value } = registerSchema.validate(ctx.request.body);

        if (error) {
            ctx.status = 400;
            ctx.body = { error: error.details[0].message };
            return;
        }

        const newTimer = await Timer.create({ ...value, userId });
        ctx.status = 201;
        ctx.body = newTimer;
    } catch (error) {
        console.error(error);
        ctx.status = 500;
        ctx.body = { error: 'Internal Server Error' };
    }
}

export const updateTimer = async (ctx: Context) => {
    try {
        const timer = await getTimerByIdWithAuth(ctx);
        if (!timer) return;
        
        const registerSchema = Joi.object({
            name: Joi.string().required(),
            exerciseDuration: Joi.number().required(),
            restDuration: Joi.number().required(),
            rounds: Joi.number().required(),
        });

        const { error, value } = registerSchema.validate(ctx.request.body);

        if (error) {
            ctx.status = 400;
            ctx.body = { error: error.details[0].message };
            return;
        }

        await timer.update(ctx.request.body);
        ctx.status = 200;
        ctx.body = timer;
    } catch (error) {
        console.error(error);
        ctx.status = 500;
        ctx.body = { error: 'Internal Server Error' };
    }
}

export const deleteTimer = async (ctx: Context) => {
    try {
        const timer = await getTimerByIdWithAuth(ctx);
        if (!timer) return;

        await timer.destroy();
        ctx.status = 200;
        ctx.body = { message: `Timer with id ${ctx.params.id} deleted successfully` };
    } catch (error) {
        console.error(error);
        ctx.status = 500;
        ctx.body = { error: 'Internal Server Error' };
    }
}