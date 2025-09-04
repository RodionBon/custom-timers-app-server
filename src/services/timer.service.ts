import { Timer } from "../models";

export const getAllTimersByUserId = async (userId: number) => {
    return await Timer.findAll({ where: { userId } });
}