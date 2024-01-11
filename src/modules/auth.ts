import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request, Response, Next } from 'express';

export const createJWT = (id: string, username: string) => jwt.sign({ id, username }, process.env.JWT_SECRET);

export const comparePasswords = (password: string, hash: string) => bcrypt.compare(password, hash);

export const hashPassword = (password: string) => bcrypt.hash(password, 5);

const unauthorized = (res: Response) => {
    res.status(401);
    res.json({ message: 'not authorized'});
    return;
}

export const protect = (req: Request, res: Response, next: Next) => {
    const bearer = req.headers.authorization;
    !bearer && unauthorized(res);

    const [, token] = bearer.split(' ');
    !token && unauthorized(res);

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (error) {
        unauthorized(res);
    }
};