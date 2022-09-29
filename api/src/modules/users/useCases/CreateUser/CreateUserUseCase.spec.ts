import { AppError } from './../../../../errors/index';
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory"
import { CreateUserUseCase } from "./CreateUserUseCase"
import { compare } from 'bcrypt';

let createUserUseCase: CreateUserUseCase
let userReponsitoryInMemory: UserRepositoryInMemory

describe('CreateUserUseCase', () => {
  beforeEach(() => {
    userReponsitoryInMemory = new UserRepositoryInMemory()
    createUserUseCase = new CreateUserUseCase(userReponsitoryInMemory)
  })

  it('should be able to create a new user', async () => {
    const mockUser = {
      name: 'John Doe',
      email: 'john.doe@email.com',
      password: "123456"
    }
    await createUserUseCase.execute(mockUser)

    expect(userReponsitoryInMemory.users[0].name).toContain(mockUser.name)
    expect(userReponsitoryInMemory.users[0].email).toContain(mockUser.email)
    expect(await compare(mockUser.password, userReponsitoryInMemory.users[0].password)).toBe(true)
  })

  it('should not be able to create a new user without name', async () => {
    const mockUser = {
      name: '',
      email: 'john.doe@email.com',
      password: "123456"
    }

    expect(async () => {
      await createUserUseCase.execute(mockUser)
    }).rejects.toBeInstanceOf(AppError)
  })


  it('should not be able to create a new user without email', async () => {
    const mockUser = {
      name: 'John Doe',
      email: '',
      password: "123456"
    }

    expect(async () => {
      await createUserUseCase.execute(mockUser)
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new user without password', async () => {
    const mockUser = {
      name: 'John Doe',
      email: 'john.doe@email.com',
      password: ""
    }

    expect(async () => {
      await createUserUseCase.execute(mockUser)
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to create a new user with email already exist', async () => {
    const mockUser = {
      name: 'John Doe',
      email: 'john.doe@email.com',
      password: "123123"
    }

    await createUserUseCase.execute(mockUser)

    expect(async () => {
      await createUserUseCase.execute(mockUser)
    }).rejects.toBeInstanceOf(AppError)
  })
})
