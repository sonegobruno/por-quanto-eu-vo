"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./../../../../errors/index");
const UserRepositoryInMemory_1 = require("../../repositories/in-memory/UserRepositoryInMemory");
const CreateUserUseCase_1 = require("./CreateUserUseCase");
let createUserUseCase;
let userReponsitoryInMemory;
describe('CreateUserUseCase', () => {
    beforeEach(() => {
        userReponsitoryInMemory = new UserRepositoryInMemory_1.UserRepositoryInMemory();
        createUserUseCase = new CreateUserUseCase_1.CreateUserUseCase(userReponsitoryInMemory);
    });
    it('should be able to create a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = {
            name: 'John Doe',
            email: 'john.doe@email.com',
            password: "123456"
        };
        yield createUserUseCase.execute(mockUser);
        expect(userReponsitoryInMemory.users[0].name).toContain(mockUser.name);
        expect(userReponsitoryInMemory.users[0].email).toContain(mockUser.email);
        expect(userReponsitoryInMemory.users[0].password).toContain(mockUser.password);
    }));
    it('should not be able to create a new user without name', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = {
            name: '',
            email: 'john.doe@email.com',
            password: "123456"
        };
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            yield createUserUseCase.execute(mockUser);
        })).rejects.toBeInstanceOf(index_1.AppError);
    }));
    it('should not be able to create a new user without email', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = {
            name: 'John Doe',
            email: '',
            password: "123456"
        };
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            yield createUserUseCase.execute(mockUser);
        })).rejects.toBeInstanceOf(index_1.AppError);
    }));
    it('should not be able to create a new user without password', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = {
            name: 'John Doe',
            email: 'john.doe@email.com',
            password: ""
        };
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            yield createUserUseCase.execute(mockUser);
        })).rejects.toBeInstanceOf(index_1.AppError);
    }));
});
//# sourceMappingURL=CreateUserUseCase.spec.js.map