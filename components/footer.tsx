import { useTranslation } from 'react-i18next';
import InstagramIcon from '@icons/instagram-icon.svg';
import SnapchatIcon from '@icons/snapchat-icon.svg';
import XIcon from '@icons/x-icon.svg';
import FacebookIcon from '@icons/facebook-icon.svg';
import TiktokIcon from '@icons/tiktok-icon.svg';
import YoutubeIcon from '@icons/youtube-icon.svg';
import LinkedInIcon from '@icons/linkedIn-icon.svg';
import PhoneIcon from '@icons/phone-icon.svg';
import MailIcon from '@icons/sms-icon.svg';
import LocationIcon from '@icons/location-icon.svg';
import MessageIcon from '@icons/messages-icon.svg';
import { Button } from 'antd';

export default function Footer() {
  const { t: translate } = useTranslation('common');

  return (
    <div className="footer">
      <div className="divider-container">
        <hr className="divider" />
        <span className="message-icon-container">
          <MessageIcon className="message-icon" />
        </span>
      </div>
      <div className="footer-container">
        <div className="footer-details">
          <span className="text-primary_bright text-2xl font-bold">{translate('awliaa')}</span>
          <span className="text-light_gray-300 text-sm">{translate('footer description')}</span>
          <span className="text-sm font-bold">{translate('follow us')}</span>
          <div className="icons-container">
            <Button shape="circle" className="icon-container" icon={<InstagramIcon />} size="large" />
            <Button shape="circle" className="icon-container" icon={<SnapchatIcon />} size="large" />
            <Button shape="circle" className="icon-container" icon={<YoutubeIcon />} size="large" />
            <Button shape="circle" className="icon-container" icon={<TiktokIcon />} size="large" />
            <Button shape="circle" className="icon-container" icon={<XIcon />} size="large" />
            <Button shape="circle" className="icon-container" icon={<FacebookIcon />} size="large" />
            <Button shape="circle" className="icon-container" icon={<LinkedInIcon />} size="large" />
          </div>
        </div>
        <div className="contact-us">
          <span>{translate('contact us')}</span>
          <span className="flex items-center gap-2">
            <PhoneIcon /> +966 55 555 5555 / +966 55 555 5555
          </span>
          <span className="flex items-center gap-2">
            <MailIcon /> example.com
          </span>
          <span className="flex items-center gap-2">
            <LocationIcon /> saudi arabia
          </span>
        </div>
      </div>
      <hr className="divider" />
      <div className="rules-conditions">
        <div className="rules-conditions-buttons">
          <Button type="link" className="rules-conditions-buttons">
            {translate('terms and conditions')}
          </Button>
          <Button type="link" className="rules-conditions-buttons">
            {translate('platform user guide')}
          </Button>
          <Button type="link" className="rules-conditions-buttons">
            {translate('privacy policy')}
          </Button>
        </div>
        <span>{translate('rights reserved')}</span>
      </div>
    </div>
  );
}
