import { Form, Input, Button, Checkbox, Radio, RadioChangeEvent } from 'antd';
import { useTranslation } from 'react-i18next';
import AuthCard from '../components/AuthCard';
import { CheckboxGroupProps } from 'antd/es/checkbox';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { E164Number } from 'libphonenumber-js';
import { useForm } from 'antd/es/form/Form';
import Link from 'next/link';
import { UserRole } from '@component/types/user';
import { useState } from 'react';
import { useAuth } from '@component/contexts/AuthContext';
import { toast } from 'react-toastify';
import { UserTypeDto } from './register';
import { isValidPhoneNumber } from 'react-phone-number-input';
import ar from 'react-phone-number-input/locale/ar';
import en from 'react-phone-number-input/locale/en';
import flags from 'react-phone-number-input/flags';

export default function Login() {
  const { t: translate, i18n } = useTranslation('common');
  const { login } = useAuth();
  const [form] = useForm();
  const [authority, setAuthority] = useState<UserRole>(UserRole.GROOM);
  const [phoneValue, setPhoneValue] = useState<E164Number | undefined>();
  const loginOptions: CheckboxGroupProps<string>['options'] = [
    { label: translate('groom'), value: UserRole.GROOM },
    { label: translate('parent'), value: UserRole.PARENT },
  ];
  const onLoginTypeChange = ({ target: { value } }: RadioChangeEvent) => {
    setAuthority(value);
  };

  const onFinish = async (values: UserTypeDto) => {
    if (login) {
      try {
        await login(
          {
            username: values.mobile || '',
            password: values.password || '',
          },
          form,
        );
      } catch (error: any) {
        toast.error(error?.response?.data.message);
      }
    }
  };
  return (
    <AuthCard
      title={translate('sign in')}
      footerText={translate('dont have account')}
      footerLinkText={translate('sign up')}
      footerLinkHref="/register">
      <Form
        form={form}
        name="login"
        requiredMark="optional"
        onFinish={onFinish}
        layout="vertical"
        className="space-y-6">
        <Form.Item
          initialValue={UserRole.GROOM}
          rules={[{ required: true }]}
          label={translate('you are')}
          name="authority">
          <Radio.Group
            onChange={onLoginTypeChange}
            className="login-type"
            options={loginOptions}
            value={authority}
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item>

        <Form.Item
          rules={[
            {
              validator: (_, value) => {
                if (!value) return Promise.reject(new Error(translate('please enter phone number')));
                return isValidPhoneNumber(value)
                  ? Promise.resolve()
                  : Promise.reject(new Error(translate('enter valid phone number')));
              },
            },
          ]}
          className="phone-input-form"
          name="mobile">
          <PhoneInput
            className={`phone-input ${i18n.language === 'ar' ? 'phone-input-rtl ' : ''}`}
            international
            defaultCountry="EG"
            flags={flags}
            labels={i18n.language === 'ar' ? ar : en}
            value={phoneValue}
            onChange={(val) => {
              setPhoneValue(val);
            }}
          />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: translate('please enter password') }]}>
          <Input.Password className="form-input-field" placeholder={translate('enter password')} />
        </Form.Item>
        <div className="password-wrapper">
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>{translate('remember me')}</Checkbox>
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Link href="#" className="auth-links">
              {translate('forgot password')}
            </Link>
          </Form.Item>
        </div>

        <Form.Item>
          <Button htmlType="submit" className="form-button">
            {translate('sign in')}
          </Button>
        </Form.Item>
      </Form>
    </AuthCard>
  );
}
