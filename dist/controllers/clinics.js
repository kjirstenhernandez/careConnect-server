"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMultipleClinicsByIDs = exports.addClinic = exports.getAllClinics = exports.getClinicInfoByID = void 0;
const client_1 = __importDefault(require("../prisma/client"));
const getClinicInfoByID = async (req, res) => {
    const { clinicId } = req.params;
    try {
        const clinicInfo = await client_1.default.clinics.findUnique({
            where: { id: clinicId },
        });
        if (clinicInfo == null) {
            res.status(400).json({ message: "Clinic doesn't exist" });
        }
        return res.status(200).json({ clinicInfo });
    }
    catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error instanceof Error ? error.message : String(error),
        });
    }
};
exports.getClinicInfoByID = getClinicInfoByID;
const getAllClinics = async (req, res) => {
    try {
        const clinicInfo = await client_1.default.clinics.findMany();
        if (clinicInfo == null) {
            res.status(400).json({ message: 'No Clinics' });
        }
        return res.status(200).json({ message: 'success', clinicInfo });
    }
    catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error instanceof Error ? error.message : String(error),
        });
    }
};
exports.getAllClinics = getAllClinics;
const addClinic = async (req, res) => {
    try {
        const { name, streetAddress, city, zip, phone, fax } = req.body;
        // Check to see if clinic is already in system
        const existingClinic = await client_1.default.clinics.findFirst({
            where: {
                name: {
                    equals: name,
                    mode: 'insensitive',
                },
            },
        });
        if (existingClinic) {
            return res
                .status(400)
                .json({ message: `A clinic named ${name} already exists.` });
        }
        const newClinic = await client_1.default.clinics.create({
            data: {
                name,
                streetAddress,
                city,
                zip,
                phone,
                fax,
            },
        });
        res.status(200).json({ message: 'New clinic Added: ', newClinic });
    }
    catch (error) {
        res.status(500).json({
            message: 'Unable to create clinic',
            error: error instanceof Error ? error.message : String(error),
        });
    }
};
exports.addClinic = addClinic;
const getMultipleClinicsByIDs = async (req, res) => {
    const { clinicIds } = req.body; // expects an array of IDs
    if (!Array.isArray(clinicIds) || clinicIds.length === 0) {
        return res
            .status(400)
            .json({ message: 'clinicIds must be a non-empty array.' });
    }
    try {
        const clinics = await client_1.default.clinics.findMany({
            where: { id: { in: clinicIds } },
        });
        return res.status(200).json({ clinics });
    }
    catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error instanceof Error ? error.message : String(error),
        });
    }
};
exports.getMultipleClinicsByIDs = getMultipleClinicsByIDs;
