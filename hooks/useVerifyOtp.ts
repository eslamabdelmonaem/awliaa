import { useMutation } from '@tanstack/react-query';
import client from '../helpers/client';
import { useRouter } from 'next/router';

export default function useVerifyOtp() {
  const router = useRouter();
  const Otp = async (otp: string) => {
    try {
      const res = await client.post('api/verify/otp', { otp });
      if (res.status === 200 || res.status === 201) {
        router.push('/complete-registration');
      }
      return res.data;
    } catch (error) {
      console.error('Error verifying OTP:', error);
      throw new Error('OTP verification failed');
    }
  };

  const mutation = useMutation({
    mutationFn: Otp,
    mutationKey: ['otp-verification'],
    onError: (error: any) => {
      console.error('Mutation error:', error);
    },
    onSuccess: () => {
      router.push('/complete-registration');
    },
  });

  return {
    otpMutation: mutation,
  };
}
