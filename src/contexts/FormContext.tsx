import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { initialEventData } from "../data/events";
import { fetchBanks } from "../api/banks";
import { AppContext } from "./AppContext";
import { templates } from "../data/templates";
import { FormContextState } from "../types/contexts";
import { IPayEvent } from "../types/Event";

export const FormContext = createContext<FormContextState | null>(null);

export const FormContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  let user: any, setSelectedTemplate: any, setCurrentStep, creationSteps;
  const authContext = useContext(AuthContext);
  const appContext = useContext(AppContext);
  if (authContext && appContext) {
    ({ user } = authContext);
    ({ setSelectedTemplate, setCurrentStep, creationSteps } = appContext);
  }

  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState("");

  const [banks, setBanks] = useState([]);
  const [bankCode, setBankCode] = React.useState("");
  const [resolvedBankDetails, setResolvedBankDetails] = React.useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [eventData, setEventData] = useState(initialEventData);
  const [paymentData, setPaymentData] = useState<IPayEvent>({
    amount: 0,
    eventId: "",
    title: "",
  });

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

        loading,
        setLoading,
        resolvedBankDetails,
        setResolvedBankDetails,
        handleRedirect,
        errorMessage,
        paymentData,
        setPaymentData,
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
