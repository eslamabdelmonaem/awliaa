import { useRouter } from 'next/router';
import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { FormInstance } from 'antd';
import client from '@component/helpers/client';
import { UserType } from '@component/types/user';
import { AuthContextData, LoginValues } from '@component/types/auth';

type ProviderProps = {
  children: ReactNode;
  SSRUser?: UserType | null;
};

export const AuthContext = createContext<AuthContextData>({
  user: null,
  setUser: () => {},
  token: null,
  setToken: () => {},
  login: () => {},
  logout: () => {},
  loading: true,
  authModalVisiablity: false,
  setAuthModalVisiablity: () => {},
  setLoading: () => {},
  redirectUrl: null,
  setRedirectUrl: () => {},
});

export default function AuthContextProvider({ children, SSRUser }: ProviderProps) {
  const [user, setUser] = useState<UserType | null | undefined>(SSRUser);
  const [clientLogin, setClientLogin] = useState(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { t: translate } = useTranslation('common');
  const [authModalVisiablity, setAuthModalVisiablity] = useState<boolean>(false);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const router = useRouter();
  const login = useCallback(
    async (values: LoginValues, form: FormInstance) => {
      setLoading(true);
      await client
        .post(
          `/api/login`,
          { ...values },
          {
            baseURL: router.basePath,
          },
        )
        .then(async (response) => {
          setAuthModalVisiablity(false);
          client.defaults.headers.common.Authorization = `Bearer ${response.data.id_token}`;
          setToken(response.data.id_token);
          setUser(response.data.user as UserType);
          setClientLogin(response.data.user.clientDTO);
          if (
            response.data &&
            response.data.user.userDTO &&
            response.data.user.userDTO.authorities &&
            response.data.user.userDTO.authorities.length >= 0
          ) {
            router.push('/complete-registration');
          }
        })
        .catch((error) => {
          if (error.response.data.message.statusCode === 400) {
            toast.error(translate('login-error'));
          }
        })
        .finally(() => {
          setLoading(false);
          form.resetFields();
        });
    },
    [router, redirectUrl, translate],
  );

  const logout = useCallback(async () => {
    setLoading(true);
    await client
      .get('/api/logout', {
        baseURL: router.basePath,
      })
      .then(() => {
        queryClient.removeQueries({});
        setLoading(false);
        setUser(undefined);
        setClientLogin(null);
        setRedirectUrl('/');
        delete client.defaults.headers.common.Authorization;
        router.replace('/');
      });
  }, [router, queryClient, clientLogin, setUser]);

  const values = useMemo(
    () => ({
      user,
      token,
      clientLogin,
      setClientLogin,
      setToken,
      setUser,
      login,
      logout,
      loading,
      authModalVisiablity,
      setAuthModalVisiablity,
      setLoading,
      redirectUrl,
      setRedirectUrl,
    }),
    [user, clientLogin, token, loading, redirectUrl, authModalVisiablity],
  );

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

AuthContextProvider.defaultProps = {
  SSRUser: undefined,
};

export function useAuth() {
  const context: AuthContextData = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthContextProvider');
  }
  return context;
}
