import { useContext, useEffect, useState } from "react";
import { FormContext } from "../contexts/FormContext";
import { AuthContext } from "../contexts/AuthContext";
import { findUser } from "../utils/events";
import { AppContext } from "../contexts/AppContext";
import { FiArrowLeft } from "react-icons/fi";
import { updateEvent } from "../api/events";
import { resolveBankAccount } from "../api/banks";
import { useNavigate } from "react-router-dom";
import { IEventData } from "../types/Event";
import { IStep } from "../types/Step";
import { toast } from "react-toastify";
import Loader from "./Loader";

const PaymentInformation = ({ event }: { event?: IEventData }) => {
  let eventData: IEventData,
    banks,
    bankCode: any,
    errorMessage: string,
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>,
    setResolvedBankDetails,
    // resolvedBankDetails: any,
    // handleChangeAccountNumber: any,
    handleChangeBankName: any,
    handleChangeForCompletedSteps,
    // handleChangeAccountName: any,
    setEventData: any,
    user: any,
    setCurrentStep: React.Dispatch<React.SetStateAction<IStep>>,
    creationSteps: IStep[],
    currentStep: IStep,
    setCreationSteps: React.Dispatch<React.SetStateAction<IStep[]>>;
  const formContext = useContext(FormContext);
  const authContext = useContext(AuthContext);
  const appContext = useContext(AppContext);

  if (formContext && authContext && appContext) {
    ({
      eventData,
      // loading,
      banks,
      bankCode,
      errorMessage,
      setErrorMessage,
      setResolvedBankDetails,
      // resolvedBankDetails,
      // handleChangeAccountNumber,
      handleChangeBankName,
      // handleChangeAccountName,
      handleChangeForCompletedSteps,
      setEventData,
    } = formContext);
    ({ user } = authContext);
    ({ setCurrentStep, creationSteps, currentStep, setCreationSteps } =
      appContext);
  }
  const [bankResolutionSuccessful, setBankResolutionSuccessful] = useState<
    boolean | undefined
  >(false);
  const [loading, setLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [formAccountNumber, setFormAccountNumber] = useState("");
  const navigate = useNavigate();

  const handleSubmitForm = async (e: any, accountNumber: string) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Flag to indicate if bank account resolution was successful
      let isBankResolutionSuccessful: boolean | undefined = false;
      if (eventData.paymentInfo.bankName) {
        isBankResolutionSuccessful = await resolveBankAccount({
          accountNumber,
          bankCode,
          setErrorMessage: setErrorMessage!,
          setCurrentStep: setCurrentStep!,
          setResolvedBankDetails: setResolvedBankDetails!,
          creationSteps: creationSteps!,
          eventData,
          setEventData,
        });
        setBankResolutionSuccessful(isBankResolutionSuccessful);
      }

      if (!isBankResolutionSuccessful)
        return toast(
          "Bank resolution was not successful please check the details and check again",
          { type: "error" },
        );
    } catch (error) {
      if (error) return;
    } finally {
      setLoading(false);
    }
  };
  const numberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // handleChangeAccountNumber(formAccountNumber);
    setFormAccountNumber(e.target.value);
    setErrorMessage("");
    if (
      eventData.paymentInfo.bankName.length > 0 &&
      e.target.value.toString().length === 10
    )
      handleSubmitForm(e, e.target.value);
  };
  const goForward = async () => {
    setUserLoading(true);
    setTimeout(async () => {
      const userFound = await findUser(user?.uid);
      if (userFound) {
        handleChangeForCompletedSteps!([true, true, true, true]);
        const newData: IEventData = {
          ...eventData,
          completedSteps: [true, true, true, true],
          inCreation: false,
        };
        await updateEvent(eventData.eventId, user?.uid, newData);
        setUserLoading(false);
        toast("Successfully fininished creating your event", {
          type: "success",
        });
      } else {
        console.log("User not found.");
      }
      setCurrentStep!(creationSteps![3]);
    }, 1000);
  };
  const handleBackButton = () => {
    if (event) {
      navigate(`/edit/${event.eventId}?step=2`);
    }
    setCurrentStep!(creationSteps![1]);
    const newStep = creationSteps!.map((step: IStep) => {
      if (step.id === currentStep!.id) {
        return { ...step, checked: false };
      } else {
        return step;
      }
    });
    setCreationSteps!(newStep);
  };

  useEffect(() => {
    if (!event?.eventType && !eventData.eventType) {
      toast(
        "Please select a template or provide details for the event before proceeding here",
        { type: "warning" },
      );
      setCurrentStep(creationSteps[1]);
    }
  }, []);
  return (
    <>
      <div className="payment_info_container">
        <button
          onClick={handleBackButton}
          className="flex items-center gap-2 text-orange-clr"
        >
          <FiArrowLeft />
          Go back
        </button>
        <h4 className="font-normal">How would you like to get paid?</h4>
        <label htmlFor="bankName">Bank Name:</label>
        <select
          className="inputs"
          id="bankName"
          disabled={loading}
          value={eventData!?.paymentInfo?.bankName}
          onChange={(event) => handleChangeBankName(event.target.value)}
        >
          <option value="">Select a bank</option>
          {banks!?.map((bank: any) => (
            <option key={bank.code} value={bank.name}>
              {bank.name}
            </option>
          ))}
        </select>
        <div>
          <label htmlFor="accountNumber">Account Number:</label>
          {bankResolutionSuccessful &&
          eventData!.paymentInfo.accountNumber?.length === 10 ? (
            <>
              <input
                type="text"
                className="inputs"
                id="accoundNumber"
                disabled={loading}
                value={eventData!.paymentInfo.accountNumber}
                onChange={(event) => numberChange(event)}
                placeholder="Enter your account number"
              />
            </>
          ) : (
            <>
              <input
                type="text"
                className="inputs"
                id="accoundNumber"
                disabled={loading}
                value={formAccountNumber}
                onChange={(event) => numberChange(event)}
                placeholder="Enter your account number"
              />
            </>
          )}
        </div>

        <div>
          {loading ? (
            <>
              <Loader />
            </>
          ) : (
            <p>{eventData!.paymentInfo.accountName}</p>
          )}
        </div>

        {errorMessage! && <div className="error">{errorMessage}</div>}

        <div className="mt-12 flex w-full justify-between tablet:gap-[100px]">
          <div className="w-full">
            <button
              onClick={handleBackButton}
              className="primary_button block tablet:w-[100%]"
              type="button"
            >
              Back
            </button>
          </div>
          <div className="w-full">
            <button
              type="submit"
              // type="button"
              disabled={loading || !bankResolutionSuccessful}
              onClick={() => {
                goForward();
              }}
              className="primary_button flex items-center justify-center disabled:cursor-default disabled:bg-[#EE9080] tablet:w-[100%]"
            >
              {loading || userLoading ? <Loader variant="small" /> : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentInformation;
