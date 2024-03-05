import React, { useContext, useState } from "react";
import InputField from "./InputField";
import { FormContext } from "../context/FormContext";
import loader from "../assets/images/loader.svg";

const PaymentInformation = () => {
  const {
    eventData,
    loading,
    banksName,
    bankCode,
    accountNumber,
    uploadCoverImage,
    setEventData,
    handleChangeForPaymentInfo,
    handleChangeAccountNumber,
    handleChangeBankName,
    resolveBankAccount,
  } = useContext(FormContext);

  const { paymentInfo } = eventData;

  console.log("This is eventData", eventData);
  // const [bankCode, setBankCode] = useState("");

  const submitForm = (e) => {
    e.preventDefault();
    // uploadCoverImage();
    //resolveBankAccount();
    console.log("event data", eventData);
  };

  return (
    <>
      <form className="payment_info_container" onSubmit={submitForm}>
        <h4 className="font-normal">How would you like to get paid?</h4>

        {/*         <InputField
          id="bank_name"
          type="text"
          label="Name of bank"
          name="bankName"
          placeholder="GT bank..."
          value={paymentInfo.bankName}
          onChange={handleChangeForPaymentInfo}
        />

        <InputField
          id="acc_num"
          type="text"
          label="Account number"
          name="accountNum"
          value={paymentInfo.accountNum}
          placeholder="account number"
          onChange={handleChangeForPaymentInfo}
        /> */}

        <label htmlFor="bankName">Bank Name:</label>
        {/*         <select
          multiple
          id="bankName"
          name="bankName"
          value={eventData.paymentInfo.bankName}
          onChange={(e) => e}
        >
          {eventData?.paymentInfo?.bankName?.map((bank, index) => (
            <option key={index} value={bank}>
              {bank}
            </option>
          ))}
        </select> */}
        <select
          // value={bankCode}
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
          <label>Account Number:</label>
          <input
            type="text"
            value={paymentInfo.accountNum}
            onChange={(event) => handleChangeAccountNumber(event.target.value)}
            placeholder="Enter your account number"
          />
        </div>
        <div className="mt-10">
          <button
            type="submit"
            disabled={loading}
            onClick={submitForm}
            className="primary_button flex items-center justify-center disabled:cursor-default disabled:bg-[#EE9080]"
          >
            {!loading ? "Continue" : <img src={loader} />}
          </button>
        </div>
      </form>
    </>
  );
};

export default PaymentInformation;
