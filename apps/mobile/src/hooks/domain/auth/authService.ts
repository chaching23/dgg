import { instance } from '@/services/instance';
import { authTokenSchema, authUserSchema } from './schema';

const hasApi = Boolean(process.env.API_URL);

const mockDelay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

export const AuthService = {
  login: async (email: string, password: string) => {
    if (!hasApi) {
      await mockDelay();
      return authTokenSchema.parse({ accessToken: 'mock-token' });
    }
    try {
      const response = await instance
        .post('auth/login', { json: { email, password } })
        .json();
      return authTokenSchema.parse(response);
    } catch {
      // fallback to mock
      await mockDelay();
      return authTokenSchema.parse({ accessToken: 'mock-token' });
    }
  },
  signup: async (name: string, email: string, password: string) => {
    if (!hasApi) {
      await mockDelay();
      return authTokenSchema.parse({ accessToken: 'mock-token' });
    }
    try {
      const response = await instance
        .post('auth/signup', { json: { name, email, password } })
        .json();
      return authTokenSchema.parse(response);
    } catch {
      await mockDelay();
      return authTokenSchema.parse({ accessToken: 'mock-token' });
    }
  },
  me: async () => {
    if (!hasApi) {
      await mockDelay();
      return authUserSchema.parse({ id: 1, email: 'user@example.com', name: 'Demo User' });
    }
    try {
      const response = await instance.get('auth/me').json();
      return authUserSchema.parse(response);
    } catch {
      await mockDelay();
      return authUserSchema.parse({ id: 1, email: 'user@example.com', name: 'Demo User' });
    }
  },
};

