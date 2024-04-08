import { useContext } from "react";
import StepProgress from "./StepProgress";
import { AppContext } from "../../contexts/AppContext";
import TemplatePage from "./TemplatePage";
import EventInfoPage from "./EventInfoPage";
import PaymentPage from "./PaymentPage";
import SendInvitationPage from "./SendInvitationPage";

const CreateEvent = () => {
  let currentStep;
  const appContext = useContext(AppContext);
  if (appContext) {
    ({ currentStep } = appContext);
  }

  const mapping: any = {
    template: <TemplatePage />,
    event: <EventInfoPage />,
    payment: <PaymentPage />,
    invite: <SendInvitationPage />,
  };

  return (
    <>
      <StepProgress />

      <div className="w-full max-w-full tablet:w-[60%]">
        {mapping[currentStep!?.page]}
      </div>
    </>
  );
};

export default CreateEvent;
