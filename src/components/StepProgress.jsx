import React, { useContext, useEffect, useState } from "react";
import UncheckedIcon from "./UncheckedIcon";
import imageIllustration from "../assets/images/Three girlfriends drink tea at home and talk.png";
import CheckedIcon from "./CheckedIcon";
import { AppContext } from "../context/AppContext";

const StepProgress = () => {
  const { stepData, setStepData, currentStep, setCurrentStep } =
    useContext(AppContext);

  const markChecked = () => {
    const newStep = stepData.map((step) => {
      if (step.id <= currentStep.id) {
        return { ...step, checked: true };
      } else if (step.id > currentStep.id) {
        return { ...step, checked: false };
      }
    });
    setStepData(newStep);
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
          <p className="font-normal text-black">{`step ${currentStep?.id} of ${stepData?.length}`}</p>
          <div className="flex flex-col gap-8">
            {stepData?.map((step, i) => (
              <div
                className="step_item cursor-pointer"
                key={i}
                title={`Step `}
                onClick={() => {
                  console.log(stepData[i]);
                  return setCurrentStep(step);
                }}
              >
                {step.checked ? <CheckedIcon /> : <UncheckedIcon />}
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
