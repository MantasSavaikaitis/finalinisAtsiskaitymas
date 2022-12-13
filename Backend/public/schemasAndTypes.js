"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
//Schemas and models====================================
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    imageUrl: {
        type: Array,
        items: String,
    },
    bio: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
});
const UserModel = mongoose_1.default.model('User', userSchema);
exports.UserModel = UserModel;
