import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { api } from 'services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH_TOKEN_KEY } from 'constants/keys';
import { MeDTO } from 'entities/me/me.dto';
import { Me } from 'entities/me/me';
import { meMapper } from 'mappers/meMapper';

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextState {
  user: Me | null;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(usuario: Me): void;
  isAuthenticate: boolean;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

export const AuthProvider: React.FC = React.memo(({ children }) => {
  const [user, setUser] = useState<Me | null>(null);
  const isAuthenticate = !!user;

  const getUserAuthenticate = useCallback(async (token: string) => {
    api.defaults.headers.common.Authorization = token;

    const response = await api.get<MeDTO>(`sessions/me`);

    const userMapped = meMapper(response.data);

    setUser(userMapped);
  }, []);

  useEffect(() => {
    async function shouldGetUserAuthenticate() {
      const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
      if (token !== null) {
        getUserAuthenticate(token);
      }
    }

    shouldGetUserAuthenticate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signIn = useCallback(
    async data => {
      const {
        data: { token },
      } = await api.post(`/sessions`, data);

      await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);

      getUserAuthenticate(token);
    },
    [getUserAuthenticate],
  );

  const signOut = useCallback(() => {
    console.log('signOut');
  }, []);

  const updateUser = useCallback((usuario: Me) => {
    console.log(usuario);
  }, []);

  const dataProvider = useMemo(() => {
    return {
      user,
      signIn,
      signOut,
      updateUser,
      isAuthenticate,
    };
  }, [signIn, signOut, updateUser, user, isAuthenticate]);

  return (
    <AuthContext.Provider value={dataProvider}>{children}</AuthContext.Provider>
  );
});

export function useAuth(): AuthContextState {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used whithin an AuthProvider');
  }

  return context;
}
