import { Form, Input, Button, Checkbox, Radio, RadioChangeEvent } from 'antd';
import { useTranslation } from 'react-i18next';
import AuthCard from '../components/AuthCard';
import { CheckboxGroupProps } from 'antd/es/checkbox';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useForm } from 'antd/es/form/Form';
import Link from 'next/link';
import { UserRole } from '@component/types/user';
import { useState } from 'react';
import { useAuth } from '@component/contexts/AuthContext';
import { toast } from 'react-toastify';
import { UserTypeDto } from './register';

export default function Login() {
  const { t: translate, i18n } = useTranslation('common');
  const { login } = useAuth();
  const [form] = useForm();
  const [authority, setAuthority] = useState<UserRole>(UserRole.GROOM);
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
      } catch (error) {
        toast.error('error while logging');
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
          className={i18n.language === 'ar' ? 'rtl-phone-input' : ''}
          name="mobile"
          rules={[{ required: true, message: translate('please enter phone number') }]}>
          <PhoneInput
            country="eg"
            enableSearch
            searchStyle={{
              direction: i18n?.language === 'ar' ? 'rtl' : 'ltr',
            }}
            searchPlaceholder={translate('search') || 'search'}
            containerStyle={{
              direction: i18n?.language === 'ar' ? 'rtl' : 'ltr',
              height: '50px',
            }}
            dropdownStyle={{
              direction: i18n?.language === 'ar' ? 'rtl' : 'ltr',
              padding: '0 5px 5px 5px',
              zIndex: '50',
              position: 'absolute',
            }}
            inputStyle={{
              textAlign: i18n?.language === 'ar' ? 'right' : 'left',
              height: '100%',
              width: '100%',
              paddingInline: '60px',
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
