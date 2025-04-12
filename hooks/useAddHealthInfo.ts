import { useMutation } from '@tanstack/react-query';
import client from '../helpers/client';
import { toast } from 'react-toastify';
import { UserHealthInfo } from '@component/components/steps/PersonalQualities';

export default function useAddHealthInfo(onSuccessCallback?: () => void, token: string | null = null) {
  const AddHealthInfo = async (userHealthData: UserHealthInfo) => {
    if (!token) {
      throw new Error('User token not found.');
    }
    const res = await client.post('/api/web/complete-groom/health-info', userHealthData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  };

  const mutation = useMutation({
    mutationFn: AddHealthInfo,
    mutationKey: ['health-info'],
    onError: (error: any) => {
      toast.error('error in adding health info');
      console.error('Mutation error:', error);
    },
    onSuccess: () => {
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
  });

  return {
    healthInfoMutation: mutation,
  };
}
