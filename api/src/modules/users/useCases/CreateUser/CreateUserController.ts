import { Request, Response } from "express";
import { container } from 'tsyringe';
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
    async handle(request: Request, response: Response) {
      const { body } = request;

      const createUserUseCase = container.resolve(CreateUserUseCase);
      await createUserUseCase.execute(body);

      return response.json({ message: 'Sucesso ao cadastrar usuário' });
    }
}
