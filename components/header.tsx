import { Button } from 'antd';
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { useAuth } from '@component/contexts/AuthContext';

interface IHeaderProps {
  isAuthenticated: boolean;
}

export default function Header({ isAuthenticated }: IHeaderProps) {
  const { t: translate } = useTranslation('common');
  const { user } = useAuth();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('current_locale', lng);
  };
  return (
    <div className="header">
      <div>
        <span className="header-title">{translate('awliaa')}</span>
        <Link href="#" className={`${isAuthenticated ? 'hidden' : 'home-page-text'}`}>
          {translate('home page')}
        </Link>
      </div>
      <div className="user-info-wrapper">
        {user ? (
          <img
            className="user-profile-photo"
            src={user.imageUrl ? user.imageUrl : '/assets/icons/avatar-icon.svg'}
            alt=""
          />
        ) : (
          <Button type="link" href="/register" className="register-button" shape="round">
            {translate('create account')}
          </Button>
        )}
        <Button
          className="language-switcher"
          shape="circle"
          onClick={() => changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')}>
          {i18n.language === 'ar' ? 'En' : 'ع'}
        </Button>
      </div>
    </div>
  );
}
