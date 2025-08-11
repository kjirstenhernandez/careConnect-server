import express, { Router } from 'express';
import {
  addClinic,
  getAllClinics,
  getClinicInfoByID,
  getMultipleClinicsByIDs,
} from '../controllers/clinics';
import { validateObjectId } from '../middleware/validateObjectId';

export const clinics: Router = express.Router();

clinics.get('/find/:clinicId', validateObjectId, getClinicInfoByID);
clinics.post('/find/many', getMultipleClinicsByIDs);
clinics.post('/new', addClinic);
clinics.get('/find', getAllClinics);
