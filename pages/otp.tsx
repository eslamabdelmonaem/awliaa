import { Form, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import AuthCard from '../components/AuthCard';
import { useForm } from 'antd/es/form/Form';
import OtpInput from 'react-otp-input';
import { useEffect, useState } from 'react';
import BackButton from '@icons/arrow-left-icon.svg';
import useVerifyOtp from '@component/hooks/useVerifyOtp';
import { useAuth } from '@component/contexts/AuthContext';

const RESEND_INTERVAL = 120;

export type OtpForm = {
  otp: string;
};

export default function OTP() {
  const { t: translate } = useTranslation('common');
  const { otpMutation, userData } = useVerifyOtp();
  const { setUser, setToken } = useAuth();
  const [form] = useForm();
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(RESEND_INTERVAL);
  //   const [isResendEnabled, setIsResendEnabled] = useState(false);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      //   setIsResendEnabled(true);
    }
  }, [timeLeft]);

  //   const handleResend = () => {
  //     console.log('OTP resent');
  //     setTimeLeft(RESEND_INTERVAL);
  //     setIsResendEnabled(false);
  //   };
  useEffect(() => {
    if (otpMutation.isSuccess && userData) {
      setUser(userData.user);
      setToken(userData.token);
      localStorage.setItem('user_token', userData.token);
    }
  }, [otpMutation.isSuccess, userData, setUser]);
  const formatTime = (seconds: number) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  const onFinish = async (values: OtpForm) => {
    otpMutation.mutate(values.otp);
  };
  return (
    <AuthCard footerText={formatTime(timeLeft)}>
      <Form form={form} name="login" onFinish={onFinish} layout="vertical" className="space-y-6">
        <h2 className="confirm-mobile-header">
          <Button type="link" href="/register" icon={<BackButton />} /> {translate('confirm mobile')}
        </h2>
        <Form.Item
          name="otp"
          rules={[{ required: true, message: translate('please enter password') }]}
          className="flex items-center justify-center">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            // inputType="number"
            shouldAutoFocus
            inputStyle={{
              width: '48px',
              height: '48px',
              margin: '0 12px',
              fontSize: '18px',
              borderRadius: 8,
              border: '1px solid #ccc',
            }}
            renderInput={(props) => <input {...props} />}
          />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit" className="form-button">
            {translate('confirm')}
          </Button>
        </Form.Item>
      </Form>
    </AuthCard>
  );
}
