import express, { Router } from 'express';
import {
  addClinic,
  getAllClinics,
  getClinicInfoByID,
  getMultipleClinicsByIDs,
  updateClinic,
  deleteClinic
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
clinics.post('/create', addClinic);
clinics.get('/find', checkMongoConnection, getAllClinics);
clinics.put('/update/:clinicId', updateClinic);
clinics.delete('/delete/:clinicId', validateObjectId, checkMongoConnection, deleteClinic);