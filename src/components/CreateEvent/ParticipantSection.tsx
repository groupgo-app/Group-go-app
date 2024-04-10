import { IEventData } from "../../types/Event";
import FormSection from "./FormSection";
import InputField from "../InputField";

const ParticipantSection = ({
  eventData,
  eventInfoChange,
}: {
  eventData: IEventData;
  eventInfoChange: (e: any) => void;
}) => {
  return (
    <FormSection title="Who is attending the event?">
      <InputField
        id="min_num_participant"
        type="number"
        label="Minimum number of participants"
        name="minNumOfParticipant"
        placeholder="Minimum"
        required={true}
        value={eventData.eventInfo.minNumOfParticipant}
        onChange={eventInfoChange}
      />

      <InputField
        id="max_num_participant"
        required={true}
        type="number"
        label="Maximum number of participants"
        name="maxNumOfParticipant"
        placeholder="Maximum"
        value={eventData.eventInfo.maxNumOfParticipant}
        onChange={eventInfoChange}
      />

      <div className="field_set_div">
        <label htmlFor="gender">
          <span className="text-red-500">*</span> Participants gender
        </label>
        <select
          name="typeOfParticipants"
          id="gender"
          className="inputs"
          // type="select"
          value={eventData.eventInfo.typeOfParticipants}
          onChange={eventInfoChange}
        >
          <option value="">select an option</option>
          <option value="males">All male</option>
          <option value="females">All female</option>
          <option value="both genders">Both male and female</option>
        </select>
      </div>
    </FormSection>
  );
};

export default ParticipantSection;
