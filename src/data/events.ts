import { nanoid } from "nanoid";
import { IEventData } from "../types/Event";

export const initialEventData: IEventData = {
  uid: "",
  eventImg: "",
  totalAmount: 0,
  eventId: nanoid(),
  eventType: "",
  inCreation: true,
  completedSteps: [false, false, false, false],
  numberOfPaidParticipants: 0,
  hasTiers: false,
  eventInfo: {
    title: "",
    creatorName: "",
    creatorEmail: "",
    socialLinks: [],
    eventDesc: "",
    eventLocation: {
      display_name: "",
      lat: "",
      lon: "",
      licence: "",
      place_id: 1,
    },
    tiers: [],
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    maxNumOfParticipant: 10,
    minNumOfParticipant: 1,
    typeOfParticipants: "",

    amountPerParticipant: 0,
  },
  paymentInfo: {
    bankName: "",
    accountNumber: "",
  },
};
