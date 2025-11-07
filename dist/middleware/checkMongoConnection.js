"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkMongoConnection = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const checkMongoConnection = async (req, res, next) => {
    console.log('checkMongoConnection middleware called');
    try {
        await client_1.default.$connect();
        console.log('MongoDB connection success');
        next();
    }
    catch (err) {
        console.error('MongoDB connection failed: ', err);
        res.status(500).json({ message: 'MongoDB connection failed' });
    }
};
exports.checkMongoConnection = checkMongoConnection;
