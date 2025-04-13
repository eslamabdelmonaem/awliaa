import { useMutation } from '@tanstack/react-query';
import client from '../helpers/client';
import { toast } from 'react-toastify';
import { UserResidence } from '@component/components/steps/GeneralInformation';

export default function useAddGroomPersonalInfo(onSuccessCallback?: () => void, token: string | null = null) {
  const AddPersonalInfo = async (userPersonalData: UserResidence) => {
    if (!token) {
      throw new Error('User token not found.');
    }
    const res = await client.post('/api/complete-groom/personal-info', userPersonalData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  };

  const mutation = useMutation({
    mutationFn: AddPersonalInfo,
    mutationKey: ['personal-info'],
    onError: (error: any) => {
      toast.error(error?.response?.data.message);
      console.error('Mutation error:', error);
    },
    onSuccess: () => {
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });

  return {
    groomPersonalInfoMutation: mutation,
  };
}
