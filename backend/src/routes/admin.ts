import express from 'express';
import { create, index, update, remove, getAmenities } from '../controllers/admin/bus.controller';
import { adminMiddleware } from '../middleware/admin';

const router = express.Router();
    
router.use(adminMiddleware);
router.get('/buses', index);
router.post('/buses', create);
router.put('/buses/:bus', update);
router.delete('/buses/:bus', remove);
router.get('/amenities', getAmenities);

export default router;