import { Request, Response } from "express";
import { container } from 'tsyringe';
import { ListUserByIdUseCase } from "../ListUser/ListUserByIdUseCase";

export class ListAuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { user_id } = request.res.locals

    const listUserByIdUseCase = container.resolve(ListUserByIdUseCase);

    const me = await listUserByIdUseCase.execute(user_id);

    return response.json({ me });
  }
}
