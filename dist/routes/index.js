"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const providers_1 = require("./providers");
const clinics_1 = require("./clinics");
const router = express_1.default.Router();
router.use('/providers', providers_1.providers);
router.use('/clinics', clinics_1.clinics);
exports.default = router;
