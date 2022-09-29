import { Request, Response } from "express";
import { container } from 'tsyringe';
import { DeleteCarByIdUseCase } from "./DeleteCarByIdUseCase";

export class DeleteCarByIdController {
    async handle(request: Request, response: Response) {
      const { user_id } = request.res.locals
      const { car_id } = request.params

      const deleteCarByIdUseCase = container.resolve(DeleteCarByIdUseCase);
      await deleteCarByIdUseCase.execute(user_id, car_id);

      return response.status(202).json({ message: 'Sucesso ao remover carro' });
    }
}
