import request from 'supertest';
import app from '../../../index';
import config from '../../../config';
import * as db from '../../../common/testUtils/database';
import {
  createCharacter,
  createCharacters,
  createUser,
} from '../../../common/testUtils/dataFactory';
import { GreekGods } from '../../characters/characterService';
import { Character } from '../../characters/characterModel';
import { UserInfo } from '../userModel';

config.nodeEnv = 'test';

let token: string;
let userId: string;

beforeAll(async () => await db.connect());
beforeEach(async () => {
  const userInfo: UserInfo = await createUser();
  const loginResponse = await request(app)
    .post(`/login`)
    .send({ email: userInfo.email, password: userInfo.password });
  token = loginResponse.body.data.token;
  userId = loginResponse.body.data.user._id;
});
afterEach(async () => await db.clearDatabase());
afterAll(async () => await db.closeDatabase());

describe('Users', () => {
  describe('Create Character : POST /users/:id/characters', () => {
    test('When user logged in and valid Greek God name provided, should add a new character to the specified user and return 200', async () => {
      const characterName: string = GreekGods.ZEUS;

      const createCharacterResponse = await request(app)
        .post(`/users/${userId}/characters`)
        .set('Authorization', `Bearer ${token}`)
        .send({ characterName });

      expect(createCharacterResponse).toBeTruthy();
      expect(createCharacterResponse.status).toBe(200);
      expect(createCharacterResponse.body.data.message).toBe(
        'Character created !'
      );
      expect(createCharacterResponse.body.data.code).toBe(200);
      expect(createCharacterResponse.body.data.character).toEqual(
        new Character(characterName)
      );
    });
    test('When user not authenticated, should throw Error and return 401', async () => {
      const characterName: string = GreekGods.ZEUS;

      const createCharacterResponse = await request(app)
        .post(`/users/${userId}/characters`)
        .send({ characterName });

      expect(createCharacterResponse).toBeTruthy();
      expect(createCharacterResponse.status).toBe(401);
      expect(createCharacterResponse.body.error.message).toBe(
        'No token provided'
      );
    });
    test('When Greek God already used, should throw Error and return 409', async () => {
      const character = await createCharacter(userId);
      const characterName = character.name;
      const createCharacterResponse = await request(app)
        .post(`/users/${userId}/characters`)
        .set('Authorization', `Bearer ${token}`)
        .send({ characterName });

      expect(createCharacterResponse).toBeTruthy();
      expect(createCharacterResponse.status).toBe(409);
      expect(createCharacterResponse.body.error.message).toBe(
        `${characterName} is already in you characters list !`
      );
    });
    test('When invalid Greek God name provided, should throw Error and return 422', async () => {
      const createCharacterResponse = await request(app)
        .post(`/users/${userId}/characters`)
        .set('Authorization', `Bearer ${token}`)
        .send({ characterName: 'Invalid Greek God' });

      expect(createCharacterResponse).toBeTruthy();
      expect(createCharacterResponse.status).toBe(422);
      expect(createCharacterResponse.body.error.message).toBe(
        `You need to provide a valid Greek God name !`
      );
    });
    test('When user already owns at least 10 characters, should throw Error and return 422', async () => {
      await createCharacters(userId, 10);
      const createCharacterResponse = await request(app)
        .post(`/users/${userId}/characters`)
        .set('Authorization', `Bearer ${token}`)
        .send({ characterName: GreekGods.POSEIDON });

      expect(createCharacterResponse).toBeTruthy();
      expect(createCharacterResponse.status).toBe(400);
      expect(createCharacterResponse.body.error.message).toBe(
        `You cannot own more than 10 characters !`
      );
    });
    test('When request params id different than logged user id, should throw Error and return 401', async () => {
      const secondUser = await createUser();
      const getCharactersResponse = await request(app)
        .post(`/users/${secondUser._id}/characters`)
        .set('Authorization', `Bearer ${token}`)
        .send({ characterName: GreekGods.POSEIDON });

      expect(getCharactersResponse).toBeTruthy();
      expect(getCharactersResponse.status).toBe(401);
      expect(getCharactersResponse.body.error.message).toBe(
        `You are not authorized to access these datas !`
      );
    });
  });
  describe('Get Characters : GET /users/:id/characters', () => {
    test('When user logged in, should return the list of characters the user owns and return 200', async () => {
      const characters = await createCharacters(userId, 10);

      const getCharactersResponse = await request(app)
        .get(`/users/${userId}/characters`)
        .set('Authorization', `Bearer ${token}`);
      expect(getCharactersResponse).toBeTruthy();
      expect(getCharactersResponse.status).toBe(200);
      expect(getCharactersResponse.body.data.message).toBe(
        `${characters.length} characters found !`
      );
      expect(getCharactersResponse.body.data.code).toBe(200);
      expect(getCharactersResponse.body.data.characters.length).toBe(
        characters.length
      );
    });
    test('When user not authenticated, should throw Error and return 401', async () => {
      const getCharactersResponse = await request(app).get(
        `/users/${userId}/characters`
      );

      expect(getCharactersResponse).toBeTruthy();
      expect(getCharactersResponse.status).toBe(401);
      expect(getCharactersResponse.body.error.message).toBe(
        'No token provided'
      );
    });
    test('When request params id different than logged user id, should throw Error and return 401', async () => {
      const secondUser = await createUser();
      const getCharactersResponse = await request(app)
        .get(`/users/${secondUser._id}/characters`)
        .set('Authorization', `Bearer ${token}`);
      expect(getCharactersResponse).toBeTruthy();
      expect(getCharactersResponse.status).toBe(401);
      expect(getCharactersResponse.body.error.message).toBe(
        `You are not authorized to access these datas !`
      );
    });
  });
  describe('Get Character : GET /users/:id/characters/:characterName', () => {
    test('When user logged in, should return the list of characters the user owns and return 200', async () => {
      const characters = await createCharacters(userId, 10);
      const getCharacterResponse = await request(app)
        .get(`/users/${userId}/characters/${characters[0].name}`)
        .set('Authorization', `Bearer ${token}`);

      expect(getCharacterResponse).toBeTruthy();
      expect(getCharacterResponse.status).toBe(200);
      expect(getCharacterResponse.body.data.message).toBe(
        `Character ${characters[0].name} found !`
      );
      expect(getCharacterResponse.body.data.code).toBe(200);
      expect(getCharacterResponse.body.data.character).toEqual(
        new Character(characters[0].name)
      );
    });
    test('When user not authenticated, should throw Error and return 401', async () => {
      const characters = await createCharacters(userId, 10);

      const getCharacterResponse = await request(app).get(
        `/users/${userId}/characters/${characters[0].name}`
      );

      expect(getCharacterResponse).toBeTruthy();
      expect(getCharacterResponse.status).toBe(401);
      expect(getCharacterResponse.body.error.message).toBe('No token provided');
    });
    test('When request params id different than logged user id, should throw Error and return 401', async () => {
      const secondUser = await createUser();
      const characters = await createCharacters(userId, 10);

      const getCharacterResponse = await request(app)
        .get(`/users/${secondUser._id}/characters/${characters[0].name}`)
        .set('Authorization', `Bearer ${token}`);

      expect(getCharacterResponse).toBeTruthy();
      expect(getCharacterResponse.status).toBe(401);
      expect(getCharacterResponse.body.error.message).toBe(
        `You are not authorized to access these datas !`
      );
    });
    test('When invalid Greek God name provided, should throw Error and return 422', async () => {
      const getCharacterResponse = await request(app)
        .get(`/users/${userId}/characters/invalidGreekGod`)
        .set('Authorization', `Bearer ${token}`);

      expect(getCharacterResponse).toBeTruthy();
      expect(getCharacterResponse.status).toBe(422);
      expect(getCharacterResponse.body.error.message).toBe(
        `You need to provide a valid Greek God name !`
      );
    });
    test('When character not in list, should throw error and return 404', async () => {
      const getCharacterResponse = await request(app)
        .get(`/users/${userId}/characters/${GreekGods.APHRODITE}`)
        .set('Authorization', `Bearer ${token}`);

      expect(getCharacterResponse).toBeTruthy();
      expect(getCharacterResponse.status).toBe(404);
      expect(getCharacterResponse.body.error.message).toBe(
        `Character ${GreekGods.APHRODITE} is not in you characters list !`
      );
    });
  });
});
