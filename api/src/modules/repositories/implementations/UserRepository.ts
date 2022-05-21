// import { AppError } from '../../../../errors';
// import { getRepository, Repository } from 'typeorm';

import { User } from "../../entities/User";
import { IUsersRepository } from "./IUserRepository";


class UserRepository implements IUsersRepository{

    // private repository: Repository<User>
    private users = [
        {
            id: 1,
            name: 'Bruno',
            email: 'sonego.bruno@gmail.com',
            password: '1234',
            created_at: new Date(),
            updated_at: new Date()
        }
    ]

    constructor() {
        // this.repository = getRepository(User)
    }

    public async list() {
        return this.users;
    }
}

export { UserRepository };