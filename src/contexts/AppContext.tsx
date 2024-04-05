import { createContext, useState } from "react";
import { ITemplate } from "../types/Template";
import { steps } from "../data/steps";
import { IStep } from "../types/Step";
import { templates } from "../data/templates";

type ContextState = {
  templates?: ITemplate[];
  handleRedirect?: Function;
  selectedTemplate?: ITemplate;
  setSelectedTemplate?: any;
  creationSteps?: IStep[];
  setCreationSteps?: Function;
  currentStep?: IStep;
  setCurrentStep?: Function;
};

export const AppContext = createContext<ContextState>({});

export const AppProvider = ({
  children,
}: {
  children: any | React.ReactNode;
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<ITemplate>();
  const [creationSteps, setCreationSteps] = useState<IStep[]>(steps);
  const [currentStep, setCurrentStep] = useState(steps[0]);
  const templateData = templates;

  const handleRedirect = async (id: any) => {
    const selectTemplate = templateData.find((template) => template.id === id);
    if (!selectTemplate) {
      return;
    } else {
      setSelectedTemplate(selectTemplate);
      setCurrentStep(creationSteps[1]);
    }
  };

  return (
    <AppContext.Provider
      value={{
        templates,
        handleRedirect,
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
