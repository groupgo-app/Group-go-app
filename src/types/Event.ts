// import { ISubLocation } from "./Location";

export type IEventTier = {
  id: string;
  name: string;
  price: number;
  numberOfTickets: number;
};

export type IPayEvent = {
  eventId: string;
  tier?: IEventTier;
  tierIndex?: number;
  hasTier?: boolean;
  amount: number;
  title: string;
};
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
  hasTiers: boolean;
  eventInfo: {
    title: string;
    creatorName: string;
    creatorEmail: string;
    socialLinks: string[] | string;
    eventDesc: string;
    eventLocation: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    maxNumOfParticipant: number;
    minNumOfParticipant: number;
    typeOfParticipants: string;
    amountPerParticipant: number;
    tiers: IEventTier[];
  };
  paymentInfo: {
    bankName: string;
    accountNumber: string | number;
  };
};
