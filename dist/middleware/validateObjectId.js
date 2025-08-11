"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateObjectId = validateObjectId;
const mongodb_1 = require("mongodb");
async function validateObjectId(req, res, next) {
    const idParam = Object.keys(req.params).find((key) => key.endsWith('Id'));
    const idValue = idParam ? req.params[idParam] : null;
    if (!idValue || !mongodb_1.ObjectId.isValid(idValue)) {
        return res.status(400).json({ message: 'Invalid ID' });
    }
    else {
        next();
    }
}
