import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';

// DB
import sequelize from './config/db';
import wallet from './models/wallet';

// Routers
import userRouter from './routes/userRouter';

const app = express();
dotenv.config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/users', userRouter);

// Sequelize
(async () => {
  try {
    // await sequelize.sync({ force: true });
    // await sequelize.sync({ alter: true });
    await sequelize.sync();
    console.log('connect DB...');

    const PORT = process.env.SERVER_PORT || 6969;
    app.listen(PORT, () => console.log(`Server is running on port${PORT}...`));
  } catch (error) {
    console.log(error);
  }
})();
