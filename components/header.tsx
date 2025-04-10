import { Button } from 'antd';
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Link from 'next/link';

interface IHeaderProps {
  isAuthenticated: boolean;
}

export default function Header({ isAuthenticated }: IHeaderProps) {
  const { t: translate } = useTranslation('common');
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('current_locale', lng);
  };
  return (
    <div className="header">
      <div>
        <span className="header-title">{translate('awliaa')}</span>
        <Link href="#" className={`${isAuthenticated && 'hidden'}`}>
          {translate('home page')}
        </Link>
      </div>
      <div className="user-info-wrapper">
        {isAuthenticated ? (
          <Image
            className="user-profile-photo"
            src="/assets/icons/avatar-placeholder.svg"
            alt="avatar-image"
            width={40}
            height={40}
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
