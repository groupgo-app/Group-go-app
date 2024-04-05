import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
// import { AppContext } from "./AppContext";
import { initialEventData } from "../data/events";
import { fetchBanks } from "../api/banks";
import { AppContext } from "./AppContext";
import { templates } from "../data/templates";

type ContextState = {
  eventData?: any;
  banks?: any;
  bankCode?: any;
  setImgUrl?: any;
  imgUrl?: any;
  initialEventData?: any;
  loading?: any;
  setLoading?: any;
  setErrorMessage?: any;
  resolvedBankDetails?: any;
  setResolvedBankDetails?: any;
  errorMessage?: any;
  setEventData?: any;
  handleChangeForEventInfo?: any;
  handleChangeForPaymentInfo?: any;
  handleRedirect?: any;
  handleChangeAccountNumber?: any;
  handleChangeBankName?: any;
  handleChangeForEventType?: any;
  handleChangeForInCreation?: any;
  handleChangeForCompletedSteps?: any;
};
export const FormContext = createContext<ContextState>({});

export const FormContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // const { setCurrentStep, creationSteps } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  // const [progresspercent, setProgresspercent] = useState();
  const { user } = useContext(AuthContext);
  const { setSelectedTemplate, setCurrentStep, creationSteps } =
    useContext(AppContext);

  const [banks, setBanks] = useState([]);
  const [bankCode, setBankCode] = React.useState("");
  const [resolvedBankDetails, setResolvedBankDetails] = React.useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [eventData, setEventData] = useState(initialEventData);

  const handleRedirect = async (id: any) => {
    const selectTemplate = templates.find((template) => template.id === id);
    if (!selectTemplate) {
      return;
    } else {
      setSelectedTemplate(selectTemplate);

      setEventData({
        ...eventData,
        uid: user?.uid,
        eventInfo: { ...eventData.eventInfo, creatorEmail: user?.email },
        eventType: selectTemplate.templateName,
        eventImg: selectTemplate.imgUrl,
        completedSteps: [true, false, false, false],
      });
      setCurrentStep!(creationSteps![1]);
    }
  };

  useEffect(() => {
    setEventData({
      ...eventData,
      eventInfo: { ...eventData.eventInfo, creatorEmail: user?.email },
    });
  }, []);

  const handleChangeForEventInfo = (
    nameOfInfo: string,
    valueOfInfo: string,
  ) => {
    setEventData({
      ...eventData,
      eventInfo: { ...eventData.eventInfo, [nameOfInfo]: valueOfInfo },
    });
  };
  const handleChangeForEventType = (eventType: string) => {
    setEventData({
      ...eventData,
      eventType: eventType,
    });
  };

  const handleChangeForCompletedSteps = (
    completedSteps: [boolean, boolean, boolean, boolean],
  ) => {
    setEventData({ ...eventData, completedSteps });
  };
  const handleChangeForInCreation = (inCreation: boolean) => {
    setEventData({ ...eventData, inCreation });
  };

  const handleChangeForPaymentInfo = (
    paymentInfoName: string,
    paymentInfoValue: string,
  ) => {
    setEventData({
      ...eventData,
      paymentInfo: {
        ...eventData.paymentInfo,
        [paymentInfoName]: paymentInfoValue,
      },
    });
  };

  const handleChangeAccountNumber = (accountNumber: string | number) => {
    setEventData({
      ...eventData,
      paymentInfo: {
        ...eventData.paymentInfo,
        accountNumber,
      },
    });
  };

  const handleChangeBankName = (selectedBankName: string) => {
    const bank: any = banks.find(
      (bank: any) => bank?.name === selectedBankName,
    );
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
      setBankCode(bank?.code); // Set bank code
    }
  };

  useEffect(() => {
    const setFoundBanks = async () => {
      const banks = await fetchBanks();
      setBanks(banks);
    };
    setFoundBanks();
  }, []);

  return (
    <FormContext.Provider
      value={{
        eventData,
        banks,
        bankCode,
        setImgUrl,
        imgUrl,
        initialEventData,
        loading,
        setLoading,
        resolvedBankDetails,
        setResolvedBankDetails,
        handleRedirect,
        errorMessage,
        setErrorMessage,
        setEventData,
        handleChangeForEventInfo,
        handleChangeForPaymentInfo,
        handleChangeAccountNumber,
        handleChangeBankName,
        handleChangeForEventType,
        handleChangeForInCreation,
        handleChangeForCompletedSteps,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
