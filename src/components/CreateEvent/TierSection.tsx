import { useState } from "react";
import { IEventData, IEventTier } from "../../types/Event";
import { nanoid } from "nanoid";
import InputField from "../InputField";
import FormSection from "./FormSection";

const TierSection = ({
  eventData,
  setEventData,
  eventInfoChange,
}: {
  eventData: IEventData;
  setEventData: React.Dispatch<React.SetStateAction<IEventData>>;
  eventInfoChange: any;
}) => {
  const [tiers, setTiers] = useState<IEventTier[]>([]);

  const handleHasTiers = (e: any) => {
    const newData: IEventData = { ...eventData, hasTiers: e.target.checked };
    setEventData(newData);
  };
  const handleAddTier = () => {
    setTiers([
      ...tiers,
      { id: nanoid(), name: "", price: 0, numberOfTickets: 0 },
    ]);
    setEventData({
      ...eventData,
      eventInfo: {
        ...eventData.eventInfo,
        tiers: [
          ...tiers,
          { id: nanoid(), name: "", price: 0, numberOfTickets: 0 },
        ],
      },
    });
  };

  const handleRemoveTier = (index: number) => {
    const newTiers = [...tiers];
    newTiers.splice(index, 1);
    setEventData({
      ...eventData,
      eventInfo: { ...eventData.eventInfo, tiers: newTiers },
    });
    setTiers(newTiers);
  };

  const handleNameChange = (e: any, index: number) => {
    const newTiers: IEventTier[] = [...tiers];
    const newTierData: IEventTier = {
      ...newTiers[index],
      name: e.target.value,
    };
    newTiers[index] = newTierData;
    setEventData({
      ...eventData,
      eventInfo: { ...eventData.eventInfo, tiers: newTiers },
    });

    setTiers(newTiers);
  };

  const handleTicketNumberChange = (e: any, index: number) => {
    const newTiers: IEventTier[] = [...tiers];
    const newTierData: IEventTier = {
      ...newTiers[index],
      numberOfTickets: e.target.value,
    };
    newTiers[index] = newTierData;
    setEventData({
      ...eventData,
      eventInfo: { ...eventData.eventInfo, tiers: newTiers },
    });

    setTiers(newTiers);
  };

  const handlePriceChange = (e: any, index: number) => {
    const newTiers: IEventTier[] = [...tiers];
    const newTierData: IEventTier = {
      ...newTiers[index],
      price: e.target.value,
    };
    newTiers[index] = newTierData;
    setEventData({
      ...eventData,
      eventInfo: { ...eventData.eventInfo, tiers: newTiers },
    });
    setTiers(newTiers);
  };

  return (
    <FormSection title="Tiers and Pricing">
      <div className="flex items-center gap-1">
        <h5>Has Tiers?</h5>
        <input type="checkbox" name="" id="" onChange={handleHasTiers} />
      </div>

      {eventData.hasTiers ? (
        <>
          {eventData.eventInfo.tiers?.map((tier, index) => (
            <div key={`tier ${index + 1}`}>
              <InputField
                type={"text"}
                value={tier.name}
                label={`Tier ${index + 1} name`}
                onChange={(e: any) => {
                  handleNameChange(e, index);
                }}
              />
              <InputField
                type="number"
                value={tier.price}
                label={`Tier ${index + 1} price`}
                onChange={(e: any) => {
                  handlePriceChange(e, index);
                }}
              />
              <InputField
                type="number"
                value={tier.numberOfTickets}
                label={`Number of Tickets for Tier ${index + 1}`}
                onChange={(e: any) => {
                  handleTicketNumberChange(e, index);
                }}
              />
              <button
                className="text-red-500 hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  handleRemoveTier(index);
                }}
                type="button"
              >
                Remove
              </button>
            </div>
          ))}
          <div>
            <div
              onClick={() => {
                handleAddTier();
              }}
              role="button"
              className="primary_button w-fit"
            >
              Add tier
            </div>
          </div>
        </>
      ) : (
        <>
          <InputField
            id="amount"
            required={true}
            type="number"
            label="Amount per person"
            name="amountPerParticipant"
            placeholder="0.00 (NGN)"
            value={eventData.eventInfo.amountPerParticipant}
            onChange={eventInfoChange}
          />
        </>
      )}
    </FormSection>
  );
};

export default TierSection;
