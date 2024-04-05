import { useContext } from "react";
import { FormContext } from "../contexts/FormContext";
import loader from "../assets/images/loader.svg";
import { AuthContext } from "../contexts/AuthContext";
import { findUser } from "../utils/events";
import { AppContext } from "../contexts/AppContext";
import { FiArrowLeft } from "react-icons/fi";
import { updateEvent } from "../api/events";
import { resolveBankAccount } from "../api/banks";

const PaymentInformation = ({ event }: { event?: any }) => {
  const {
    eventData,
    // setEventData,
    loading,
    banks,
    bankCode,
    errorMessage,
    setErrorMessage,
    setResolvedBankDetails,
    resolvedBankDetails,
    handleChangeAccountNumber,
    handleChangeBankName,

    handleChangeForCompletedSteps,
  } = useContext(FormContext);

  const { user } = useContext(AuthContext);
  const { setCurrentStep, creationSteps, currentStep, setCreationSteps } =
    useContext(AppContext);

  // useEffect(() => {
  //   if (event.eventInfo.title) {
  //     setEventData(event);
  //   }
  // });

  const handleSubmitForm = async (e: any) => {
    e.preventDefault();

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
        // If resolveBankAccount succeeds, set flag to true
      }

      if (!isBankResolutionSuccessful) return;

      const userFound = await findUser(user?.uid);
      if (userFound) {
        handleChangeForCompletedSteps!([true, true, true, true]);
        const newData = {
          ...eventData,
          completedSteps: [true, true, true, true],
          inCreation: false,
        };
        await updateEvent(eventData.eventId, user?.uid, newData);
        setCurrentStep!(creationSteps![3]);
      } else {
        console.log("User not found.");
      }
    } catch (error) {
      console.error("Error handling form submission:", error);
      setCurrentStep!(creationSteps![2]);
    }
  };

  const handleBackButton = () => {
    setCurrentStep!(creationSteps![1]);
    const newStep = creationSteps!.map((step) => {
      if (step.id === currentStep!.id) {
        return { ...step, checked: false };
      } else {
        return step;
      }
    });
    setCreationSteps!(newStep);
  };

  // console.log("This is eventData", eventData);
  return (
    <>
      <div className="payment_info_container">
        <button
          onClick={handleBackButton}
          className="flex items-center gap-2 text-blue-500"
        >
          <FiArrowLeft />
          Go back
        </button>
        <h4 className="font-normal">How would you like to get paid?</h4>
        <label htmlFor="bankName">Bank Name:</label>
        <select
          className="inputs"
          // type="select"
          value={eventData?.paymentInfo?.bankName}
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
            value={eventData.paymentInfo.accountNum}
            onChange={(event) => handleChangeAccountNumber(event.target.value)}
            placeholder="Enter your account number"
          />
        </div>

        <div>
          <p>{resolvedBankDetails?.account_name}</p>
        </div>

        {errorMessage && <div className="error">{errorMessage}</div>}

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
              disabled={loading}
              onClick={handleSubmitForm}
              className="primary_button flex items-center justify-center disabled:cursor-default disabled:bg-[#EE9080] tablet:w-[100%]"
            >
              {!loading ? "Continue" : <img src={loader} />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentInformation;
