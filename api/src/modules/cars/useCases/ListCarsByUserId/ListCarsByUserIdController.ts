import { Request, Response } from "express";
import { container } from 'tsyringe';
import { ListCarsByUserIdUseCase } from "./ListCarsByUserIdUseCase";

export class ListCarsyUserIdController {
    async handle(request: Request, response: Response) {
      const { user_id } = request.res.locals

      const listCarsByUserIdUseCase = container.resolve(ListCarsByUserIdUseCase);
      const cars = await listCarsByUserIdUseCase.execute(user_id);

      return response.status(202).json({ cars });
    }
}
