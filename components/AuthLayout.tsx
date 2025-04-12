import React from 'react';
import Header from './header';
import { useTranslation } from 'react-i18next';

interface LayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<LayoutProps> = ({ children }) => {
  const { i18n } = useTranslation('common');

  return (
    <div className="auth-body" lang="ar" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <Header isAuthenticated={false} />
      <div className="auth-content">{children}</div>
    </div>
  );
};

export default AuthLayout;
