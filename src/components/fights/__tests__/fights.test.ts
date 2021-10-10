import request from 'supertest';
import app from '../../../index';
import config from '../../../config';
import * as db from '../../../common/testUtils/database';
import * as DataFactory from '../../../common/testUtils/dataFactory';
import { IUser } from '../../users/userModel';
import { GreekGods } from '../../users/characters/characterModel';

config.nodeEnv = 'test';

let token: string;
let userId: string;

beforeAll(async () => await db.connect());
beforeEach(async () => {
  const userInfo: IUser = await DataFactory.createUser();
  const loginResponse = await request(app)
    .post(`/login`)
    .send({ email: userInfo.email, password: userInfo.password });
  token = loginResponse.body.data.token;
  userId = loginResponse.body.data.user._id;
});
afterEach(async () => await db.clearDatabase());
afterAll(async () => await db.closeDatabase());

describe('Fights', () => {
  describe('New Fight : POST /fights', () => {
    test('When user logged in and valid Greek God name provided, should run a new fight and return 200', async () => {
      const currentUserCharacters = await DataFactory.createCharacters(
        userId,
        10
      );
      const secondUser: IUser = await DataFactory.createUser();
      const secondUserCharacters = await DataFactory.createCharacters(
        secondUser._id,
        10
      );
      await DataFactory.updateCharacterProperties(
        secondUser._id,
        secondUserCharacters[0].name,
        { level: 5, attack: 10, defense: 4, magik: 1, health: 15 }
      );
      await DataFactory.updateCharacterProperties(
        userId,
        currentUserCharacters[0].name,
        { level: 5, attack: 8, defense: 2, magik: 2, health: 18 }
      );

      const newFightResponse = await request(app)
        .post(`/fights`)
        .set('Authorization', `Bearer ${token}`)
        .send({ userId, characterName: currentUserCharacters[0].name });

      expect(newFightResponse).toBeTruthy();
      expect(newFightResponse.status).toBe(200);
      expect(newFightResponse.body.data.message).toBe('Fight generated !');
      expect(newFightResponse.body.data.code).toBe(200);
      expect(newFightResponse.body.data.fight.finished).toBe(true);
      expect(newFightResponse.body.data.fight.winner).toBeTruthy();
      expect(newFightResponse.body.data.fight.loser).toBeTruthy();
    });
    test('When user not authenticated, should throw Error and return 401', async () => {
      const currentUserCharacters = await DataFactory.createCharacters(
        userId,
        10
      );
      const secondUser: IUser = await DataFactory.createUser();
      const secondUserCharacters = await DataFactory.createCharacters(
        secondUser._id,
        10
      );
      await DataFactory.updateCharacterProperties(
        secondUser._id,
        secondUserCharacters[0].name,
        { level: 5, attack: 10, defense: 4, magik: 1, health: 15 }
      );
      await DataFactory.updateCharacterProperties(
        userId,
        currentUserCharacters[0].name,
        { level: 5, attack: 8, defense: 2, magik: 2, health: 18 }
      );

      const newFightResponse = await request(app)
        .post(`/fights`)
        .send({ userId, characterName: currentUserCharacters[0].name });

      expect(newFightResponse).toBeTruthy();
      expect(newFightResponse.status).toBe(401);
      expect(newFightResponse.body.error.message).toBe('No token provided');
    });
    test('When request body userId different than logged user id, should throw Error and return 401', async () => {
      const currentUserCharacters = await DataFactory.createCharacters(
        userId,
        10
      );
      const secondUser: IUser = await DataFactory.createUser();
      const secondUserCharacters = await DataFactory.createCharacters(
        secondUser._id,
        10
      );
      await DataFactory.updateCharacterProperties(
        secondUser._id,
        secondUserCharacters[0].name,
        { level: 5, attack: 10, defense: 4, magik: 1, health: 15 }
      );
      await DataFactory.updateCharacterProperties(
        userId,
        currentUserCharacters[0].name,
        { level: 5, attack: 8, defense: 2, magik: 2, health: 18 }
      );

      const newFightResponse = await request(app)
        .post(`/fights`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          userId: secondUser._id,
          characterName: currentUserCharacters[0].name,
        });

      expect(newFightResponse).toBeTruthy();
      expect(newFightResponse.status).toBe(401);
      expect(newFightResponse.body.error.message).toBe(
        `You are not authorized to perform this action !`
      );
    });
    test('When invalid Greek God name provided, should throw Error and return 422', async () => {
      const currentUserCharacters = await DataFactory.createCharacters(
        userId,
        10
      );
      const secondUser: IUser = await DataFactory.createUser();
      const secondUserCharacters = await DataFactory.createCharacters(
        secondUser._id,
        10
      );
      await DataFactory.updateCharacterProperties(
        secondUser._id,
        secondUserCharacters[0].name,
        { level: 5, attack: 10, defense: 4, magik: 1, health: 15 }
      );
      await DataFactory.updateCharacterProperties(
        userId,
        currentUserCharacters[0].name,
        { level: 5, attack: 8, defense: 2, magik: 2, health: 18 }
      );

      const newFightResponse = await request(app)
        .post(`/fights`)
        .set('Authorization', `Bearer ${token}`)
        .send({ userId, characterName: 'Invalid Greek God' });

      expect(newFightResponse).toBeTruthy();
      expect(newFightResponse.status).toBe(422);
      expect(newFightResponse.body.error.message).toBe(
        `You need to provide a valid Greek God name !`
      );
    });
    test('When Greek God name provided not in currentUser characters list, should throw error and return 404', async () => {
      const newFightResponse = await request(app)
        .post(`/fights`)
        .set('Authorization', `Bearer ${token}`)
        .send({ userId, characterName: GreekGods.APHRODITE });

      expect(newFightResponse).toBeTruthy();
      expect(newFightResponse.status).toBe(404);
      expect(newFightResponse.body.error.message).toBe(
        `Character ${GreekGods.APHRODITE} is not in you characters list !`
      );
    });
    test('When no opponent found, should throw error and return 404', async () => {
      const currentUserCharacters = await DataFactory.createCharacters(
        userId,
        10
      );
      await DataFactory.updateCharacterProperties(
        userId,
        currentUserCharacters[0].name,
        { level: 5, attack: 8, defense: 2, magik: 2, health: 18 }
      );

      const newFightResponse = await request(app)
        .post(`/fights`)
        .set('Authorization', `Bearer ${token}`)
        .send({ userId, characterName: currentUserCharacters[0].name });

      expect(newFightResponse).toBeTruthy();
      expect(newFightResponse.status).toBe(404);
      expect(newFightResponse.body.error.message).toBe(
        `There is no characters available for a fight at the moment !`
      );
    });
  });
  describe('Get Fight : GET /fights/:id', () => {
    test('When user logged in and valid fightId provided, should retrieve the fight and return 200', async () => {
      const currentUserCharacters = await DataFactory.createCharacters(
        userId,
        10
      );
      const secondUser: IUser = await DataFactory.createUser();
      const secondUserCharacters = await DataFactory.createCharacters(
        secondUser._id,
        10
      );
      await DataFactory.updateCharacterProperties(
        secondUser._id,
        secondUserCharacters[0].name,
        { level: 5, attack: 10, defense: 4, magik: 1, health: 15 }
      );
      await DataFactory.updateCharacterProperties(
        userId,
        currentUserCharacters[0].name,
        { level: 5, attack: 8, defense: 2, magik: 2, health: 18 }
      );

      const fight = await DataFactory.newFight(userId, secondUser._id);

      const newFightResponse = await request(app)
        .get(`/fights/${fight._id}`)
        .set('Authorization', `Bearer ${token}`);

      expect(newFightResponse).toBeTruthy();
      expect(newFightResponse.status).toBe(200);
      expect(newFightResponse.body.data.message).toBe('Fight retrieved !');
      expect(newFightResponse.body.data.code).toBe(200);
      expect(newFightResponse.body.data.fight.finished).toBe(true);
      expect(newFightResponse.body.data.fight.winner).toBeTruthy();
      expect(newFightResponse.body.data.fight.loser).toBeTruthy();
    });
    test('When user not authenticated, should throw Error and return 401', async () => {
      const currentUserCharacters = await DataFactory.createCharacters(
        userId,
        10
      );
      const secondUser: IUser = await DataFactory.createUser();
      const secondUserCharacters = await DataFactory.createCharacters(
        secondUser._id,
        10
      );
      await DataFactory.updateCharacterProperties(
        secondUser._id,
        secondUserCharacters[0].name,
        { level: 5, attack: 10, defense: 4, magik: 1, health: 15 }
      );
      await DataFactory.updateCharacterProperties(
        userId,
        currentUserCharacters[0].name,
        { level: 5, attack: 8, defense: 2, magik: 2, health: 18 }
      );

      const fight = await DataFactory.newFight(userId, secondUser._id);

      const newFightResponse = await request(app)
        .get(`/fights/${fight._id}`)
        .send({ userId, characterName: currentUserCharacters[0].name });

      expect(newFightResponse).toBeTruthy();
      expect(newFightResponse.status).toBe(401);
      expect(newFightResponse.body.error.message).toBe('No token provided');
    });
    test('When invalid fightId provided, should throw error and return 404', async () => {
      const newFightResponse = await request(app)
        .get(`/fights/61471d8ac1b75e17a05e17fb`)
        .set('Authorization', `Bearer ${token}`);

      expect(newFightResponse).toBeTruthy();
      expect(newFightResponse.status).toBe(404);
      expect(newFightResponse.body.error.message).toBe(`Fight not found !`);
    });
  });
});
