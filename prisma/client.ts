import { PrismaClient } from '@prisma/client';

// creates and exports one instance of the prisma client that can be reused in other areas
const prisma = new PrismaClient();

export default prisma;
