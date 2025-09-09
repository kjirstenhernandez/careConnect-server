import express, { Router } from 'express';
import {
  addClinic,
  getAllClinics,
  getClinicInfoByID,
  getMultipleClinicsByIDs,
} from '../controllers/clinics';
import { validateObjectId } from '../middleware/validateObjectId';
import { checkMongoConnection } from '../middleware/checkMongoConnection';

export const clinics: Router = express.Router();

clinics.get(
  '/find/:clinicId',
  validateObjectId,
  checkMongoConnection,
  getClinicInfoByID
);
clinics.post('/find/many', checkMongoConnection, getMultipleClinicsByIDs);
clinics.post('/new', addClinic);
clinics.get('/find', checkMongoConnection, getAllClinics);
