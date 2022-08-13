import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken';

import { AppError } from "../errors";
import { UserRepository } from '../modules/users/repositories/implementations/UserRepository';

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const token = request.headers.authorization;

    if(!token) {
        throw new AppError('Token não enviado', 401)
    }

    try {
      const { sub: user_id} = verify(token, process.env.TOKEN_HASH) as IPayload;
        const usersRepository = new UserRepository()

        const user = usersRepository.listUserById(user_id);

        if(!user) {
            throw new AppError('Usuario não existe', 401)
        }

        response.locals.user_id = user_id

        next();
    } catch(err) {
        throw new AppError('Token invalido', 401);
    }
}
