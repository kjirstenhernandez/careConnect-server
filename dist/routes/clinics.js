"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clinics = void 0;
const express_1 = __importDefault(require("express"));
const clinics_1 = require("../controllers/clinics");
const validateObjectId_1 = require("../middleware/validateObjectId");
exports.clinics = express_1.default.Router();
exports.clinics.get('/find/:clinicId', validateObjectId_1.validateObjectId, clinics_1.getClinicInfoByID);
exports.clinics.post('/find/many', clinics_1.getMultipleClinicsByIDs);
exports.clinics.post('/new', clinics_1.addClinic);
exports.clinics.get('/find', clinics_1.getAllClinics);
