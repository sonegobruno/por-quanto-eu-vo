import { Request, Response } from "express";
import { container } from 'tsyringe';
import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

export class RefreshTokenController {
    async handle(request: Request, response: Response) {
        const token = request.body.token || request.headers["x-access-token"] || request.query.token;

        const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

        const refreshToken = await refreshTokenUseCase.execute(token);

        return response.status(202).json(refreshToken);
    }
}
