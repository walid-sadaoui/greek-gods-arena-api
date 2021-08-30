import request from 'supertest';
import app from '../../../index';
import config from '../../../config';
import * as db from '../../../common/testUtils/database';
import * as DataFactory from '../../../common/testUtils/dataFactory';
import * as faker from 'faker';
import { IUser } from '../../users/userModel';

config.nodeEnv = 'test';

beforeAll(async () => await db.connect());
beforeEach(async () => await db.clearDatabase());
afterAll(async () => await db.closeDatabase());

describe('Authentication', () => {
  describe('Signup : POST /signup', () => {
    test('When providing valid username and password, should create a new user and return 201', async () => {
      const newUser = {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: DataFactory.FakePassword.GOOD,
      };

      const signupResponse = await request(app).post(`/signup`).send(newUser);

      expect(signupResponse).toBeTruthy();
      expect(signupResponse.status).toBe(201);
      expect(signupResponse.body.data.message).toBe('User created!');
      expect(signupResponse.body.data.code).toBe(201);
      expect(signupResponse.body.data.user.username).toBe(newUser.username);
    });
    test('When username not provided, should throw error and return 400', async () => {
      const newUser = {
        email: faker.internet.email(),
        password: DataFactory.FakePassword.GOOD,
      };

      const signupResponse = await request(app).post(`/signup`).send(newUser);

      expect(signupResponse).toBeTruthy();
      expect(signupResponse.status).toBe(400);
      expect(signupResponse.body.error.message).toBe(
        'Username, Email and Password are required'
      );
      expect(signupResponse.body.error.description).toBe('Auth error');
      expect(signupResponse.body.error.statusCode).toBe(400);
      expect(signupResponse.body.error.isOperational).toBe(true);
    });
    test('When password not provided, should throw error and return 400', async () => {
      const newUser = {
        username: faker.internet.userName(),
        email: faker.internet.email(),
      };

      const signupResponse = await request(app).post(`/signup`).send(newUser);

      expect(signupResponse).toBeTruthy();
      expect(signupResponse.status).toBe(400);
      expect(signupResponse.body.error.message).toBe(
        'Username, Email and Password are required'
      );
      expect(signupResponse.body.error.description).toBe('Auth error');
      expect(signupResponse.body.error.statusCode).toBe(400);
      expect(signupResponse.body.error.isOperational).toBe(true);
    });
    test('When email not provided, should throw error and return 400', async () => {
      const newUser = {
        username: faker.internet.userName(),
        password: DataFactory.FakePassword.GOOD,
      };

      const signupResponse = await request(app).post(`/signup`).send(newUser);

      expect(signupResponse).toBeTruthy();
      expect(signupResponse.status).toBe(400);
      expect(signupResponse.body.error.message).toBe(
        'Username, Email and Password are required'
      );
      expect(signupResponse.body.error.description).toBe('Auth error');
      expect(signupResponse.body.error.statusCode).toBe(400);
      expect(signupResponse.body.error.isOperational).toBe(true);
    });
    test('When username is less than 3 characters, should throw error and return 422', async () => {
      const newUser = {
        username: 'ab',
        email: faker.internet.email(),
        password: DataFactory.FakePassword.GOOD,
      };

      const signupResponse = await request(app).post(`/signup`).send(newUser);

      expect(signupResponse).toBeTruthy();
      expect(signupResponse.status).toBe(422);
      expect(signupResponse.body.error.message).toBe(
        'Username must be at leats 3 characters'
      );
      expect(signupResponse.body.error.description).toBe('Auth error');
      expect(signupResponse.body.error.statusCode).toBe(422);
      expect(signupResponse.body.error.isOperational).toBe(true);
    });
    test('When username already exists, should throw error and return 409', async () => {
      const newUser1: IUser = await DataFactory.createUser();

      const newUser2 = {
        username: newUser1.username,
        email: faker.internet.email(),
        password: DataFactory.FakePassword.GOOD,
      };

      await request(app).post(`/signup`).send(newUser1);
      const signupResponse = await request(app).post(`/signup`).send(newUser2);

      expect(signupResponse).toBeTruthy();
      expect(signupResponse.status).toBe(409);
      expect(signupResponse.body.error.message).toBe('Username already exists');
      expect(signupResponse.body.error.description).toBe('Auth error');
      expect(signupResponse.body.error.statusCode).toBe(409);
      expect(signupResponse.body.error.isOperational).toBe(true);
    });
    test('When email is not valid, should throw error and return 422', async () => {
      const newUser = {
        username: faker.internet.userName(),
        email: 'invalidemail',
        password: DataFactory.FakePassword.GOOD,
      };

      const signupResponse = await request(app).post(`/signup`).send(newUser);

      expect(signupResponse).toBeTruthy();
      expect(signupResponse.status).toBe(422);
      expect(signupResponse.body.error.message).toBe('Invalid email format');
      expect(signupResponse.body.error.description).toBe('Auth error');
      expect(signupResponse.body.error.statusCode).toBe(422);
      expect(signupResponse.body.error.isOperational).toBe(true);
    });
    test('When email already exists, should throw error and return 409', async () => {
      const newUser1: IUser = await DataFactory.createUser();

      const newUser2 = {
        username: faker.internet.userName(),
        email: newUser1.email,
        password: DataFactory.FakePassword.GOOD,
      };

      await request(app).post(`/signup`).send(newUser1);
      const signupResponse = await request(app).post(`/signup`).send(newUser2);

      expect(signupResponse).toBeTruthy();
      expect(signupResponse.status).toBe(409);
      expect(signupResponse.body.error.message).toBe('Email already exists');
      expect(signupResponse.body.error.description).toBe('Auth error');
      expect(signupResponse.body.error.statusCode).toBe(409);
      expect(signupResponse.body.error.isOperational).toBe(true);
    });
    test('When password is not with the right format, should throw error and return 422', async () => {
      const newUser = {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: DataFactory.FakePassword.LESS_THAN_8_CHAR,
      };

      await request(app).post(`/signup`).send(newUser);
      const signupResponse = await request(app).post(`/signup`).send(newUser);

      expect(signupResponse).toBeTruthy();
      expect(signupResponse.status).toBe(422);
      expect(signupResponse.body.error.message).toBe(
        'Invalid password format : password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 digit, 1 special character and at most 26 characters'
      );
      expect(signupResponse.body.error.description).toBe('Auth error');
      expect(signupResponse.body.error.statusCode).toBe(422);
      expect(signupResponse.body.error.isOperational).toBe(true);
    });
  });
  describe('Login : POST /login', () => {
    test('When providing valid email and password, should log the user in and return 200', async () => {
      const userInfo: IUser = await DataFactory.createUser();

      const loginResponse = await request(app)
        .post(`/login`)
        .send({ email: userInfo.email, password: userInfo.password });

      expect(loginResponse).toBeTruthy();
      expect(loginResponse.status).toBe(200);
      expect(loginResponse.body.data.message).toBe('User signed in!');
      expect(loginResponse.body.data.code).toBe(200);
      expect(loginResponse.body.data.user).toBeTruthy();
      expect(loginResponse.body.data.token).toBeTruthy();
      expect(loginResponse.body.data.refreshToken).toBeTruthy();
    });
    test('When email is not valid, should throw error and return 422', async () => {
      await DataFactory.createUser();
      const newUser = {
        email: 'invalidemail',
        password: DataFactory.FakePassword.GOOD,
      };

      const loginResponse = await request(app).post(`/login`).send(newUser);

      expect(loginResponse).toBeTruthy();
      expect(loginResponse.status).toBe(422);
      expect(loginResponse.body.error.message).toBe('Invalid email format');
      expect(loginResponse.body.error.description).toBe('Auth error');
      expect(loginResponse.body.error.statusCode).toBe(422);
      expect(loginResponse.body.error.isOperational).toBe(true);
    });
    test('When password is not with the right format, should throw error and return 422', async () => {
      await DataFactory.createUser();
      const newUser = {
        email: 'username@mail.com',
        password: DataFactory.FakePassword.LESS_THAN_8_CHAR,
      };

      const loginResponse = await request(app).post(`/login`).send(newUser);

      expect(loginResponse).toBeTruthy();
      expect(loginResponse.status).toBe(422);
      expect(loginResponse.body.error.message).toBe(
        'Invalid password format : password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 digit, 1 special character and at most 26 characters'
      );
      expect(loginResponse.body.error.description).toBe('Auth error');
      expect(loginResponse.body.error.statusCode).toBe(422);
      expect(loginResponse.body.error.isOperational).toBe(true);
    });
    test('When user does not exist, should throw error and return 409', async () => {
      const userInfo = {
        email: 'wrongemail@mail.com',
        password: DataFactory.FakePassword.GOOD,
      };

      const loginResponse = await request(app)
        .post(`/login`)
        .send({ email: userInfo.email, password: userInfo.password });

      expect(loginResponse).toBeTruthy();
      expect(loginResponse.status).toBe(409);
      expect(loginResponse.body.error.message).toBe('Invalid credentials');
      expect(loginResponse.body.error.statusCode).toBe(409);
    });
    test('When password is wrong, should throw error and return 409', async () => {
      const userInfo: IUser = await DataFactory.createUser();

      const loginResponse = await request(app).post(`/login`).send({
        email: userInfo.email,
        password: DataFactory.FakePassword.GOOD_2,
      });

      expect(loginResponse).toBeTruthy();
      expect(loginResponse.status).toBe(409);
      expect(loginResponse.body.error.message).toBe('Invalid credentials');
      expect(loginResponse.body.error.statusCode).toBe(409);
    });
    test('When email not provided, should throw error and return 400', async () => {
      const userInfo: IUser = await DataFactory.createUser();

      const loginResponse = await request(app)
        .post(`/login`)
        .send({ email: '', password: userInfo.password });

      expect(loginResponse).toBeTruthy();
      expect(loginResponse.status).toBe(400);
      expect(loginResponse.body.error.message).toBe(
        'Email and Password are required'
      );
      expect(loginResponse.body.error.statusCode).toBe(400);
    });
    test('When password not provided, should throw error and return 400', async () => {
      const userInfo: IUser = await DataFactory.createUser();

      const loginResponse = await request(app)
        .post(`/login`)
        .send({ email: userInfo.email, password: '' });

      expect(loginResponse).toBeTruthy();
      expect(loginResponse.status).toBe(400);
      expect(loginResponse.body.error.message).toBe(
        'Email and Password are required'
      );
      expect(loginResponse.body.error.statusCode).toBe(400);
    });
  });
});
