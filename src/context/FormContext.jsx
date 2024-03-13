import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { AppContext } from "./AppContext";
import { nanoid } from "nanoid";

export const FormContext = createContext(null);

export const FormContextProvider = ({ children }) => {
  const { setCurrentStep, stepData } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState();
  const { user } = useContext(AuthContext);

  // const [accountNumber, setAccountNumber] = React.useState("");
  const [banksName, setBanksName] = useState([]);
  const [bankCode, setBankCode] = React.useState("");
  const [resolvedBankDetails, setResolvedBankDetails] = React.useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [eventData, setEventData] = useState({
    uid: "",
    eventImg: "",
    totalAmount: 0,
    eventId: nanoid(),
    eventType: "",
    eventInfo: {
      creatorName: "",
      creatorEmail: user?.email,
      socialLink: "",
      eventDesc: "",
      eventLocation: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      maxNumOfParticipant: 0,
      minNumOfParticipant: 2,
      typeOfParticipants: "",
      amountPerParticipant: "",
    },
    paymentInfo: {
      bankName: "",
      accountNum: "",
    },
  });

  // console.log(user)

  const handleChangeForEventInfo = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      eventInfo: { ...eventData.eventInfo, [name]: value },
    });
  };

  const handleChangeForPaymentInfo = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      paymentInfo: { ...eventData.paymentInfo, [name]: value },
    });
  };

  const handleChangeAccountNumber = (changeAccNum) => {
    setEventData((eventData) => ({
      ...eventData,
      paymentInfo: {
        ...eventData.paymentInfo,
        accountNum: changeAccNum,
      },
    }));
  };

  const handleChangeBankName = (selectedBankName) => {
    const bank = banksName.find((bank) => bank.name === selectedBankName);
    if (bank) {
      setEventData((eventData) => ({
        ...eventData,
        paymentInfo: {
          ...eventData.paymentInfo,
          bankName: selectedBankName,
        },
      }));
      // console.log("This is bank", bank);
      setResolvedBankDetails(null); // Reset resolved bank details
      setBankCode(bank.code); // Set bank code
    }
  };

  // Fetch banks
  const fetchBanks = async () => {
    try {
      const response = await fetch("https://api.paystack.co/bank", {
        method: "GET",
        headers: {
          Authorization: `Brearer ${import.meta.env.VITE_REACT_PAYSTACK_API}`,
        },
      });
      const data = await response.json();
      setBanksName(data.data);
    } catch (error) {
      console.error("Error fetching banks:", error);
    }
  };

  const resolveBankAccount = async ({ accountNumber, bankCode }) => {
    try {
      const response = await fetch(
        `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_REACT_SK_TEST}`,
          },
        },
      );
      // console.log("response", response);
      if (response.ok === false) {
        setErrorMessage(
          "Bank name could not be resolved. Please check your input.",
        );
        return setCurrentStep(stepData[2]);
      } else {
        const data = await response.json();
        setResolvedBankDetails(data.data);
      }

      // console.log(data.data);
    } catch (error) {
      // setError(error.message);
      setResolvedBankDetails(null);
    }
  };

  useEffect(() => {
    // Fetch banks when the component mounts
    fetchBanks();
  }, []);

  return (
    <FormContext.Provider
      value={{
        eventData,
        banksName,
        bankCode,
        setImgUrl,
        imgUrl,
        loading,
        resolvedBankDetails,
        errorMessage,
        setEventData,
        handleChangeForEventInfo,
        handleChangeForPaymentInfo,
        handleChangeAccountNumber,
        handleChangeBankName,
        resolveBankAccount,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
