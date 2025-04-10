import { JSX, useState } from 'react';
import { Button } from 'antd';
import PersonalQualities from './steps/PersonalQualities';
import GeneralInformation from './steps/GeneralInformation';
import { useTranslation } from 'react-i18next';
import TickIcon from '@icons/tick-icon.svg';
import LeftArrow from '@icons/arrow-left-icon.svg';

interface Step {
  id: number;
  title: string;
}

const stepComponents: Record<number, () => JSX.Element> = {
  1: GeneralInformation,
  2: PersonalQualities,
};

export default function Stepper() {
  const { t: translate } = useTranslation('common');
  const steps: Step[] = [
    { id: 1, title: translate('general information') },
    { id: 2, title: translate('personal qualities') },
    { id: 3, title: translate('marital status') },
    { id: 4, title: translate('work study') },
    { id: 5, title: translate('religion') },
    { id: 6, title: translate('attachments') },
  ];
  const [currentStep, setCurrentStep] = useState<number>(1);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const StepComponent = stepComponents[currentStep];

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
              <span className="text-center sm:text-xs md:text-sm sm:block">{step.title}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="stepper-content">
        <div className="step-component"> {StepComponent && <StepComponent />} </div>
        <div className="flex justify-between">
          <Button
            icon={<LeftArrow />}
            onClick={handlePrevious}
            className={`${currentStep === 1 ? '!hidden' : 'back-button'}`}>
            {translate('back')}
          </Button>
          <Button onClick={handleNext} disabled={currentStep === steps.length} className="save-button">
            {translate('save and continue')}
          </Button>
        </div>
      </div>
    </>
  );
}
