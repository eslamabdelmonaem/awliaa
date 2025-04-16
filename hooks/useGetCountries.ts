import client from '@component/helpers/client';
import { Country } from '@component/types/country';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

export default function useGetCountries(token: string | null) {
  const { i18n } = useTranslation('common');
  const fetchCountries = async () => {
    if (!token) {
      throw new Error('User token not found.');
    }
    const res = await client.get('/api/admin/users/get-all/countries', {
      headers: {
        Authorization: `Bearer ${token}`,
        'Accept-Language': i18n.language === 'ar' ? 'ar-ly' : 'en',
      },
    });
    return res.data;
  };

  const { data, refetch } = useQuery<Country[]>({
    queryKey: ['countries_data'],
    queryFn: fetchCountries,
  });
  return {
    countries: data,
    refetch,
  };
}
