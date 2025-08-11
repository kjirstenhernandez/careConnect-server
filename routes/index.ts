import express from 'express';
import { providers } from './providers';
import { clinics } from './clinics';
const router = express.Router();

router.use('/providers', providers);
router.use('/clinics', clinics);

export default router;
