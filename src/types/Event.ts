export type IEventData = {
  id?: string;
  uid: string;
  eventImg: string;
  totalAmount: number;
  eventId: string | number;
  eventType: string;
  inCreation: boolean;
  numberOfPaidParticipants: number;
  completedSteps: [boolean, boolean, boolean, boolean];
  eventInfo: {
    title: string;
    creatorName: string;
    creatorEmail: string;
    socialLink: string;
    eventDesc: string;
    eventLocation: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    maxNumOfParticipant: number;
    minNumOfParticipant: number;
    typeOfParticipants: string;
    amountPerParticipant: string;
  };
  paymentInfo: {
    bankName: string;
    accountNumber: string | number;
  };
};
