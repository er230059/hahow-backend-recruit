import * as httpMocks from 'node-mocks-http';
import { AuthMiddleware } from './auth.middleware';

describe('AuthMiddleware', () => {
  let authMiddleware: AuthMiddleware;
  const mockHahowService = {
    auth: jest.fn().mockImplementation((name, password) => {
      return new Promise((resolve, reject) => {
        if (name === 'name' && password === 'password') {
          return resolve();
        }
        return reject();
      });
    }),
  };

  beforeAll(async () => {
    authMiddleware = new AuthMiddleware(mockHahowService as any);
  });

  it('auth by correctly name and passowrd', async () => {
    const request = httpMocks.createRequest({
      headers: {
        Name: 'name',
        Password: 'password',
      },
    });
    const response = httpMocks.createResponse();
    const next = jest.fn();

    await authMiddleware.use(request, response, next);

    expect(request['authenticated']).toBe(true);
    expect(next).toHaveBeenCalled();
  });

  it('auth by incorrectly name and passowrd', async () => {
    const request = httpMocks.createRequest({
      headers: {
        Name: 'incorrectlyName',
        Password: 'incorrectlyPassword',
      },
    });
    const response = httpMocks.createResponse();
    const next = jest.fn();

    await authMiddleware.use(request, response, next);

    expect(response.statusCode).toBe(401);
    expect(response._isEndCalled()).toBe(true);
    expect(next).not.toHaveBeenCalled();
  });

  it('auth without name and passowrd', async () => {
    const request = httpMocks.createRequest();
    const response = httpMocks.createResponse();
    const next = jest.fn();

    await authMiddleware.use(request, response, next);

    expect(request['authenticated']).toBe(false);
    expect(next).toHaveBeenCalled();
  });
});
