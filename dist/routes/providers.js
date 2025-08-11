"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.providers = void 0;
const express_1 = __importDefault(require("express"));
const providers_1 = require("../controllers/providers");
const validateObjectId_1 = require("../middleware/validateObjectId");
exports.providers = express_1.default.Router();
exports.providers.get('/find/:providerId', validateObjectId_1.validateObjectId, providers_1.getProviderById);
exports.providers.get('/find', providers_1.getAllProviders);
exports.providers.get('locations/:id', providers_1.getProviderLocations);
exports.providers.post('/find/many', providers_1.getMultipleProvidersByIDs);
exports.providers.post('/new', providers_1.addProvider);
exports.providers.post('/addlocation', providers_1.addProviderLocation);
