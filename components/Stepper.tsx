import { JSX, useEffect, useState } from 'react';
import { Button } from 'antd';
import Form, { FormInstance } from 'antd/es/form';
import PersonalQualities from './steps/PersonalQualities';
import GeneralInformation from './steps/GeneralInformation';
import { useTranslation } from 'react-i18next';
import TickIcon from '@icons/tick-icon.svg';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { useStepperContext } from '@component/contexts/StepperContext';
import MartialStatus from './steps/MartialStatus';

interface Step {
  id: number;
  title: string;
}
type StepRenderer = () => { form?: FormInstance; node: JSX.Element };

const stepComponents: Record<number, StepRenderer> = {
  1: () => {
    const [form] = Form.useForm();
    return {
      form,
      node: <GeneralInformation form={form} />,
    };
  },
  2: () => {
    const [form] = Form.useForm();
    return {
      form,
      node: <PersonalQualities form={form} />,
    };
  },
  3: () => {
    const [form] = Form.useForm();
    return {
      form,
      node: <MartialStatus form={form} />,
    };
  },
};

export default function Stepper() {
  const { t: translate, i18n } = useTranslation('common');
  const steps: Step[] = [
    { id: 1, title: translate('general information') },
    { id: 2, title: translate('personal qualities') },
    { id: 3, title: translate('marital status') },
    { id: 4, title: translate('work study') },
    { id: 5, title: translate('religion') },
    { id: 6, title: translate('attachments') },
  ];
  const { currentStep, setCurrentStep } = useStepperContext();
  const [forms, setForms] = useState<Record<number, FormInstance>>({});

  const handleNext = async () => {
    const currentForm = forms[currentStep];
    try {
      if (currentForm) {
        await currentForm.validateFields();
        currentForm.submit();
      }
      if (!stepComponents[currentStep + 1]) {
        console.warn('No step component exists for the next step.');
        return;
      }
    } catch (error) {
      console.warn('Validation failed:', error);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const { node: StepComponentNode, form } = stepComponents[currentStep]?.() ?? {};
  useEffect(() => {
    if (form) {
      setForms((prev) => ({ ...prev, [currentStep]: form }));
    }
  }, [form, currentStep]);
  return (
    <>
      <div className="stepper">
        <h2 className="text-xl font-bold mb-6">{translate('complete registration')}</h2>
        <div className="flex justify-between">
          {steps.map((step) => (
            <div key={step.id} className={`step-item`}>
              <div
                className={`step-points ${
                  step.id === currentStep
                    ? 'bg-[#0b317c] text-white'
                    : step.id < currentStep
                      ? 'bg-[#34C759]'
                      : 'bg-transparent border-1 border-[#0b317c]  text-[#0b317c]'
                }`}>
                {step.id < currentStep ? <TickIcon /> : step.id}
              </div>
              <span className="text-center sm:text-xs md:text-sm sm:block font-semibold">{step.title}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="stepper-content">
        <div className="step-component"> {StepComponentNode}</div>
        <div className="flex justify-between">
          <Button
            id="back-button"
            icon={i18n?.language === 'ar' ? <ArrowRightOutlined /> : <ArrowLeftOutlined />}
            onClick={handlePrevious}
            className={`${currentStep === 1 ? '!hidden' : 'back-button'}`}>
            {translate('back')}
          </Button>
          <Button
            id="save-and-continue"
            onClick={handleNext}
            htmlType="submit"
            disabled={currentStep === steps.length}
            className="save-button">
            {translate('save and continue')}
          </Button>
        </div>
      </div>
    </>
  );
}
