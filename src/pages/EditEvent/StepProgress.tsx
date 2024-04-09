import { useContext, useEffect } from "react";
import UncheckedIcon from "../../components/UncheckedIcon";
import imageIllustration from "./../../assets/images/Three girlfriends drink tea at home and talk.png";
import CheckedIcon from "../../components/CheckedIcon";
import { FormContext } from "../../contexts/FormContext";
import { AppContext } from "../../contexts/AppContext";
import { IStep } from "../../types/Step";
import { IEventData } from "../../types/Event";

const StepProgress = () => {
  let creationSteps, setCreationSteps, currentStep, eventData: IEventData;
  const appContext = useContext(AppContext);
  const formContext = useContext(FormContext);
  if (appContext && formContext) {
    ({ creationSteps, setCreationSteps, currentStep } = appContext);
    ({ eventData } = formContext);
  }

  const markChecked = () => {
    const updatedSteps = creationSteps!.map((step: IStep) => {
      if (eventData.completedSteps[step?.id - 1]) {
        return { ...step, checked: true };
      } else {
        return step;
      }
    });
    setCreationSteps!(updatedSteps);
  };

  useEffect(() => {
    markChecked();
  }, [currentStep]);

  return (
    <>
      <div className="step_progress_container">
        <div className="flex flex-col gap-6">
          <h2 className="capitalize">{currentStep?.step}</h2>
          <p>{currentStep?.about}</p>
          <p className="font-normal text-black">{`step ${currentStep?.id} of ${creationSteps!?.length}`}</p>
          <div className="flex flex-col gap-8">
            {creationSteps!?.map((step: IStep, i: number) => (
              <div
                className="step_item cursor-pointer"
                key={i}
                title={`Step ${step?.id}`}
                // onClick={() => {
                //   setCurrentStep!(step);
                // }}
              >
                {eventData?.completedSteps![step?.id - 1] ? (
                  <CheckedIcon />
                ) : (
                  <UncheckedIcon />
                )}
                <p className="font-light text-black">{step?.step}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <img
            className="hidden tablet:block"
            src={imageIllustration}
            alt="Three girlfriends drink tea at home and talk image illustration"
          />
        </div>
      </div>
    </>
  );
};

export default StepProgress;
