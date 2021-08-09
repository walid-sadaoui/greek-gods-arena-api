import { UserData } from 'components/users/userModel';
import express from 'express';
import { signUp } from './authService';

const router = express.Router();

/* Verify express running */
router.get('/', (_req, res) => {
  res.json({ message: 'Express server running' });
});

router.post('/signup', async (req, res, next) => {
  try {
    // const { user } = req.session;
    // if (user) {
    //   throw new AppError(
    //     'Auth error',
    //     400,
    //     'A User is already logged in',
    //     true
    //   );
    // }

    const { username, password } = req.body;

    const newUser: UserData = await signUp(username, password);

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

router.post('/login', async (_req, res, next) => {
  try {
    // if (user) {
    //   throw new AppError('Auth error', 400, 'User already logged in', true);
    // }

    // const { email, password } = req.body;
    // const userLoggedIn = await logIn(email, password);

    return res.status(200).json({
      data: {
        code: 200,
        message: 'User signed in!',
        // user: userLoggedIn,
      },
    });
  } catch (error) {
    return next(error);
  }
});

router.post('/logout', (_req, res, next) => {
  try {
    return res.status(200).json({
      data: {
        message: 'Logout successful',
      },
    });
  } catch (error) {
    return next(error);
  }
});

export default router;
