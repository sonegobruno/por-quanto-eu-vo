/* eslint-disable react/jsx-no-useless-fragment */
import React, {
  createContext,
  ReactNode,
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
import { LoadingPage } from 'shared/components/LoadingPage';
import { apiResponseErrors } from 'shared/utils/apiResponseErrors';

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
  loadingUser: boolean;
}

const AuthContext = createContext<AuthContextState>({} as AuthContextState);

interface Children {
  children: ReactNode;
  loadingUser: boolean;
}

function Children({ children, loadingUser }: Children): JSX.Element {
  if (loadingUser) return <LoadingPage />;

  return <>{children}</>;
}

interface Props {
  children: ReactNode;
}

export const AuthProvider: React.FC<Props> = React.memo(({ children }) => {
  const [user, setUser] = useState<Me | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
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
      try {
        if (token !== null) {
          await getUserAuthenticate(token);
        }
      } catch (err) {
        apiResponseErrors(err);
      } finally {
        setLoadingUser(false);
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

  const signOut = useCallback(async () => {
    setUser(null);
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
    api.defaults.headers.common.Authorization = '';
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
      loadingUser,
    };
  }, [signIn, signOut, updateUser, user, isAuthenticate, loadingUser]);

  return (
    <AuthContext.Provider value={dataProvider}>
      <Children loadingUser={loadingUser}>{children}</Children>
    </AuthContext.Provider>
  );
});

export function useAuth(): AuthContextState {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used whithin an AuthProvider');
  }

  return context;
}
