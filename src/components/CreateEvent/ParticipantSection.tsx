import { IEventData } from "../../types/Event";
import FormSection from "./FormSection";
import InputField from "../InputField";
import { sumTierTickets } from "../../utils/numbers";

const ParticipantSection = ({
  eventData,
  eventInfoChange,
  setShowAddAmount,
  setEventData,
}: {
  eventData: IEventData;
  eventInfoChange: (e: any) => void;
  setShowAddAmount: React.Dispatch<React.SetStateAction<boolean>>;
  setEventData: React.Dispatch<React.SetStateAction<IEventData>>;
}) => {
  const handleChange = (e: any) => {
    if (Number(e.target.value) === sumTierTickets(eventData.eventInfo.tiers)) {
      const newEventData: IEventData = {
        ...eventData,
        eventInfo: {
          ...eventData.eventInfo,
          amountPerParticipant: 0,
        },
      };
      setEventData(newEventData);

      setShowAddAmount(false);
    } else {
      setShowAddAmount(true);
    }
    eventInfoChange(e);
  };
  return (
    <FormSection title="Who is attending the event?">
      <InputField
        id="min_num_participant"
        type="number"
        inputmode="numeric"
        pattern="[0-9]*"
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
        inputmode="numeric"
        pattern="[0-9]*"
        label="Maximum number of participants"
        name="maxNumOfParticipant"
        placeholder="Maximum"
        value={eventData.eventInfo.maxNumOfParticipant}
        onChange={handleChange}
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
