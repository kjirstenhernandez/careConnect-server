import { Request, Response } from 'express';
import prisma from '../prisma/client';

export const getClinicInfoByID = async (req: Request, res: Response) => {
  const { clinicId } = req.params;
  try {
    const clinicInfo = await prisma.clinics.findUnique({
      where: { id: clinicId },
    });

    if (clinicInfo == null) {
      res.status(400).json({ message: "Clinic doesn't exist" });
    }
    return res.status(200).json({ clinicInfo });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
export const getAllClinics = async (req: Request, res: Response) => {
  try {
    const clinicInfo = await prisma.clinics.findMany();

    if (clinicInfo == null) {
      res.status(400).json({ message: 'No Clinics' });
    }
    return res.status(200).json({ message: 'success', clinicInfo });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const addClinic = async (req: Request, res: Response) => {
  try {
    const { name, streetAddress, city, zip, phone, fax } = req.body;

    // Check to see if clinic is already in system
    const existingClinic = await prisma.clinics.findFirst({
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

    const newClinic = await prisma.clinics.create({
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
  } catch (error) {
    res.status(500).json({
      message: 'Unable to create clinic',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const getMultipleClinicsByIDs = async (req: Request, res: Response) => {
  const { clinicIds } = req.body; // expects an array of IDs
  if (!Array.isArray(clinicIds) || clinicIds.length === 0) {
    return res
      .status(400)
      .json({ message: 'clinicIds must be a non-empty array.' });
  }
  try {
    const clinics = await prisma.clinics.findMany({
      where: { id: { in: clinicIds } },
    });
    return res.status(200).json({ clinics });
  } catch (error) {
    res.status(500).json({
      message: 'Server error',
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
