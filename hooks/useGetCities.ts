import client from '@component/helpers/client';
import { City } from '@component/types/country';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

export default function useGetCities(countryId: string, token: string | null) {
  const { i18n } = useTranslation('common');
  const fetchCities = async () => {
    if (!token) {
      throw new Error('User token not found.');
    }
    const res = await client.get(`/api/admin/users/get-all/cities?countryId=${countryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Accept-Language': i18n.language === 'ar' ? 'ar-ly' : 'en',
      },
    });
    return res.data;
  };

  const { data, refetch } = useQuery<City[]>({
    queryKey: ['cities_data', countryId],
    queryFn: fetchCities,
    enabled: !!countryId,
  });
  return {
    cities: data,
    refetch,
  };
}
