import { Request, Response } from "express";
import { container } from 'tsyringe';
import { ListUserUseCase } from "./ListUserUseCase";

export class ListUserController {
    async handle(_request: Request, response: Response) {

        const listUserUseCase = container.resolve(ListUserUseCase);

        const users = await listUserUseCase.execute();
        return response.json({ users });
    }
}
