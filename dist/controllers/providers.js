"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProvider = exports.deleteProviderLocation = exports.updateProvider = exports.getMultipleProvidersByIDs = exports.addProviderLocation = exports.getProviderLocations = exports.addProvider = exports.getAllProviders = exports.getProviderById = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const providerService_1 = require("../services/providerService");
const getProviderById = async (req, res) => {
    try {
        const { providerId } = req.params;
        const providerInfo = await client_1.default.providers.findUnique({
            where: { id: providerId },
        });
        if (providerInfo == null) {
            return res.status(400).json({ message: "Provider doesn't exist" });
        }
        return res.status(200).json({ providerInfo });
    }
    catch (error) {
        return res.status(500).json({ message: 'Unable to get provider details' });
    }
};
exports.getProviderById = getProviderById;
const getAllProviders = async (req, res) => {
    try {
        let providers = await client_1.default.providers.findMany();
        if (!providers || providers.length === 0) {
            return res.status(200).json({ providers: [] });
        }
        return res.status(200).json({ providers });
    }
    catch (error) {
        console.error('Error fetching providers:', error);
        return res.status(500).json({ message: 'Unable to get providers' });
    }
};
exports.getAllProviders = getAllProviders;
// Add new provider into provider database
const addProvider = async (req, res) => {
    const { firstName, lastName, credentials, specialty, locations, phone, fax } = req.body;
    if (!firstName ||
        !lastName ||
        !credentials ||
        !specialty ||
        !locations ||
        !phone) {
        return res.status(400).json({ error: 'Missing required fields.' });
    }
    try {
        const newProvider = await client_1.default.providers.create({
            data: {
                firstName,
                lastName,
                credentials,
                specialty,
                locations,
                phone,
                fax,
            },
        });
        res.status(200).json({ message: 'Provider succesfully created' });
    }
    catch (error) {
        console.error('error creating provider: ', error);
        return res
            .status(500)
            .json({ error: 'Server error while creating provider' });
    }
};
exports.addProvider = addProvider;
const getProviderLocations = async (req, res) => {
    try {
        const providerId = req.params.id;
        const provider = await (0, providerService_1.findProviderById)(providerId);
        if (!provider) {
            return res.status(404).json({ message: 'Provider Not Found' });
        }
        const locations = await client_1.default.providers.findUnique({
            where: {
                id: providerId,
            },
            select: {
                locations: true,
            },
        });
        return res.status(200).json({ locations });
    }
    catch (error) {
        return res.status(500).json({
            message: 'Server error',
            error: error instanceof Error ? error.message : String(error),
        });
    }
};
exports.getProviderLocations = getProviderLocations;
// Add new location to provider's locations list
const addProviderLocation = async (req, res) => {
    try {
        const { providerId, location } = req.body;
        const provider = await (0, providerService_1.findProviderById)(providerId);
        if (!provider) {
            return res.status(404).json({ message: 'Provider Not Found' });
        }
        if (!(0, providerService_1.checkLocationExists)(provider, location)) {
            return res.status(200).json({ message: 'Location already exists' });
        }
        const updatedProvider = await client_1.default.providers.update({
            where: {
                id: providerId,
            },
            data: {
                locations: {
                    push: location,
                },
            },
        });
        return res.status(200).json({
            message: 'Location added succesfully',
            provider: updatedProvider,
        });
    }
    catch (error) {
        return res.status(500).json({
            message: 'Server error',
            error: error instanceof Error ? error.message : String(error),
        });
    }
};
exports.addProviderLocation = addProviderLocation;
const getMultipleProvidersByIDs = async (req, res) => {
    const { clinicId } = req.body;
    try {
        console.log('clinicId:', clinicId, typeof clinicId);
        const providers = await client_1.default.providers.findMany({
            where: {
                locations: {
                    some: {
                        id: clinicId,
                    },
                },
            },
        });
        return res.status(200).json({ providers });
    }
    catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error instanceof Error ? error.message : String(error),
        });
    }
};
exports.getMultipleProvidersByIDs = getMultipleProvidersByIDs;
const updateProvider = async (req, res) => {
    const { providerId } = req.params;
    const { firstName, lastName, credentials, specialty, locations, phone, fax } = req.body;
    try {
        const updatedProvider = await client_1.default.providers.update({
            where: { id: providerId },
            data: { firstName, lastName, credentials, specialty, locations, phone, fax },
        });
        return res.status(200).json({ message: 'Provider updated', updatedProvider });
    }
    catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error instanceof Error ? error.message : String(error),
        });
    }
};
exports.updateProvider = updateProvider;
const deleteProviderLocation = async (req, res) => {
    try {
        const { providerId, location } = req.body;
        const provider = await (0, providerService_1.findProviderById)(providerId);
        if (!provider) {
            return res.status(404).json({ message: 'Provider Not Found' });
        }
        const updatedProvider = await client_1.default.providers.update({
            where: {
                id: providerId,
            },
            data: {
                locations: {}
            }
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error instanceof Error ? error.message : String(error),
        });
    }
};
exports.deleteProviderLocation = deleteProviderLocation;
const deleteProvider = async (req, res) => {
    const { providerId } = req.params;
    try {
        const deletedProvider = await client_1.default.providers.delete({
            where: { id: providerId },
        });
        return res.status(200).json({ message: 'Provider deleted', deletedProvider });
    }
    catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error instanceof Error ? error.message : String(error),
        });
    }
};
exports.deleteProvider = deleteProvider;
