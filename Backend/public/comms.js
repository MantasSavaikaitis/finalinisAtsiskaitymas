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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const schemasAndTypes_1 = require("./schemasAndTypes");
const communications = (task, socket, onlineUsers) => __awaiter(void 0, void 0, void 0, function* () {
    const emittingError = (error) => __awaiter(void 0, void 0, void 0, function* () {
        const err = error;
        console.log(err);
        socket.emit('error', err);
    });
    yield mongoose_1.default.connect('mongodb+srv://MyName:Greitakojis13@cluster1.cfh9fmu.mongodb.net/test');
    mongoose_1.default.set('strictQuery', false);
    switch (task.action) {
        case 'newUser':
            const newUser = task.data;
            console.log('contact', task.action, ' ', task.data);
            try {
                const checkUsr = yield schemasAndTypes_1.UserModel.findOne({ username: newUser.username });
                console.log('checkUsr ===', checkUsr === null);
                if (checkUsr === null) {
                    const newUser = new schemasAndTypes_1.UserModel(Object.assign({}, task.data));
                    newUser.save((err) => {
                        if (err)
                            throw err;
                    });
                    socket.emit('registered', true);
                }
                else
                    throw new Error('username already exists');
            }
            catch (error) {
                emittingError(error);
            }
            break;
        case 'loginUser':
            try {
                const userLogin = task.data;
                const uObj = yield schemasAndTypes_1.UserModel.findOne({ username: userLogin.username, password: userLogin.password });
                if (uObj !== null) {
                    socket.emit('loggedIn', uObj);
                    onlineUsers.push(uObj.username);
                }
                else
                    throw new Error('username or password is incorect');
            }
            catch (error) {
                console.log(error);
                emittingError(error);
            }
        case 'logout':
            const uObj = task.data;
            onlineUsers.splice(onlineUsers.indexOf(uObj.username), 1);
        default:
            break;
    }
});
exports.default = communications;
