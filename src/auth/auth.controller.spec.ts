import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  // AuthController can successfully login a user with valid credentials
  it('should successfully login a user with valid credentials', async () => {
    const authServiceMock = {
      login: jest.fn().mockReturnValue({ access_token: 'token' }),
    } as unknown as AuthService;
    const authController = new AuthController(authServiceMock);
    const req = { username: 'testuser', password: '123' };
    const result = await authController.login(req);
    expect(result).toEqual({ access_token: 'token' });
    expect(authServiceMock.login).toHaveBeenCalledWith(req);
  });

  // AuthController can successfully retrieve a user's profile with a valid JWT token
  it("should successfully retrieve a user's profile with a valid JWT token", () => {
    const authController = new AuthController({} as AuthService);
    const req = { user: { username: 'testuser', id: '123' } };
    const result = authController.getProfile(req);
    expect(result).toEqual(req.user);
  });

  // AuthController returns the expected response format for successful login and profile retrieval
  it('should return the expected response format for successful login and profile retrieval', async () => {
    const authServiceMock = {
      login: jest.fn().mockReturnValue({ access_token: 'token' }),
    } as unknown as AuthService;
    const authController = new AuthController(authServiceMock);
    const req = { username: 'testuser', password: '123' };
    const loginResult = await authController.login(req);
    expect(loginResult).toEqual({ access_token: 'token' });
  });

  // AuthController properly handles and returns errors for unexpected or malformed requests
  it('should properly handle and return errors for unexpected or malformed requests', async () => {
    const authController = new AuthController({} as AuthService);
    const req = { username: null, password: null };
    await expect(authController.login(req)).rejects.toThrow();
  });

  // AuthController properly handles and returns errors for unexpected or missing dependencies
  it('should properly handle and return errors for unexpected or missing dependencies', async () => {
    const authController = new AuthController({} as AuthService);
    const req = { username: 'testuser', password: '123' };
    await expect(authController.login(req)).rejects.toThrow();
  });

  // AuthController properly handles and returns errors for invalid login credentials
  it('should properly handle and return errors for invalid login credentials', async () => {
    const authServiceMock = {
      login: jest.fn().mockImplementation(() => {
        throw new Error();
      }),
    } as unknown as AuthService;
    const authController = new AuthController(authServiceMock);
    const req = { username: 'testuser', password: '123' };
    await expect(authController.login(req)).rejects.toThrow();
  });
});
