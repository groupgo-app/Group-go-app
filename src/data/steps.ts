import { IStep } from "../types/Step";

export const steps: IStep[] = [
  {
    id: 1,
    checked: false,
    path: "",
    step: "choose event template",
    page: "template",
    about:
      "Pick the type of event you want to create so we can tailor your needs",
  },
  {
    id: 2,
    checked: false,
    path: "/event",
    step: "Event Information",
    page: "event",
    about: "Tell us all we need to know about your event",
  },
  {
    id: 3,
    checked: false,
    path: "/payment",
    step: "Payment Information",
    page: "payment",
    about: "Put in your payment information for withdrawing event payments",
  },
  {
    id: 4,
    checked: false,
    path: "/invitation",
    page: "invite",
    step: "Send invite link",
    about:
      "Now that your event has been created, share your event link to fans, and members of your community",
  },
];
