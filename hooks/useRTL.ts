import { useTranslation } from 'next-i18next';

export const useRTL = () => {
  const { i18n } = useTranslation();

  return {
    isRTL: i18n.language === 'ar',
    direction: i18n.language === 'ar' ? 'rtl' : 'ltr',
    align: i18n.language === 'ar' ? 'right' : 'left',
    start: i18n.language === 'ar' ? 'right' : 'left',
    end: i18n.language === 'ar' ? 'left' : 'right',
  };
};
