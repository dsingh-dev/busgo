import express from 'express';
import listEndpoints from 'express-list-endpoints';
import authRouter from './src/routes/auth';
import AdminRoutes from './src/routes/admin';

const app = express();

app.use(express.json());

app.use('/api/auth', authRouter);

//Admin
app.use('/api/admin/', AdminRoutes)

export default app;