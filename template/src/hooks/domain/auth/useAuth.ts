import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { StorageKeys, storage } from '@/storage';
import { AuthService } from './authService';
import type { AuthUser } from './schema';

export type AuthState = {
  isLoading: boolean;
  isAuthenticated: boolean;
  token: string | null;
  user: AuthUser | null;
};

export const useAuthController = () => {
  const client = useQueryClient();
  const [state, setState] = useState<AuthState>({
    isLoading: true,
    isAuthenticated: false,
    token: null,
    user: null,
  });

  useEffect(() => {
    const token = storage.getString(StorageKeys.authToken) ?? null;
    if (!token) {
      setState((s) => ({ ...s, isLoading: false }));
      return;
    }
    // If token exists, try fetching user profile
    void (async () => {
      try {
        setState((s) => ({ ...s, token }));
        const user = await AuthService.me();
        setState({ isLoading: false, isAuthenticated: true, token, user });
      } catch {
        storage.delete(StorageKeys.authToken);
        setState({ isLoading: false, isAuthenticated: false, token: null, user: null });
      }
    })();
  }, []);

  const setAuthToken = useCallback((token: string | null) => {
    if (token) {
      storage.set(StorageKeys.authToken, token);
    } else {
      storage.delete(StorageKeys.authToken);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const { accessToken } = await AuthService.login(email, password);
    setAuthToken(accessToken);
    const user = await AuthService.me();
    setState({ isLoading: false, isAuthenticated: true, token: accessToken, user });
  }, [setAuthToken]);

  const signup = useCallback(async (name: string, email: string, password: string) => {
    const { accessToken } = await AuthService.signup(name, email, password);
    setAuthToken(accessToken);
    const user = await AuthService.me();
    setState({ isLoading: false, isAuthenticated: true, token: accessToken, user });
  }, [setAuthToken]);

  const logout = useCallback(async () => {
    setAuthToken(null);
    setState({ isLoading: false, isAuthenticated: false, token: null, user: null });
    await client.invalidateQueries();
  }, [client, setAuthToken]);

  return useMemo(() => ({ ...state, login, signup, logout }), [state, login, signup, logout]);
};

