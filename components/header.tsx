import { Button } from 'antd';
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { useAuth } from '@component/contexts/AuthContext';
import { useRouter } from 'next/router';

interface IHeaderProps {
  isAuthenticated: boolean;
}

export default function Header({ isAuthenticated }: IHeaderProps) {
  const { t: translate } = useTranslation('common');
  const { user } = useAuth();
  const router = useRouter();
  const isRegisterPage = router.pathname === '/register';
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('current_locale', lng);
  };
  return (
    <div className="header">
      <div>
        <span className="header-title">{translate('awliaa')}</span>
        <Link id="home-page" href="#" className={`${isAuthenticated ? 'hidden' : 'home-page-text'}`}>
          {translate('home page')}
        </Link>
      </div>
      <div id="user-profile-photo" className="user-info-wrapper">
        {user ? (
          <img
            className="user-profile-photo"
            src={user.imageUrl ? user.imageUrl : '/assets/icons/avatar-icon.svg'}
            alt="profile-photo"
          />
        ) : isRegisterPage ? null : (
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
