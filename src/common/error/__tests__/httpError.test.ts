import config from '../../../config';
import HttpError from '../httpError';

config.nodeEnv = 'test';

describe('Http Error', () => {
  test('When providing valid parameters, should create Http Error with given parmaeters', async () => {
    const httpError = new HttpError(
      404,
      'Example Error',
      'Example not found',
      false
    );

    expect(httpError.statusCode).toBe(404);
    expect(httpError.description).toBe('Example Error');
    expect(httpError.message).toBe('Example not found');
    expect(httpError.isOperational).toBe(false);
  });
});
