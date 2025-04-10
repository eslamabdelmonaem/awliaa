import { useMutation } from '@tanstack/react-query';
import client from '../helpers/client';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export default function useVerifyOtp() {
  const router = useRouter();
  const Otp = async (otp: string) => {
    const token = localStorage.getItem('otp_token');
    if (!token) {
      throw new Error('OTP token not found.');
    }
    const res = await client.post(
      'api/verify/otp',
      { otp },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return res.data;
  };

  const mutation = useMutation({
    mutationFn: Otp,
    mutationKey: ['otp-verification'],
    onError: (error: any) => {
      toast.error('error in otp verification');
      console.error('Mutation error:', error);
    },
    onSuccess: () => {
      router.push('/complete-registration');
      localStorage.removeItem('otp_token');
    },
  });

  return {
    otpMutation: mutation,
    userData: mutation.data,
  };
}
