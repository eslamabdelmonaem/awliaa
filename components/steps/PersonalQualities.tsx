import { Form, Input, Select, Radio, FormInstance } from 'antd';
import { useStepperContext } from '../../contexts/StepperContext';
import { useTranslation } from 'react-i18next';
import { CheckboxGroupProps } from 'antd/es/checkbox';
import {
  BeautyLevel,
  GroomPhysiqueStatus,
  HealthStatus,
  PhysiqueStatus,
  SkinColor,
} from '@component/types/user-details';
import useAddGroomHealthInfo from '@component/hooks/useAddGroomHealthInfo';
import { useAuth } from '@component/contexts/AuthContext';
import useAddParentHealthInfo from '@component/hooks/useAddParentHealthInfo';
import { UserRole } from '@component/types/user';

export type UserHealthInfo = {
  age: number;
  height: number;
  weight: number;
  healthStatus: HealthStatus;
  physique: GroomPhysiqueStatus | PhysiqueStatus;
  isSmoking: boolean;
  isAlchohol: boolean;
  skinColor: SkinColor;
  beautyLevel?: BeautyLevel;
};

export default function GeneralInformation({ form }: { form: FormInstance }) {
  const { updateStepData, currentStep, setCurrentStep } = useStepperContext();
  const { token, user } = useAuth();
  const { t: translate } = useTranslation('common');
  const handleSuccess = () => {
    setCurrentStep(currentStep + 1);
  };

  const { groomHealthInfoMutation } = useAddGroomHealthInfo(handleSuccess, token);
  const { parentHealthInfoMutation } = useAddParentHealthInfo(handleSuccess, token);

  const healthConditionOptions: CheckboxGroupProps<string>['options'] = [
    { label: translate('good'), value: HealthStatus.HEALTHY },
    { label: translate('mild disability'), value: HealthStatus.MILD_DISABILITY },
    { label: translate('chronic disease'), value: HealthStatus.CHRONIC_DISEASE },
    { label: translate('disabled'), value: HealthStatus.PEOPLE_OF_DETERMINATION },
  ];

  const beautyLevelOptions: CheckboxGroupProps<string>['options'] = [
    { label: translate('normal'), value: BeautyLevel.NORMAL },
    { label: translate('beautiful'), value: BeautyLevel.BEAUTIFUL },
    { label: translate('very beautiful'), value: BeautyLevel.VERY_BEAUTIFUL },
    { label: translate('super beautiful'), value: BeautyLevel.SUPER_BEAUTIFUL },
  ];

  const groomPhysiqueOptions: CheckboxGroupProps<string>['options'] = [
    { label: translate('thin'), value: GroomPhysiqueStatus.SLIM },
    { label: translate('fit'), value: GroomPhysiqueStatus.ATHLETE },
    { label: translate('medium'), value: GroomPhysiqueStatus.MEDIUM },
    { label: translate('fat'), value: GroomPhysiqueStatus.OVER_WEIGHT },
  ];

  const physiqueOptions: CheckboxGroupProps<string>['options'] = [
    { label: translate('very slim'), value: PhysiqueStatus.VERY_SLIM },
    { label: translate('feminine slim'), value: PhysiqueStatus.SLIM },
    { label: translate('feminine medium'), value: PhysiqueStatus.MEDIUM },
    { label: translate('feminine full'), value: PhysiqueStatus.FULL },
    { label: translate('feminine overweight'), value: PhysiqueStatus.OVER_WEIGHT },
  ];

  const smokingOptions: CheckboxGroupProps<boolean>['options'] = [
    { label: translate('smoker'), value: true },
    { label: translate('non smoker'), value: false },
  ];

  const alcoholOptions: CheckboxGroupProps<boolean>['options'] = [
    { label: translate('drinking'), value: true },
    { label: translate('not drinking'), value: false },
  ];

  const skinColorOptions: CheckboxGroupProps<string>['options'] = [
    { label: translate('white'), value: SkinColor.WHITE },
    { label: translate('light wheat'), value: SkinColor.LIGHT_TAN },
    { label: translate('wheat'), value: SkinColor.TAN },
    { label: translate('light brown'), value: SkinColor.MEDIUM_BROWN },
    { label: translate('brown'), value: SkinColor.BROWN },
    { label: translate('dark brown'), value: SkinColor.DARK_BROWN },
  ];

  const originOptions: CheckboxGroupProps<string>['options'] = [
    { label: translate('tribal'), value: 'tribal' },
    { label: translate('non tribal'), value: 'nonTribal' },
  ];
  const onFinish = async (values: UserHealthInfo) => {
    const baseData = {
      age: values.age,
      height: values.height,
      weight: values.weight,
      healthStatus: values.healthStatus,
      physique: values.physique,
      isSmoking: values.isSmoking,
      isAlchohol: values.isAlchohol,
      skinColor: values.skinColor,
    };
    if (user?.authorities?.some((auth) => auth.name === UserRole.GROOM)) {
      updateStepData(baseData);
      await groomHealthInfoMutation.mutateAsync(baseData);
    } else {
      const extendedData = {
        ...baseData,
        beautyLevel: values.beautyLevel,
      };
      updateStepData(extendedData);
      await parentHealthInfoMutation.mutateAsync(extendedData);
    }
  };

  return (
    <Form
      initialValues={{
        age: user?.age,
        height: user?.height,
        weight: user?.weight,
        isSmoking: user?.isSmoking,
        isAlchohol: user?.isAlchohol,
        skinColor: user?.skinColor,
      }}
      form={form}
      requiredMark={false}
      onFinish={onFinish}
      layout="vertical"
      className="text-xs form-container">
      <div className="form-item-wrapper w-[100%]">
        <div className="w-[50%] flex gap-x-4">
          <Form.Item
            className="user-info-select w-[15%] min-w-[190px]"
            label={translate('age')}
            name="age"
            rules={[{ required: true, message: translate('please select age') }]}>
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
            rules={[{ required: true, message: translate('please select height') }]}
            className="user-info-select w-[15%] min-w-[190px]">
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
            rules={[{ required: true, message: translate('please select weight') }]}
            className="user-info-select w-[15%] min-w-[190px]">
            <Select placeholder={translate('choose weight')}>
              {Array.from({ length: 350 }, (_, i) => (
                <Select.Option key={i + 1} value={i + 1}>
                  {i + 1}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        {user?.authorities?.some((auth) => auth.name === UserRole.PARENT) && (
          <Form.Item
            initialValue={BeautyLevel.BEAUTIFUL}
            label={translate('beauty level')}
            name="beautyLevel"
            rules={[{ required: true, message: translate('please select beauty level') }]}
            className="xs:w-[100%] lg:w-[50%]">
            <Radio.Group
              className="health-radio-button radio-group-spacing"
              options={beautyLevelOptions}
              optionType="button"
              buttonStyle="solid"
            />
          </Form.Item>
        )}
      </div>
      <div className="form-item-wrapper w-[100%]">
        <Form.Item
          initialValue={HealthStatus.HEALTHY}
          label={translate('health condition')}
          name="healthStatus"
          className="xs:w-[100%] lg:w-[50%]">
          <Radio.Group
            className="health-radio-button radio-group-spacing"
            options={healthConditionOptions}
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item>
        {user?.authorities?.some((auth) => auth.name === UserRole.GROOM) ? (
          <Form.Item
            initialValue={GroomPhysiqueStatus.ATHLETE}
            label={translate('physique')}
            name="physique"
            className="xs:w-[100%] lg:w-[50%]">
            <Radio.Group
              className="health-radio-button radio-group-spacing"
              options={groomPhysiqueOptions}
              optionType="button"
              buttonStyle="solid"
            />
          </Form.Item>
        ) : (
          <Form.Item
            initialValue={PhysiqueStatus.MEDIUM}
            label={translate('physique')}
            name="physique"
            className="xs:w-[100%] lg:w-[50%]">
            <Radio.Group
              className="parent-health-radio-button radio-group-spacing"
              options={physiqueOptions}
              optionType="button"
              buttonStyle="solid"
            />
          </Form.Item>
        )}
      </div>
      <div className="form-item-wrapper w-[100%]">
        <Form.Item
          initialValue={false}
          label={translate('smoking')}
          name="isSmoking"
          className="xs:w-[100%] lg:w-[50%]">
          <Radio.Group
            className="addiction-radio-button radio-group-spacing"
            options={smokingOptions}
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item>
        <Form.Item
          label={translate('alcohol')}
          initialValue={false}
          name="isAlchohol"
          className="xs:w-[100%] lg:w-[50%]">
          <Radio.Group
            className="addiction-radio-button radio-group-spacing"
            options={alcoholOptions}
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item>
      </div>
      <div className="form-item-wrapper w-[100%]">
        <Form.Item
          label={translate('skin color')}
          initialValue={SkinColor.WHITE}
          name="skinColor"
          className="xs:w-[100%] lg:w-[50%]">
          <Radio.Group className="skin-radio-button radio-group-spacing" optionType="button" buttonStyle="solid">
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
        <Form.Item label={translate('origin')} name="origin" className="xs:w-[100%] lg:w-[50%]">
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
