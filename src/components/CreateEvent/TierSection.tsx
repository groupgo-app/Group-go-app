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
  const [showAddAmount, setShowAddAmount] = useState(true);

  const handleHasTiers = (e: any) => {
    const newData: IEventData = {
      ...eventData,
      hasTiers: e.target.checked,
      eventInfo: {
        ...eventData.eventInfo,
        tiers: e.target.checked ? eventData.eventInfo.tiers : [],
      },
    };
    setEventData(newData);
  };
  function sumNumbersInObjects(arr: IEventTier[]) {
    let totalSum = 0;
    for (const obj of arr) {
      if (obj.hasOwnProperty("numberOfTickets")) {
        // Check if "number" property exists
        totalSum += Number(obj.numberOfTickets);
      }
    }
    return totalSum;
  }

  const handleAddTier = () => {
    setTiers([
      ...tiers,
      {
        id: nanoid(),
        name: "",
        price: "0",
        numberOfTickets: 0,
        description: "",
      },
    ]);
    setEventData({
      ...eventData,
      eventInfo: {
        ...eventData.eventInfo,
        tiers: [
          ...tiers,
          {
            id: nanoid(),
            name: "",
            price: "0",
            numberOfTickets: 0,
            description: "",
          },
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

  const handleDescriptionChange = (e: any, index: number) => {
    const newTiers: IEventTier[] = [...tiers];
    const newTierData: IEventTier = {
      ...newTiers[index],
      description: e.target.value,
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
    const totalSum = sumNumbersInObjects(newTiers);

    setEventData({
      ...eventData,
      eventInfo: {
        ...eventData.eventInfo,
        tiers: newTiers,
        amountPerParticipant:
          totalSum === eventData.eventInfo.maxNumOfParticipant
            ? 1
            : eventData.eventInfo.amountPerParticipant,
      },
    });

    setTiers(newTiers);

    if (totalSum === eventData.eventInfo.maxNumOfParticipant) {
      setShowAddAmount(false);
    } else {
      setShowAddAmount(true);
    }
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
      {showAddAmount && (
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
      )}

      <div className="flex flex-col gap-3 justify-center">
        <p className="text-xs">
          Tick the checkbox below if you have categories or tiers for this
          event.
        </p>
        <div className="flex gap-2 items-center">
          <h5>Has Tiers?</h5>
          <input
            type="checkbox"
            name=""
            id=""
            onChange={handleHasTiers}
            checked={eventData.hasTiers}
          />
        </div>
        <p className="text-xs">
          Please note that when the total number of spaces of all the tiers is
          equal to the maximum number of participants, the event will
          automatically be a tiered/categorised event.
        </p>
      </div>

      {eventData.hasTiers && (
        <>
          <h3>Tiers</h3>
          {eventData.eventInfo.tiers?.map((tier, index) => (
            <div key={`tier ${index + 1}`}>
              <InputField
                type={"text"}
                value={tier.name}
                label={`Tier ${index + 1} name`}
                required
                onChange={(e: any) => {
                  handleNameChange(e, index);
                }}
              />
              <InputField
                type="text"
                value={tier.price}
                label={`Tier ${index + 1} price`}
                required
                onChange={(e: any) => {
                  handlePriceChange(e, index);
                }}
              />
              <InputField
                type="textarea"
                value={tier.description}
                label={`A good description for tier ${index + 1}`}
                onChange={(e: any) => {
                  handleDescriptionChange(e, index);
                }}
                required
              />
              <InputField
                type="number"
                value={tier.numberOfTickets}
                label={`Number of spaces available for Tier ${index + 1}`}
                required
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
      )}
    </FormSection>
  );
};

export default TierSection;
