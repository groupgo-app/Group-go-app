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
  eventInfo: {
    title: "",
    creatorName: "",
    creatorEmail: "",
    socialLink: "",
    eventDesc: "",
    eventLocation: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    maxNumOfParticipant: 10,
    minNumOfParticipant: 1,
    typeOfParticipants: "",
    amountPerParticipant: "",
  },
  paymentInfo: {
    bankName: "",
    accountNumber: "",
  },
};
