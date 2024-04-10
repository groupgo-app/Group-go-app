import FormSection from "./FormSection";
import EventSchedule from "../EventSchedule";
import { IEventData } from "../../types/Event";

const TimeSection = ({
  eventData,
  eventInfoChange,
}: {
  eventData: IEventData;
  eventInfoChange: (e: any) => void;
}) => {
  return (
    <FormSection title="When is the event?">
      <EventSchedule
        eventInfo={eventData.eventInfo}
        handleChangeForEventInfo={eventInfoChange}
      />
    </FormSection>
  );
};

export default TimeSection;
