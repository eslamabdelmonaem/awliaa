import { FormInstance } from 'antd';
import { UserType } from './user';

export type LoginValues = {
  username: string;
  password: string;
};
export type AuthContextData = {
  user?: UserType | null;
  setUser: (user: UserType | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  login: (values: LoginValues, form: FormInstance) => void;
  logout: () => void;
  authModalVisiablity: boolean;
  setAuthModalVisiablity: (modalVisiablity: boolean) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  redirectUrl: string | null;
  setRedirectUrl: (url: string | null) => void;
};
