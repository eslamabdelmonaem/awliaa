import React from 'react';
import Header from './header';
import Footer from './footer';
import { useTranslation } from 'react-i18next';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { i18n } = useTranslation('common');

  return (
    <div lang="ar" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen">
      <Header isAuthenticated={true} />
      <div className="layout-content">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
