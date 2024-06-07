"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.supabaseKey = exports.supabaseUrl = exports.secret_JWT = exports.MONGO_URI = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = Number(process.env.PORT) || 5173;
exports.MONGO_URI = String(process.env.MONGO_URI);
exports.secret_JWT = process.env.JWT_SECRET;
exports.supabaseUrl = String(process.env.SUPABASE_URL);
exports.supabaseKey = String(process.env.SUPABASE_KEY);
