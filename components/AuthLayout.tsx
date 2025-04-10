import React from 'react';
import Header from './header';
import Footer from './footer';
import { useTranslation } from 'react-i18next';

interface LayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<LayoutProps> = ({ children }) => {
  const { i18n } = useTranslation('common');

  return (
    <div lang="ar" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <Header isAuthenticated={false} />
      <div className="auth-body">{children}</div>
    </div>
  );
};

export default AuthLayout;
