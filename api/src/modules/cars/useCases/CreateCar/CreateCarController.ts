import { Request, Response } from "express";
import { container } from 'tsyringe';
import { CreateCarUseCase } from "./CreateCarUseCase";

export class CreateCarController {
    async handle(request: Request, response: Response) {
      const { body } = request;
      const { user_id } = request.res.locals

      const createCarUseCase = container.resolve(CreateCarUseCase);
      await createCarUseCase.execute({
        ...body,
        user_id
      });

      return response.status(202).json({ message: 'Sucesso ao cadastrar carro' });
    }
}
