import { Form, Input, Button, Checkbox, Radio, RadioChangeEvent } from 'antd';
import { useTranslation } from 'react-i18next';
import AuthCard from '../components/AuthCard';
import { CheckboxGroupProps } from 'antd/es/checkbox';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useForm } from 'antd/es/form/Form';
import Link from 'next/link';
import useStoreUser from '@component/hooks/register';
import { UserRole, UserType } from '@component/types/user';
import { useState } from 'react';

export type UserTypeDto = {
  username?: string;
  mobile?: string;
  authority?: UserRole;
  password?: string;
};

export default function Register() {
  const { t: translate, i18n } = useTranslation('common');
  const { setUserData } = useStoreUser();
  const [form] = useForm();
  const [authority, setAuthority] = useState<UserRole>(UserRole.GROOM);

  const onLoginTypeChange = ({ target: { value } }: RadioChangeEvent) => {
    setAuthority(value);
  };
  const loginOptions: CheckboxGroupProps<UserRole>['options'] = [
    { label: translate('groom'), value: UserRole.GROOM },
    { label: translate('parent'), value: UserRole.PARENT },
  ];

  const onFinish = async (values: UserTypeDto) => {
    const user: UserType = {
      username: values.username,
      mobile: values.mobile,
      authority: values.authority,
      password: values.password,
    };
    setUserData(user);
  };

  return (
    <AuthCard
      title={translate('sign up')}
      footerText={translate('already have account')}
      footerLinkText={translate('sign in')}
      footerLinkHref="/login">
      <Form
        requiredMark="optional"
        form={form}
        name="register"
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

        <Form.Item name="username" rules={[{ required: true, message: translate('please enter username') }]}>
          <Input className="form-input-field" placeholder={translate('enter username')} />
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
        <Form.Item
          name="termsAndConditions"
          rules={[{ required: true, message: translate('please select option') }]}
          valuePropName="checked">
          <Checkbox>
            <span className="text-[#6D6D6D] font-medium">{translate('accept')}</span>{' '}
            <Link href="#">{translate('terms and conditions')}</Link>
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" className="form-button">
            {translate('sign up')}{' '}
          </Button>
        </Form.Item>
      </Form>
    </AuthCard>
  );
}
