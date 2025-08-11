"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fuse_1 = require("../fuse/fuse");
const router = express_1.default.Router();
let providerFuse;
let clinicFuse;
//Load on app start
(0, fuse_1.initializeFuse)().then((fuse) => {
    providerFuse = fuse.providerFuse;
    clinicFuse = fuse.clinicFuse;
});
//Search Route
router.get('/search', (req, res) => {
    const query = req.query.q?.toString().trim();
    const limit = Math.min(parseInt(req.query.limit?.toString() || '10', 10), 50);
    if (!query)
        return res.status(400).json({ message: 'No query provided' });
    const providerResults = providerFuse
        .search(query)
        .slice(0, limit)
        .map((r) => r.item);
    const clinicResults = clinicFuse
        .search(query)
        .slice(0, limit)
        .map((r) => r.item);
    res.json({ providers: providerResults, clinics: clinicResults });
});
exports.default = router;
