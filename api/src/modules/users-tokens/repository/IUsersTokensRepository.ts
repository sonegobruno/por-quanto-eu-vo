import { ICreateUsersTokensDTO } from "../dtos/ICreateUsersTokensDTO";
import { UsersTokens } from "../entities/UsersTokens";

export interface IUsersTokensRepository {
  create(data: ICreateUsersTokensDTO): Promise<UsersTokens>
  findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UsersTokens>
  deleteById(id: string): Promise<void>
}
