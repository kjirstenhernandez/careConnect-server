import express, { Router } from 'express';
import {
  addProvider,
  addProviderLocation,
  getAllProviders,
  getMultipleProvidersByIDs,
  getProviderById,
  getProviderLocations,
  updateProvider,
  deleteProviderLocation,
  deleteProvider,
} from '../controllers/providers';
import { validateObjectId } from '../middleware/validateObjectId';

export const providers: Router = express.Router();

providers.get('/find/:providerId', validateObjectId, getProviderById);
providers.get('/find', getAllProviders);
providers.get('locations/:id', getProviderLocations);
providers.post('/find/many', getMultipleProvidersByIDs);
providers.post('/create', addProvider);
providers.put('/update/:providerId', updateProvider);
providers.post('/addlocation', addProviderLocation);
providers.delete('/deletelocation', deleteProviderLocation);
providers.delete('/delete/:providerId', deleteProvider);