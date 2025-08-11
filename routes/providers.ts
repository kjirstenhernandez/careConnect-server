import express, { Router } from 'express';
import {
  addProvider,
  addProviderLocation,
  getAllProviders,
  getMultipleProvidersByIDs,
  getProviderById,
  getProviderLocations,
} from '../controllers/providers';
import { validateObjectId } from '../middleware/validateObjectId';

export const providers: Router = express.Router();

providers.get('/find/:providerId', validateObjectId, getProviderById);
providers.get('/find', getAllProviders);
providers.get('locations/:id', getProviderLocations);
providers.post('/find/many', getMultipleProvidersByIDs);
providers.post('/new', addProvider);
providers.post('/addlocation', addProviderLocation);
