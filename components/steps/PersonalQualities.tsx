import { Form, Input, Select, Radio } from 'antd';
import { useStepperContext } from '../../contexts/StepperContext';
import { useTranslation } from 'react-i18next';
import { CheckboxGroupProps } from 'antd/es/checkbox';

export default function PersonalQualities() {
  const { updateStepData } = useStepperContext();
  const { t: translate } = useTranslation('common');

  const healthConditionOptions: CheckboxGroupProps<string>['options'] = [
    { label: translate('good'), value: 'good' },
    { label: translate('mild disability'), value: 'mildDisability' },
    { label: translate('chronic disease'), value: 'chronicDisease' },
    { label: translate('disabled'), value: 'disabled' },
  ];

  const physiqueOptions: CheckboxGroupProps<string>['options'] = [
    { label: translate('thin'), value: 'thin' },
    { label: translate('fit'), value: 'fit' },
    { label: translate('medium'), value: 'medium' },
    { label: translate('fat'), value: 'fat' },
  ];

  const smokingOptions: CheckboxGroupProps<string>['options'] = [
    { label: translate('smoker'), value: 'smoker' },
    { label: translate('non smoker'), value: 'nonSmoker' },
  ];

  const alcoholOptions: CheckboxGroupProps<string>['options'] = [
    { label: translate('drinking'), value: 'drinking' },
    { label: translate('not drinking'), value: 'notDrinking' },
  ];

  const skinColorOptions: CheckboxGroupProps<string>['options'] = [
    { label: translate('white'), value: 'white' },
    { label: translate('light wheat'), value: 'lightWheat' },
    { label: translate('wheat'), value: 'wheat' },
    { label: translate('light brown'), value: 'lightBrown' },
    { label: translate('brown'), value: 'brown' },
    { label: translate('dark brown'), value: 'darkBrown' },
  ];

  const originOptions: CheckboxGroupProps<string>['options'] = [
    { label: translate('tribal'), value: 'tribal' },
    { label: translate('non tribal'), value: 'nonTribal' },
  ];
  const onFinish = (values: any) => {
    updateStepData({ personalInfo: values });
  };

  return (
    <Form layout="vertical" className="text-xs form-container">
      <div className="form-item-wrapper w-[100%]">
        <Form.Item
          className="user-info-select min-w-[200px]"
          label={translate('age')}
          name="age"
          rules={[{ required: true, message: 'Please select your age!' }]}>
          <Select placeholder={translate('choose age')}>
            {Array.from({ length: 150 }, (_, i) => (
              <Select.Option key={i + 1} value={i + 1}>
                {i + 1}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label={translate('height')}
          name="height"
          rules={[{ required: true, message: 'Please select your height!' }]}
          className="user-info-select min-w-[200px]">
          <Select placeholder={translate('choose height')}>
            {Array.from({ length: 250 }, (_, i) => (
              <Select.Option key={i + 1} value={i + 1}>
                {i + 1}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          label={translate('weight')}
          name="weight"
          rules={[{ required: true, message: 'Please select your weight!' }]}
          className="user-info-select min-w-[200px]">
          <Select placeholder={translate('choose weight')}>
            {Array.from({ length: 350 }, (_, i) => (
              <Select.Option key={i + 1} value={i + 1}>
                {i + 1}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </div>
      <div className="form-item-wrapper w-[100%]">
        <Form.Item
          rules={[{ required: true, message: 'Please select option!' }]}
          label={translate('health condition')}
          name="healthCondition"
          className="xs:w-[100%] lg:w-[50%]">
          <Radio.Group
            className="health-radio-button radio-group-spacing"
            options={healthConditionOptions}
            defaultValue="good"
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item>
        <Form.Item
          label={translate('physique')}
          rules={[{ required: true, message: 'Please select option!' }]}
          name="physique"
          className="xs:w-[100%] lg:w-[50%]">
          <Radio.Group
            className="health-radio-button radio-group-spacing"
            options={physiqueOptions}
            defaultValue="fat"
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item>
      </div>
      <div className="form-item-wrapper w-[100%]">
        <Form.Item
          label={translate('smoking')}
          rules={[{ required: true, message: 'Please select option!' }]}
          name="smoking"
          className="xs:w-[100%] lg:w-[50%]">
          <Radio.Group
            className="addiction-radio-button radio-group-spacing"
            options={smokingOptions}
            defaultValue="nonSmoker"
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item>
        <Form.Item
          label={translate('alcohol')}
          rules={[{ required: true, message: 'Please select option!' }]}
          name="alcohol"
          className="xs:w-[100%] lg:w-[50%]">
          <Radio.Group
            className="addiction-radio-button radio-group-spacing"
            options={alcoholOptions}
            defaultValue="notDrinking"
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item>
      </div>
      <div className="form-item-wrapper w-[100%]">
        <Form.Item
          rules={[{ required: true, message: 'Please select option!' }]}
          label={translate('skin color')}
          name="skinColor"
          className="xs:w-[100%] lg:w-[50%]">
          <Radio.Group
            className="skin-radio-button radio-group-spacing"
            defaultValue="white"
            optionType="button"
            buttonStyle="solid">
            {skinColorOptions.map((option) => {
              if (typeof option === 'object') {
                return (
                  <Radio.Button key={option.value} value={option.value} className={`skin-option ${option.value}`}>
                    {option.label}
                  </Radio.Button>
                );
              }
            })}
          </Radio.Group>
        </Form.Item>
        <Form.Item
          rules={[{ required: true, message: 'Please select option!' }]}
          label={translate('origin')}
          name="origin"
          className="xs:w-[100%] lg:w-[50%]">
          <Radio.Group
            className="addiction-radio-button radio-group-spacing"
            options={originOptions}
            defaultValue="nonTribal"
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item>
      </div>
      <div className="form-item-wrapper w-[100%]">
        <Form.Item
          label={translate('about yourself') + ' ' + '(' + translate('optional') + ')'}
          name="aboutYourself"
          className="xs:w-[100%] lg:w-[50%]">
          <Input className="h-15 w-[620px]" placeholder={translate('about yourself')} />
        </Form.Item>
        <Form.Item
          label={translate('partner specifications') + ' ' + '(' + translate('optional') + ')'}
          name="partnerSpecifications"
          className="xs:w-[100%] lg:w-[50%]">
          <Input className="h-15 w-[620px]" placeholder={translate('partner specifications')} />
        </Form.Item>
      </div>
    </Form>
  );
}
