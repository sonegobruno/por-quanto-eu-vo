import { AppError } from './../../../../errors/index';
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory"
import { ListUserByIdUseCase } from './ListUserByIdUseCase';
import { CreateUserUseCase } from '../CreateUser/CreateUserUseCase';
import { v4 as uuidv4 } from 'uuid';

let createUserUseCase: CreateUserUseCase
let listUserByIdUseCase: ListUserByIdUseCase
let userReponsitoryInMemory: UserRepositoryInMemory

describe('ListUserByIdUserUseCase', () => {
  beforeEach(() => {
    userReponsitoryInMemory = new UserRepositoryInMemory()
    listUserByIdUseCase = new ListUserByIdUseCase(userReponsitoryInMemory)
    createUserUseCase = new CreateUserUseCase(userReponsitoryInMemory)
  })

  it('should be return a user by id', async () => {
    const mockUser = {
      name: 'John Doe',
      email: 'john.doe@email.com',
      password: "123456"
    }
    await createUserUseCase.execute(mockUser)

    const user_id = userReponsitoryInMemory.users[0].id

    const user = await listUserByIdUseCase.execute(user_id)

    expect(user.name).toContain(mockUser.name)
    expect(user.email).toContain(mockUser.email)
    expect(user.password).toBeUndefined()
  })

  it('should throw a error when user not finded', async () => {
    const uuid = uuidv4()

    expect(async () => {
      await listUserByIdUseCase.execute(uuid)
    }).rejects.toBeInstanceOf(AppError)
  })
})
