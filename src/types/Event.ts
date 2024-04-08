import { ISubLocation } from "./Location";

export type IEventData = {
  id?: string;
  uid: string;
  eventImg: string;
  totalAmount: number;
  eventId: string;
  eventType: string;
  inCreation: boolean;
  numberOfPaidParticipants: number;
  completedSteps: [boolean, boolean, boolean, boolean];
  eventInfo: {
    title: string;
    creatorName: string;
    creatorEmail: string;
    socialLinks: string[] | string;
    eventDesc: string;
    eventLocation: ISubLocation;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    maxNumOfParticipant: number;
    minNumOfParticipant: number;
    typeOfParticipants: string;
    amountPerParticipant: number;
  };
  paymentInfo: {
    bankName: string;
    accountNumber: string | number;
  };
};
