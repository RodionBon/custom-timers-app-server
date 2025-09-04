import { User } from "../models";

export const getUserByEmail = async (email: string) => {
    return await User.findOne({ where: { email } });
}