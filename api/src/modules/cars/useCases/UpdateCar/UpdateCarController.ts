import { Request, Response } from "express";
import { container } from 'tsyringe';
import { UpdateCarUseCase } from "./UpdateCarUseCase";

export class UpdateCarController {
    async handle(request: Request, response: Response) {
      const { body } = request;
      const { user_id } = request.res.locals

      const updateCarUseCase = container.resolve(UpdateCarUseCase);
      await updateCarUseCase.execute({
        ...body,
        user_id
      });

      return response.status(202).json({ message: 'Sucesso ao atualizar carro' });
    }
}
