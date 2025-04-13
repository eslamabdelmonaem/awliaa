import { createContext, useContext, useState, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface StepperContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  stepData: Record<string, any>;
  updateStepData: (data: Record<string, any>) => void;
}

const StepperContext = createContext<StepperContextType | undefined>(undefined);

export function StepperProvider({ children }: { children: ReactNode }) {
  const [stepData, setStepData] = useState<Record<string, any>>({});
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(user?.currentStep ?? 1);

  const updateStepData = (data: Record<string, any>) => {
    setStepData((prev) => ({ ...prev, ...data }));
  };

  return (
    <StepperContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        stepData,
        updateStepData,
      }}>
      {children}
    </StepperContext.Provider>
  );
}

export function useStepperContext() {
  const context = useContext(StepperContext);
  if (context === undefined) {
    throw new Error('useStepperContext must be used within a StepperProvider');
  }
  return context;
}
