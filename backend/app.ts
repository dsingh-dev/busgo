import express from 'express';
import listEndpoints from 'express-list-endpoints';
import authRouter from './src/routes/auth';
import AdminRoutes from './src/routes/admin';
import { getCity, getAllCities } from './src/controllers/bus.controller';

const app = express();

app.use(express.json());

app.get('/api/cities/:id', getCity);
app.get('/api/cities', getAllCities);

app.use('/api/auth', authRouter);

//Admin
app.use('/api/admin/', AdminRoutes)

export default app;