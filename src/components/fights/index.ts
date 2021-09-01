import {
  decodeHeader,
  validateUserIdRequestBody,
} from '../auth/authMiddlewares';
import express from 'express';
import { newFight } from './fightService';
import { IFight } from './fightModel';

const router = express.Router();

router.post(
  '/',
  decodeHeader,
  validateUserIdRequestBody,
  async (req, res, next) => {
    try {
      const { userId, characterName } = req.body;

      const fight: IFight = await newFight(userId, characterName);

      return res.status(200).json({
        data: {
          code: 200,
          message: `Fight generated !`,
          fight,
        },
      });
    } catch (error) {
      return next(error);
    }
  }
);

export default router;
