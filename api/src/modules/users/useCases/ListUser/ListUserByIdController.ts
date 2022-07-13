import { Request, Response } from "express";
import { container } from 'tsyringe';
import { ListUserByIdUseCase } from "./ListUserByIdUseCase";

export class ListUserByIdController {
    async handle(request: Request, response: Response) {
      const { user_id } = request.params

        const listUserByIdUseCase = container.resolve(ListUserByIdUseCase);

        const user = await listUserByIdUseCase.execute(user_id);
        return response.json({ user });
    }
}
