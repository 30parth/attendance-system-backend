"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = connectDB;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    throw new Error('MONGODB_URI is not set in environment');
}
async function connectDB() {
    try {
        // MONGODB_URI is checked above; assert non-null for TypeScript
        await mongoose_1.default.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
    }
    catch (err) {
        console.error('Failed to connect to MongoDB', err);
        throw err;
    }
}
exports.default = mongoose_1.default;
