import { Request, Response, NextFunction } from 'express';
import { ObjectId } from 'mongodb';

export async function validateObjectId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const idParam = Object.keys(req.params).find((key) => key.endsWith('Id'));
  const idValue = idParam ? req.params[idParam] : null;

  if (!idValue || !ObjectId.isValid(idValue)) {
    return res.status(400).json({ message: 'Invalid ID' });
  } else {
    next();
  }
}
