import { Form, Input, Select } from 'antd';
import { useStepperContext } from '../../contexts/StepperContext';
import { useTranslation } from 'react-i18next';

export default function GeneralInformation() {
  const { updateStepData } = useStepperContext();
  const { t: translate } = useTranslation('common');

  const onFinish = (values: any) => {
    updateStepData({ personalInfo: values });
  };

  return (
    <Form layout="vertical" className="form-container">
      <div className="form-item-wrapper w-[100%]">
        <Form.Item
          label={translate('nationality')}
          name="nationality"
          rules={[{ required: true, message: 'Please select your nationality!' }]}
          className="user-info-select w-[50%]">
          <Select placeholder={translate('nationality')}>
            <Select.Option value="sample">Sample</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label={translate('residence country')}
          name="residence country"
          className="user-info-select w-[50%]"
          rules={[{ required: true, message: 'Please select country!' }]}>
          <Select placeholder={translate('residence country')}>
            <Select.Option value="sample">Sample</Select.Option>
          </Select>
        </Form.Item>
      </div>
      <Form.Item
        rules={[{ required: true, message: 'Please select city!' }]}
        label={translate('residence city')}
        name="residence city"
        className="user-info-select w-[50%]">
        <Select placeholder={translate('residence city')}>
          <Select.Option value="sample">Sample</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  );
}
