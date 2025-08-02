import express from 'express';
import authRouter from './routes/auth.Routes.js';
import restaurantRouter from './routes/restaurant.Routes.js';
import userRouter from './routes/user.Routes.js';
import dotenv from 'dotenv';
import connectToDatabase from './database/mongodb.js';
import cookieParser from 'cookie-parser';
import { verifyToken } from './middleware/auth.middleware.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRouter);
app.use("/api/restaurant", verifyToken, restaurantRouter);
app.use("/api/user",verifyToken, userRouter);


app.listen(PORT, async() => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await connectToDatabase();
})