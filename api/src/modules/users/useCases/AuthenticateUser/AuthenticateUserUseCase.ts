import { IUsersRepository } from './../../repositories/IUserRepository';
import { compare } from 'bcrypt';
import { inject, injectable} from 'tsyringe';
import { sign } from 'jsonwebtoken';
import { AppError } from '../../../../errors';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    token: string;
}

@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject("UserRepository")
        private userRepository: IUsersRepository
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
            expiresIn: "1d"
        })

        return {
            token
        }
    }
}

export { AuthenticateUserUseCase };
