import { useContext, useEffect, useState } from "react";
import StepProgress from "./StepProgress";
import { AppContext } from "../../contexts/AppContext";
import TemplatePage from "./TemplatePage";
import EventInfoPage from "./EventInfoPage";
import PaymentPage from "./PaymentPage";
import SendInvitationPage from "./SendInvitationPage";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { fetchEventById } from "../../api/events";
import { IEventData } from "../../types/Event";
import { FormContext } from "../../contexts/FormContext";

const EditEvent = () => {
  let currentStep, creationSteps, setCurrentStep, setEventData;
  const appContext = useContext(AppContext);
  const formContext = useContext(FormContext);
  if (appContext && formContext) {
    ({ currentStep, creationSteps, setCurrentStep } = appContext);
    ({ setEventData } = formContext);
  }

  const { eventId } = useParams();
  const [event, setEvent] = useState<IEventData | any>();

  const [searchParams] = useSearchParams();

  const fetchEvent = async () => {
    try {
      if (eventId) {
        const eventData = await fetchEventById(eventId);
        const newEventData = {
          ...eventData,
          eventInfo: {
            ...eventData.eventInfo,
            socialLinks: JSON.parse(eventData.eventInfo.socialLinks),
          },
        };

        const step = searchParams.get("step");
        if (step) setCurrentStep!(creationSteps![Number(step) - 1]);
        setEvent(newEventData);
        setEventData!(newEventData);
      }
    } catch (error) {}
  };
  const navigate = useNavigate();
  useEffect(() => {
    fetchEvent();
  }, []);

  const mapping: any = {
    template: <TemplatePage />,
    event: <EventInfoPage event={event} />,
    payment: <PaymentPage event={event} />,
    invite: <SendInvitationPage event={event} />,
  };

  if (event && event.inCreation === true) {
    return (
      <>
        {/* {event && event.inCreation === false && <></>} */}
        <StepProgress />

        <div className="w-full max-w-full tablet:w-[60%]">
          {mapping[currentStep!?.page]}
        </div>
      </>
    );
  } else if (event) {
    navigate(`/${event?.eventId}`);
  }
  return (
    <>
      {event && event.inCreation === false && <></>}
      <StepProgress />

      <div className="w-full max-w-full tablet:w-[60%]">
        {mapping[currentStep!?.page]}
      </div>
    </>
  );
};

export default EditEvent;
