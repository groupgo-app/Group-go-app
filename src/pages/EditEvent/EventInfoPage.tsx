// import React from "react";
import TemplateEventForm from "../../components/CreateEvent/TemplateEventForm";

const EventInfoPage = ({ event }: any) => {
  return (
    <>
      <TemplateEventForm event={event} />
    </>
  );
};

export default EventInfoPage;
