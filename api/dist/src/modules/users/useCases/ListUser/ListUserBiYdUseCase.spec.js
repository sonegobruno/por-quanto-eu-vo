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
const ListUserByIdUseCase_1 = require("./ListUserByIdUseCase");
const CreateUserUseCase_1 = require("../CreateUser/CreateUserUseCase");
const uuid_1 = require("uuid");
let createUserUseCase;
let listUserByIdUseCase;
let userReponsitoryInMemory;
describe('ListUserByIdUserUseCase', () => {
    beforeEach(() => {
        userReponsitoryInMemory = new UserRepositoryInMemory_1.UserRepositoryInMemory();
        listUserByIdUseCase = new ListUserByIdUseCase_1.ListUserByIdUseCase(userReponsitoryInMemory);
        createUserUseCase = new CreateUserUseCase_1.CreateUserUseCase(userReponsitoryInMemory);
    });
    it('should be return a user by id', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = {
            name: 'John Doe',
            email: 'john.doe@email.com',
            password: "123456"
        };
        yield createUserUseCase.execute(mockUser);
        const user_id = userReponsitoryInMemory.users[0].id;
        const user = yield listUserByIdUseCase.execute(user_id);
        expect(user.name).toContain(mockUser.name);
        expect(user.email).toContain(mockUser.email);
        expect(user.password).toBeUndefined();
    }));
    it('should throw a error when user not finded', () => __awaiter(void 0, void 0, void 0, function* () {
        const uuid = (0, uuid_1.v4)();
        expect(() => __awaiter(void 0, void 0, void 0, function* () {
            yield listUserByIdUseCase.execute(uuid);
        })).rejects.toBeInstanceOf(index_1.AppError);
    }));
});
//# sourceMappingURL=ListUserBiYdUseCase.spec.js.map