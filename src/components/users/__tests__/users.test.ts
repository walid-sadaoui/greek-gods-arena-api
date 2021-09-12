import request from 'supertest';
import app from '../../../index';
import config from '../../../config';
import * as db from '../../../common/testUtils/database';
import * as DataFactory from '../../../common/testUtils/dataFactory';
import { IUser } from '../userModel';
import * as UserDM from '../userDataManager';

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

describe('Users', () => {
  describe('Get Current User : GET /me', () => {
    test('When vald token set in authorization header, should return the current user', async () => {
      await DataFactory.createCharacters(userId, 10);

      const getCurrentUserResponse = await request(app)
        .get(`/me`)
        .set('Authorization', `Bearer ${token}`);

      expect(getCurrentUserResponse).toBeTruthy();
      expect(getCurrentUserResponse.status).toBe(200);
      expect(getCurrentUserResponse.body.data.message).toBe(
        'Current User Found !'
      );
      expect(getCurrentUserResponse.body.data.code).toBe(200);
      expect(getCurrentUserResponse.body.data.user).toBeTruthy();
      expect(getCurrentUserResponse.body.data.user._id).toBe(userId);
    });
    test('When user not authenticated, should throw Error and return 401', async () => {
      const getCurrentUserResponse = await request(app).get(`/me`);

      expect(getCurrentUserResponse).toBeTruthy();
      expect(getCurrentUserResponse.status).toBe(401);
      expect(getCurrentUserResponse.body.error.message).toBe(
        'No token provided'
      );
    });
    test('When user do not exist, should throw Error and return 404', async () => {
      await UserDM.deleteUser(userId);
      const getCurrentUserResponse = await request(app)
        .get(`/me`)
        .set('Authorization', `Bearer ${token}`);

      expect(getCurrentUserResponse).toBeTruthy();
      expect(getCurrentUserResponse.status).toBe(404);
      expect(getCurrentUserResponse.body.error.message).toBe('User not found');
    });
  });
});
