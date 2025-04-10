import '@component/styles/globals.css';
import '@component/styles/header.css';
import '@component/styles/footer.css';
import '@component/styles/step-content.css';
import '@component/styles/stepper.css';
import '@component/styles/auth.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import i18n from '../i18n';
import { I18nextProvider } from 'react-i18next';
import Layout from '@component/components/layout';
import { useRouter } from 'next/router';
import AuthLayout from '@component/components/AuthLayout';
import Head from 'next/head';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthContextProvider from '@component/contexts/AuthContext';
import { UserType } from '@component/types/user';
import { ToastContainer } from 'react-toastify';

type AppOwnProps = {
  token?: string;
  SSRUser?: UserType | null;
};

type AppPropsWithLayout = AppProps & AppOwnProps;

export default function App({ Component, pageProps, token, SSRUser }: AppPropsWithLayout) {
  const [queryClient] = useState(() => new QueryClient());
  const router = useRouter();
  const authRoutes = ['/login', '/register', '/forgot-password', '/otp'];
  const isAuthPage = authRoutes.includes(router.pathname);

  const Wrapper = isAuthPage ? AuthLayout : Layout;
  useEffect(() => {
    const currentLocale = localStorage.getItem('current_locale');
    if (currentLocale) {
      i18n.changeLanguage(currentLocale);
    }
  }, [i18n.language]);
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <title>Awliaa</title>
        <link rel="icon" href={'/assets/icons/app-icon.svg'} type="image/x-icon" />
      </Head>
      <ToastContainer />
      <AuthContextProvider SSRUser={SSRUser}>
        <I18nextProvider i18n={i18n}>
          <Wrapper>
            <Component {...pageProps} />
          </Wrapper>
        </I18nextProvider>
      </AuthContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
