import request from 'supertest';
import app from '../../../index';
import config from '../../../config';
import * as db from '../../../common/testUtils/database';
// import User from '../../users/userSchema';

config.nodeEnv = 'test';

beforeAll(async () => await db.connect());
afterEach(async () => await db.clearDatabase());
afterAll(async () => await db.closeDatabase());

describe('Authentication', () => {
  describe('Signup : POST /signup', () => {
    test('When providing valid username and password, should create a new user and return 201', async () => {
      const newUser = {
        username: 'username',
        password: 'password',
      };
      const signupResponse = await request(app).post(`/signup`).send(newUser);

      expect(signupResponse).toBeTruthy();
      expect(signupResponse.status).toBe(201);
      expect(signupResponse.body.data.message).toBe('User created!');
      expect(signupResponse.body.data.code).toBe(201);
      expect(signupResponse.body.data.user.username).toBe(newUser.username);
      expect(signupResponse.body.data.user.token).toBeTruthy();
    });
    test('When username not provided, should throw error and return 400', async () => {
      const newUser = {
        password: 'password',
      };
      const signupResponse = await request(app).post(`/signup`).send(newUser);

      expect(signupResponse).toBeTruthy();
      expect(signupResponse.status).toBe(400);
      expect(signupResponse.body.error.message).toBe(
        'Username and Password are required'
      );
      expect(signupResponse.body.error.description).toBe('Auth error');
      expect(signupResponse.body.error.statusCode).toBe(400);
      expect(signupResponse.body.error.isOperational).toBe(true);
    });
    test('When password not provided, should throw error and return 400', async () => {
      const newUser = {
        username: 'username',
      };
      const signupResponse = await request(app).post(`/signup`).send(newUser);

      expect(signupResponse).toBeTruthy();
      expect(signupResponse.status).toBe(400);
      expect(signupResponse.body.error.message).toBe(
        'Username and Password are required'
      );
      expect(signupResponse.body.error.description).toBe('Auth error');
      expect(signupResponse.body.error.statusCode).toBe(400);
      expect(signupResponse.body.error.isOperational).toBe(true);
    });
    test('When username already exists, should throw error and return 409', async () => {
      const newUser = {
        username: 'username',
        password: 'password',
      };
      await request(app).post(`/signup`).send(newUser);
      const signupResponse = await request(app).post(`/signup`).send(newUser);

      expect(signupResponse).toBeTruthy();
      expect(signupResponse.status).toBe(409);
      expect(signupResponse.body.error.message).toBe('Username already exists');
      expect(signupResponse.body.error.description).toBe('Auth error');
      expect(signupResponse.body.error.statusCode).toBe(409);
      expect(signupResponse.body.error.isOperational).toBe(true);
    });
  });
});
