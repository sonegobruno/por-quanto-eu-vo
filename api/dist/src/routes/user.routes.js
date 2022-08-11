"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const CreateUserController_1 = require("../modules/users/useCases/CreateUser/CreateUserController");
const ListUserByIdController_1 = require("../modules/users/useCases/ListUser/ListUserByIdController");
const userRoutes = (0, express_1.Router)();
exports.userRoutes = userRoutes;
const listUserByIdController = new ListUserByIdController_1.ListUserByIdController();
const createUserController = new CreateUserController_1.CreateUserController();
userRoutes.get('/:user_id', listUserByIdController.handle);
userRoutes.post('/', createUserController.handle);
//# sourceMappingURL=user.routes.js.map