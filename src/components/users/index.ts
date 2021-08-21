import express from 'express';
import { decodeHeader } from '../auth/authMiddlewares';
import { createCharacter } from '../characters/characterService';

const router = express.Router();

router.post('/:id/characters', decodeHeader, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { characterName } = req.body;
    const character = await createCharacter(characterName, id);

    return res.status(200).json({
      data: {
        code: 200,
        message: 'Character created !',
        character,
      },
    });
  } catch (error) {
    return next(error);
  }
});

export default router;
