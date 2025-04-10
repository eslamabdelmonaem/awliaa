import Stepper from '@component/components/Stepper';
import { StepperProvider } from '@component/contexts/StepperContext';

export default function CompleteRegisteration() {
  return (
    <StepperProvider>
      <Stepper />
    </StepperProvider>
  );
}
