import { createContext, useState } from "react";
import { ITemplate } from "../types/Template";
import { steps } from "../data/steps";
import { IStep } from "../types/Step";
import { AppContextState } from "../types/contexts";

export const AppContext = createContext<AppContextState | null>(null);

export const AppProvider = ({
  children,
}: {
  children: any | React.ReactNode;
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<ITemplate>();
  const [creationSteps, setCreationSteps] = useState<IStep[]>(steps);
  const [currentStep, setCurrentStep] = useState(steps[0]);

  return (
    <AppContext.Provider
      value={{
        selectedTemplate,
        setSelectedTemplate,
        creationSteps,
        setCreationSteps,
        currentStep,
        setCurrentStep,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
