import express from 'express';
import { create, index, update, remove, getAllCities, getCity, getAmenities } from '../controllers/bus.controller';
import { adminMiddleware } from '../middleware/admin';
import listEndpoints from 'express-list-endpoints';

const router = express.Router();
    
router.use(adminMiddleware);
router.get('/buses', index);
router.post('/buses', create);
router.put('/buses/:bus', update);
router.delete('/buses/:bus', remove);
router.get('/cities', getAllCities);
router.get('/cities/:id', getCity);
router.get('/amenities', getAmenities);

export default router;