import { addDays } from 'date-fns';
import { inject, injectable} from 'tsyringe';
import { sign, verify,  } from 'jsonwebtoken'
import { IUsersTokensRepository } from '../repository/IUsersTokensRepository';
import { AppError } from '../../../errors';
import { IUsersRepository } from '../../users/repositories/IUserRepository';
import authConfig from '../../../config/auth'

interface IResponse {
    token: string;
    refresh_token: string
}

@injectable()
class RefreshTokenUseCase {

    constructor(
        @inject("UserRepository")
        private userRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository
    ){}

    public async execute(refresh_token: string): Promise<IResponse> {
      const decode = verify(refresh_token, process.env.REFRESH_TOKEN_HASH)

      if(!decode.sub || typeof decode.sub !== 'string') {
        throw new AppError('Erro ao fazer refresh token. Usuário não encontrado')
      }

      const user_id = decode.sub

      const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, refresh_token)

      if(!userToken) {
        throw new AppError('Erro ao fazer refresh token. Token não encontrado')
      }

      await this.usersTokensRepository.deleteById(userToken.id)

      const user = await this.userRepository.listUserById(user_id)

      if(!user) {
        throw new AppError('Erro ao fazer refresh token. Usuário não encontrado')
      }

      const newRefreshToken = sign({ email: user.email }, process.env.REFRESH_TOKEN_HASH, {
        subject: user_id,
        expiresIn: authConfig.refreshTokenExpireTime
      })

      await this.usersTokensRepository.create({
        user_id: user_id,
        expires_date: addDays(new Date(), authConfig.refreshTokenExpireInDays),
        refresh_token: refresh_token
      })

      const token = sign({}, process.env.TOKEN_HASH, {
        subject: user_id,
        expiresIn: authConfig.tokenExpireTime
      })

      return {
        refresh_token: newRefreshToken,
        token
      };
    }
}

export { RefreshTokenUseCase };
