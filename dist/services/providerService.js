"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findProviderById = findProviderById;
exports.checkLocationExists = checkLocationExists;
const client_1 = __importDefault(require("../prisma/client"));
async function findProviderById(providerId) {
    const provider = await client_1.default.providers.findUnique({
        where: { id: providerId },
    });
    return provider;
}
async function checkLocationExists(provider, locationId) {
    return provider.locations.some((location) => location.id === locationId);
}
