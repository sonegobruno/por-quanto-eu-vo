// import { AppError } from '../../../../errors';
import { inject, injectable} from 'tsyringe';
import { User } from '../../entities/User';
import { IUsersRepository } from '../../repositories/IUserRepository';

@injectable()
class ListUserByIdUseCase {

    constructor(
        @inject("UserRepository")
        private userRepository: IUsersRepository
    ){}

    public async execute(user_id: string): Promise<User> {
        return this.userRepository.listUserById(user_id);
    }
}

export { ListUserByIdUseCase };
