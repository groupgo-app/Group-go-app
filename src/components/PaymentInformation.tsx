import { useContext, useEffect, useState } from "react";
import { FormContext } from "../contexts/FormContext";
import loader from "../assets/images/loader.svg";
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
    resolvedBankDetails,
    handleChangeAccountNumber: any,
    handleChangeBankName: any,
    handleChangeForCompletedSteps,
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
      resolvedBankDetails,
      handleChangeAccountNumber,
      handleChangeBankName,

      handleChangeForCompletedSteps,
    } = formContext);
    ({ user } = authContext);
    ({ setCurrentStep, creationSteps, currentStep, setCreationSteps } =
      appContext);
  }
  const [bankResolutionSuccessful, setBankResolutionSuccessful] = useState<
    boolean | undefined
  >(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmitForm = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Flag to indicate if bank account resolution was successful
      let isBankResolutionSuccessful: boolean | undefined = false;
      if (
        eventData.paymentInfo.bankName &&
        eventData.paymentInfo.accountNumber
      ) {
        isBankResolutionSuccessful = await resolveBankAccount({
          accountNumber: eventData.paymentInfo.accountNumber,
          bankCode: bankCode,
          setErrorMessage: setErrorMessage!,
          setCurrentStep: setCurrentStep!,
          setResolvedBankDetails: setResolvedBankDetails!,
          creationSteps: creationSteps!,
        });
        setBankResolutionSuccessful(isBankResolutionSuccessful);
        // If resolveBankAccount succeeds, set flag to true
      }

      if (!isBankResolutionSuccessful)
        return toast("Bank resolution was not successful", { type: "error" });

      const userFound = await findUser(user?.uid);
      if (userFound) {
        handleChangeForCompletedSteps!([true, true, true, true]);
        const newData: IEventData = {
          ...eventData,
          completedSteps: [true, true, true, true],
          inCreation: false,
        };
        await updateEvent(eventData.eventId, user?.uid, newData);
        toast("Bank Resolution Successful", { type: "success" });
      } else {
        console.log("User not found.");
      }
    } catch (error) {
      // console.error("Error handling form submission:", error);
      if (error) return;
      // setCurrentStep!(creationSteps![2]);
    } finally {
      setLoading(false);
    }
  };
  const goForward = () => {
    setCurrentStep!(creationSteps![3]);
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
          // type="select"
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
          <label htmlFor="bankName">Account Number:</label>
          <input
            type="text"
            className="inputs"
            value={eventData!.paymentInfo.accountNumber}
            onChange={(event) => handleChangeAccountNumber(event.target.value)}
            placeholder="Enter your account number"
          />
        </div>

        <div>
          {loading ? (
            <>
              <Loader />
            </>
          ) : (
            <p>{resolvedBankDetails?.account_name}</p>
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
            {bankResolutionSuccessful ? (
              <>
                <button
                  type="button"
                  className="rounded-xl bg-green-500 p-2 text-white tablet:w-full"
                  onClick={() => {
                    goForward();
                  }}
                >
                  Continue
                </button>
              </>
            ) : (
              <>
                <button
                  type="submit"
                  // type="button"
                  disabled={loading}
                  onClick={handleSubmitForm}
                  className="primary_button flex items-center justify-center disabled:cursor-default disabled:bg-[#EE9080] tablet:w-[100%]"
                >
                  {!loading ? "Continue" : <img src={loader} />}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentInformation;
