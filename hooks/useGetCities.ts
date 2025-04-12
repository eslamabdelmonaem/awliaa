import client from '@component/helpers/client';
import { City } from '@component/types/country';
import { useQuery } from '@tanstack/react-query';

export default function useGetCities(countryId: string, token: string | null) {
  const fetchCities = async () => {
    if (!token) {
      throw new Error('User token not found.');
    }
    const res = await client.get(`/api/admin/users/get-all/cities?countryId=${countryId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
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
