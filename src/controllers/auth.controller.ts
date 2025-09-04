require('dotenv').config();
import { Context } from "koa"
import { User } from "../models";
import { getUserByEmail } from "../services/user.service";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateToken = (userId: number): string => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export const signIn = async (ctx: Context) => {
    try {
        const email = ctx.request.body.email;
        const password = ctx.request.body.password;
        const foundUser = await getUserByEmail(email);

        if (!foundUser) {
            ctx.status = 400;
            ctx.body = { error: 'User with this email not found' };
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, foundUser.getDataValue('encryptedPassword'));

        if (!isPasswordValid) {
            ctx.status = 400;
            ctx.body = { error: 'Invalid password' };
            return;
        }

        const userId = foundUser.getDataValue('id');
        const token = generateToken(userId);

        ctx.status = 200;
        ctx.body = {
            token,
            user: {
                id: userId,
                email: foundUser.getDataValue('email'),
            },
        };
    } catch (error) {
        console.error(error);
        ctx.status = 500;
        ctx.body = { error: 'Internal Server Error' };
    }
}

export const signUp = async (ctx: Context) => {
    try {
        const email = ctx.request.body.email;

        const foundUser = await getUserByEmail(email);
        if (foundUser) {
            ctx.status = 400;
            ctx.body = { error: 'User with this email already exists' };
            return;
        }

        const password = ctx.request.body.password;
        const encryptedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({ email, encryptedPassword });
        const userId = newUser.getDataValue('id');
        const token = generateToken(userId);

        ctx.status = 201;
        ctx.body = {
            token,
            user: {
                id: userId,
                email: newUser.getDataValue('email'),
            },
        };
    }
    catch (error) {
        console.error(error);
        ctx.status = 500;
        ctx.body = { error: 'Internal Server Error' };
    }
}