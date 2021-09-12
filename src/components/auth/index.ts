import { UserData } from '../users/userModel';
import express from 'express';
import { logIn, signUp } from './authService';
import { decodeHeader } from './authMiddlewares';
import { getUser } from '../users/userService';

const router = express.Router();

/* Verify express running */
router.get('/', (_req, res) => {
  res.json({ message: 'Express server running' });
});

router.post('/signup', async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const newUser: UserData = await signUp(username, email, password);

    return res.status(201).json({
      data: {
        code: 201,
        message: 'User created!',
        user: newUser,
      },
    });
  } catch (error) {
    return next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { userInfo, token, refreshToken } = await logIn(email, password);

    return res.status(200).json({
      data: {
        code: 200,
        message: 'User signed in!',
        user: userInfo,
        token,
        refreshToken,
      },
    });
  } catch (error) {
    return next(error);
  }
});

router.get('/me', decodeHeader, async (req, res, next) => {
  try {
    const { _id } = <UserData>req.user;
    const currentUser = await getUser(_id);

    return res.status(200).json({
      data: {
        code: 200,
        message: 'Current User Found !',
        user: currentUser,
      },
    });
  } catch (error) {
    return next(error);
  }
});

export default router;
