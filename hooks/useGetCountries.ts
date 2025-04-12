import client from '@component/helpers/client';
import { Country } from '@component/types/country';
import { useQuery } from '@tanstack/react-query';

export default function useGetCountries(token: string | null) {
  const fetchCountries = async () => {
    if (!token) {
      throw new Error('User token not found.');
    }
    const res = await client.get('/api/admin/users/get-all/countries', {
      headers: {
        Authorization: `Bearer ${token}`,
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
