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
exports.handleErrors = void 0;
const errors_1 = require("../errors");
function handleErrors(err, request, response, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (err instanceof errors_1.AppError) {
            return response.status(err.statusCode).json({
                message: err.message
            });
        }
        return response.status(500).json({
            status: 'error',
            message: `Erro interno - ${err.message}`
        });
    });
}
exports.handleErrors = handleErrors;
//# sourceMappingURL=%20handleErrors.js.map