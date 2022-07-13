// import { AppError } from '../../../../errors';
import { inject, injectable} from 'tsyringe';
import { User } from '../../entities/User';
import { IUsersRepository } from '../../repositories/IUserRepository';

@injectable()
class ListUserUseCase {

    constructor(
        @inject("UserRepository")
        private userRepository: IUsersRepository
    ){}

    public async execute(): Promise<User[]> {
        return this.userRepository.list();
    }
}

export { ListUserUseCase };
