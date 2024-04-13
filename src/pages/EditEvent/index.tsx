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
import { Helmet } from "react-helmet";

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

        // console.log(JSON.parse(eventData.eventInfo.socialLinks));
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
  useEffect(() => {
    if (event && event.inCreation === false) navigate(`/${event?.eventId}`);
  }, [event]);
  if (event && event.inCreation === true) {
    return (
      <>
        <Helmet>
          <title>Groupgo | Edit Event</title>
          <meta
            name="description"
            data-react-helmet="true"
            content="Get ready to create astonishing and thrilling events"
          />
          {/* <!-- <meta name="robots" data-react-helmet="true" content="index, follow" /> --> */}
          <meta
            property="og:url"
            data-react-helmet="true"
            content="https://groupgo.vercel.app/edit"
          />
          <meta
            property="og:title"
            data-react-helmet="true"
            content="GroupGo | Edit Event"
          />
          <meta
            property="og:description"
            data-react-helmet="true"
            content="Get ready to create astonishing and thrilling events"
          />
          <meta
            property="og:image"
            data-react-helmet="true"
            content="https://groupgo.vercel.app/site_img.png"
          />
          <meta
            property="og:site_name"
            data-react-helmet="true"
            content="GroupGo Edit"
          />

          <meta
            name="twitter:card"
            data-react-helmet="true"
            content="summary_large_image"
          />
          <meta
            name="twitter:site"
            data-react-helmet="true"
            content="@your_twitter_handle"
          />
          <meta
            name="twitter:title"
            data-react-helmet="true"
            content="Groupgo | Edit Event"
          />
          <meta
            name="twitter:description"
            data-react-helmet="true"
            content="Edit your current event"
          />
          <meta
            name="twitter:image"
            data-react-helmet="true"
            content="https://www.yourwebsite.com/your-image.jpg"
          />
          <meta
            name="pinterest:description"
            data-react-helmet="true"
            content="Edit your current event"
          />
          <meta
            name="pinterest:image"
            data-react-helmet="true"
            content="https://groupgo.vercel.app/site_img.png"
          />

          <meta
            name="linkedin:title"
            data-react-helmet="true"
            content="Groupgo"
          />
          <meta
            name="linkedin:description"
            data-react-helmet="true"
            content="Edit your current event"
          />
          <link rel="canonical" href="https://groupgo.vercel.app/edit" />
        </Helmet>
        {/* {event && event.inCreation === false && <></>} */}
        <StepProgress />

        <div className="w-full max-w-full tablet:w-[60%]">
          {mapping[currentStep!?.page]}
        </div>
      </>
    );
  }
  return (
    <>
      {event && event.inCreation === false}
      <StepProgress />

      <div className="w-full max-w-full tablet:w-[60%]">
        {mapping[currentStep!?.page]}
      </div>
    </>
  );
};

export default EditEvent;
