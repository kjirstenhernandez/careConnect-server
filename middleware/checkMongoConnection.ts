import prisma from '../prisma/client';
import { Request, Response, NextFunction } from 'express';

export const checkMongoConnection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('checkMongoConnection middleware called');
  try {
    await prisma.$connect();
    console.log('MongoDB connection success');
    next();
  } catch (err) {
    console.error('MongoDB connection failed: ', err);
    res.status(500).json({ message: 'MongoDB connection failed' });
  }
};
