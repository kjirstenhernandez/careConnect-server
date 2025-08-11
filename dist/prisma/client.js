"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
// creates and exports one instance of the prisma client that can be reused in other areas
const prisma = new client_1.PrismaClient();
exports.default = prisma;
