import React from "react";
import FormSection from "./FormSection";
import InputField from "../InputField";
import SocialLinkInput from "../SocialLinkInput";
import { IEventData } from "../../types/Event";

const CreatorSection = ({
  eventData,
  eventInfoChange,
  setEventData,
}: {
  eventData: IEventData;
  eventInfoChange: (e: any) => void;
  setEventData: React.Dispatch<React.SetStateAction<IEventData>>;
}) => {
  return (
    <FormSection title="Creator Details">
      <InputField
        id="name"
        type="text"
        label="Creator name"
        name="creatorName"
        placeholder="name"
        required={true}
        value={eventData.eventInfo.creatorName}
        onChange={eventInfoChange}
      />
      <InputField
        id="email"
        type="text"
        label="Email address"
        name="creatorEmail"
        required={true}
        placeholder="Your email address"
        value={eventData.eventInfo.creatorEmail}
        onChange={eventInfoChange}
      />

      <SocialLinkInput
        eventData={eventData!}
        setEventData={setEventData!}
        // toast={toast}
      />
    </FormSection>
  );
};

export default CreatorSection;
