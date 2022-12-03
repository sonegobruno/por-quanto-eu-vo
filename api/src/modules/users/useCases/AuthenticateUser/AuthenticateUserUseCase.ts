import { IUsersRepository } from './../../repositories/IUserRepository';
import { compare } from 'bcrypt';
import { inject, injectable} from 'tsyringe';
import { sign } from 'jsonwebtoken';
import { AppError } from '../../../../errors';
import { IUsersTokensRepository } from '../../../users-tokens/repository/IUsersTokensRepository';
import { addDays } from 'date-fns';
import authConfig from '../../../../config/auth'

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    token: string;
    refresh_token: string
}

@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject("UserRepository")
        private userRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository
    ){}

    public async execute({ email, password } : IRequest): Promise<IResponse> {

        if(!email) {
            throw new AppError('E-mail não informado', 400, 'email')
        }

        if(!password) {
            throw new AppError('Senha não informada', 400, 'password')
        }

        const user = await this.userRepository.findByEmail(email);

        if(!user) {
            throw new AppError('E-mail ou senha incorreta')
        }

        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch) {
            throw new AppError('E-mail ou senha incorreta')
        }

        const token = sign({}, process.env.TOKEN_HASH, {
            subject: user.id,
            expiresIn: authConfig.tokenExpireTime
        })

        const refresh_token = sign({ email }, process.env.REFRESH_TOKEN_HASH, {
          subject: user.id,
          expiresIn: authConfig.refreshTokenExpireTime
        })

        await this.usersTokensRepository.create({
          user_id: user.id,
          expires_date: addDays(new Date(), authConfig.refreshTokenExpireInDays),
          refresh_token: refresh_token
        })

        return {
            token,
            refresh_token
        }
    }
}

export { AuthenticateUserUseCase };
