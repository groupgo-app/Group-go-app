import React, { useContext } from "react";
import { FormContext } from "../context/FormContext";
import loader from "../assets/images/loader.svg";
import { AuthContext } from "../context/AuthContext";
import { findUser, saveEventForAUser } from "../utils/events";
import { AppContext } from "../context/AppContext";

const PaymentInformation = () => {
  const {
    eventData,
    loading,
    banksName,
    bankCode,
    errorMessage,
    resolvedBankDetails,
    handleChangeAccountNumber,
    handleChangeBankName,
    resolveBankAccount,
  } = useContext(FormContext);

  const { user } = useContext(AuthContext);
  const { setCurrentStep, stepData, currentStep, setStepData } =
    useContext(AppContext);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      // Flag to indicate if bank account resolution was successful
      let isBankResolutionSuccessful = false;

      if (eventData.paymentInfo.bankName && eventData.paymentInfo.accountNum) {
        await resolveBankAccount({
          accountNumber: eventData.paymentInfo.accountNum,
          bankCode: bankCode,
        });
        // If resolveBankAccount succeeds, set flag to true
        isBankResolutionSuccessful = true;
      } else {
        return;
      }

      if (!isBankResolutionSuccessful) {
        return; // Exit function if bank resolution failed
      }

      const userFound = await findUser(user?.uid);
      if (userFound) {
        // const saveEventData = await saveEventForAUser(eventData);
        await saveEventForAUser(eventData);
        // console.log("Event saved:", saveEventData);
      } else {
        console.log("User not found.");
      }
      setCurrentStep(stepData[3]);
    } catch (error) {
      console.error("Error handling form submission:", error);
      setCurrentStep(stepData[2]);
    }
  };

  const handleBackButton = () => {
    setCurrentStep(stepData[1]);
    const newStep = stepData.map((step) => {
      if (step.id === currentStep.id) {
        return { ...step, checked: false };
      } else {
        return step;
      }
    });
    setStepData(newStep);
  };

  // console.log("This is eventData", eventData);
  return (
    <>
      <div className="payment_info_container">
        <h4 className="font-normal">How would you like to get paid?</h4>
        <label htmlFor="bankName">Bank Name:</label>
        <select
          className="inputs"
          type="select"
          value={eventData?.paymentInfo?.bankName}
          onChange={(event) => handleChangeBankName(event.target.value)}
        >
          <option value="">Select a bank</option>
          {banksName?.map((bank) => (
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
