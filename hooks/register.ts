import client from '@component/helpers/client';
import { UserType } from '@component/types/user';
import axios, { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function useStoreUser() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserType | null>(null);
  const [storeResponse, setStoreResponse] = useState<AxiosResponse | null>(null);
  const [storeError, setStoreError] = useState<string | null>(null);
  const [storeLoading, setStoreLoading] = useState<boolean>(false);
  const callAPI = useCallback(async (newUserData: UserType) => {
    setStoreError(null);
    try {
      setStoreLoading(true);
      const response = await client.post('/api/user/register', newUserData);
      if (response.status === 200 || 201) {
        toast.success('registered successfully');
        router.push('/otp');
        setStoreResponse(response);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setStoreError(error.message);
        toast.error('error while registering');
        // router.push('/demographic');
      }
    } finally {
      setStoreLoading(false);
      setUserData(null);
    }
  }, []);

  useEffect(() => {
    if (userData) {
      if (userData.login) {
        userData.mobile = userData.login;
      }
      setStoreResponse(null);
      callAPI(userData);
    }
  }, [userData, callAPI]);

  return { storeResponse, storeError, storeLoading, setUserData };
}
