import express from 'express';
const router = express.Router();

// Controllers
import { registerUser, authUser } from '../controllers/usersControllers';

router.post('/login', authUser);
router.post('/register', registerUser);

export default router;
