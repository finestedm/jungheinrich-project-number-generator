import {registerUser, loginUser, getMe} from "../controllers/userController.js";
import express from 'express';

const router = express.Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', getMe);

export default router