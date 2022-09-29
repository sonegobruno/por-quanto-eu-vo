import { Request, Response } from "express";
import { container } from 'tsyringe';
import { ListCarByIdUseCase } from "./ListCarByIdUseCase";

export class ListCarByIdController {
    async handle(request: Request, response: Response) {
      const { user_id } = request.res.locals
      const { car_id } = request.params

      const listCarByIdUseCase = container.resolve(ListCarByIdUseCase);
      const car = await listCarByIdUseCase.execute(user_id, car_id);

      return response.status(202).json({ car });
    }
}
