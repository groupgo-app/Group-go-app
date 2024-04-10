import { useContext } from "react";
import StepProgress from "./StepProgress";
import { AppContext } from "../../contexts/AppContext";
import TemplatePage from "./TemplatePage";
import EventInfoPage from "./EventInfoPage";
import PaymentPage from "./PaymentPage";
import SendInvitationPage from "./SendInvitationPage";
import { Helmet } from "react-helmet";

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
      <Helmet>
        <title>Groupgo | Create</title>
        <meta
          name="description"
          content="Get ready to create astonishing and thrilling events"
        />
        {/* <!-- <meta name="robots" content="index, follow" /> --> */}
        <meta property="og:url" content="https://groupgo.vercel.app/create" />
        <meta property="og:title" content="GroupGo | Create Event" />
        <meta
          property="og:description"
          content="Get ready to create astonishing and thrilling events"
        />
        <meta
          property="og:image"
          content="https://groupgo.vercel.app/site_img.png"
        />
        <meta property="og:site_name" content="GroupGo" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@your_twitter_handle" />
        <meta name="twitter:title" content="Groupgo | Create Event" />
        <meta
          name="twitter:description"
          content="Get ready to create astonishing and thrilling events"
        />
        <meta
          name="twitter:image"
          content="https://www.yourwebsite.com/your-image.jpg"
        />
        <meta
          name="pinterest:description"
          content="Get ready to create astonishing and thrilling events"
        />
        <meta
          name="pinterest:image"
          content="https://groupgo.vercel.app/site_img.png"
        />

        <meta name="linkedin:title" content="Groupgo" />
        <meta
          name="linkedin:description"
          content="Get ready to create astonishing and thrilling events"
        />
        <link rel="canonical" href="https://groupgo.vercel.app/create" />
      </Helmet>
      <StepProgress />

      <div className="w-full max-w-full tablet:w-[60%]">
        {mapping[currentStep!?.page]}
      </div>
    </>
  );
};

export default CreateEvent;
