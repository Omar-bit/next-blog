import { PrismaClient } from '@prisma/client';
const prismaClientSingleton = () => new PrismaClient();

const globalForPrisma = {};

const prisma = globalForPrisma?.prisma ?? prismaClientSingleton();
// globalForPrisma?.prisma = prisma;

export default prisma;
