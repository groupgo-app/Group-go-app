import { nanoid } from "nanoid";
import { useContext, useEffect, useState } from "react";
import { PaystackProps } from "react-paystack/dist/types";
import { AuthContext } from "../contexts/AuthContext";
import { IEventData, IEventTier, IPayEvent } from "../types/Event";

import { usePaystackPayment } from "react-paystack";
import { toast } from "react-toastify";
import { FormContext } from "../contexts/FormContext";
import InputField from "../components/InputField";
import { Link, useNavigate, useParams } from "react-router-dom";
import { updateParticipantsCount, updateTicketCount } from "../api/events";
import { FcLeft } from "react-icons/fc";
import { BiInfoCircle } from "react-icons/bi";

const PaymentPage = ({}) => {
  let paymentData: IPayEvent | undefined, eventData: IEventData;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const authContext = useContext(AuthContext);
  const formContext = useContext(FormContext);
  const { eventId } = useParams();
  const navigate = useNavigate();

  if (authContext && formContext) {
    ({ paymentData, eventData } = formContext);
  }

  const onSuccess = () => {
    const runCode = async () => {
      toast("Payment successful", { type: "success" });
      if (!paymentData?.hasTier) {
        await updateParticipantsCount(eventId!);
        return navigate(`/${eventId}`);
      }
      const newTiers: IEventTier[] = [...eventData.eventInfo.tiers];
      const newTierData: IEventTier = {
        ...newTiers[paymentData?.tierIndex!],
        numberOfTickets: newTiers[paymentData?.tierIndex!].numberOfTickets - 1,
      };
      newTiers[paymentData?.tierIndex!] = newTierData;
      const newData: IEventData = {
        ...eventData,
        eventInfo: {
          ...eventData.eventInfo,
          tiers: newTiers,
        },
      };
      await updateTicketCount(eventId!, newData);
      navigate(`/${eventId}`);
    };
    runCode();
  };

  const onClose = () => {
    toast("Your payment was unsuccessful, try again later!", { type: "error" });
  };

  useEffect(() => {
    if (!paymentData?.eventId) return navigate(`/${eventId}`);
  }, []);

  const config: PaystackProps = {
    firstname: firstName,
    lastname: lastName,
    reference: nanoid(),
    phone: phoneNumber,
    email: confirmEmail,
    publicKey: import.meta.env.VITE_REACT_PAYSTACK_API,
    amount: Number(paymentData?.amount) * 100,
    label: `Payment for \n Event: ${paymentData?.title}\n${paymentData?.hasTier && `Tier: ${paymentData.tier}`}`,
    metadata: {
      custom_fields: [
        {
          display_name: paymentData?.title ? paymentData?.title : "Event Title",
          variable_name: "eventTitle",
          value: paymentData?.title ? paymentData?.title : "Event Title",
        },
      ],
    },
  };

  const initializePayment = usePaystackPayment(config);

  const handlePaymentSubmit = async (e: any) => {
    e.preventDefault();
    if (!email || !firstName || !lastName || !phoneNumber)
      return toast("Fill in all the inputs", { type: "error" });
    if (!(email === confirmEmail))
      return toast("Make sure your emails match", { type: "error" });

    await initializePayment(onSuccess, onClose);
  };

  return (
    <form
      action=""
      className="flex w-full flex-col items-center rounded-sm p-4"
    >
      <div className="w-full rounded-xl border border-orange-clr bg-gray-200 p-4 tablet:w-3/4 laptop:w-1/2">
        <div>
          <Link
            to={`/${eventId}`}
            className="flex items-center gap-2 text-orange-clr"
          >
            <FcLeft />
            Go Back
          </Link>
        </div>{" "}
        <h3>Checkout</h3>
        <div className="my-5">
          <h4>
            Confirm Payment for <br />
            Event: {paymentData?.title}
          </h4>
          <p>{paymentData?.hasTier && <>Tier: {paymentData.tier?.name}</>}</p>
        </div>
        <div className="my-4">
          <InputField
            type="text"
            label="First Name (required)"
            placeholder="First Name"
            value={firstName}
            onChange={(e: any) => {
              setFirstName(e.target.value);
            }}
          />
        </div>
        <div className="my-4">
          <InputField
            type="text"
            label="Last Name (required)"
            placeholder="Last Name"
            value={lastName}
            onChange={(e: any) => {
              setLastName(e.target.value);
            }}
          />
        </div>
        <div className="my-4">
          <InputField
            type="email"
            label="Email (required)"
            placeholder="user@email.com"
            name="email"
            value={email}
            onChange={(e: any) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="my-4">
          <InputField
            type="email"
            label="Confirm Email (required)"
            name="confirmEmail"
            placeholder="user@email.com"
            value={confirmEmail}
            onChange={(e: any) => {
              setConfirmEmail(e.target.value);
            }}
          />
        </div>
        <div className="my-4">
          <InputField
            type="text"
            label="Phone Number (required)"
            placeholder="+234XXXXXXXXXX"
            value={phoneNumber}
            onChange={(e: any) => {
              setPhoneNumber(e.target.value);
            }}
          />
        </div>
        <div className="flex items-center gap-4 rounded-xl p-4">
          <BiInfoCircle className="text-3xl" color="orange" />
          <p>
            Tickets will only be sent to the email address you provide above
          </p>
        </div>
        <button
          className="my-4 w-full rounded-xl bg-orange-clr p-2 text-white"
          onClick={handlePaymentSubmit}
          type="submit"
        >
          Pay
        </button>
      </div>
    </form>
  );
};

export default PaymentPage;
