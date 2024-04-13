import { IEventData } from "../types/Event";
import { IStep } from "../types/Step";

export const fetchBanks = async () => {
  try {
    const response = await fetch("https://api.paystack.co/bank", {
      method: "GET",
      headers: {
        Authorization: `Brearer ${import.meta.env.VITE_REACT_PAYSTACK_API}`,
      },
    });
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching banks:", error);
  }
};

export const resolveBankAccount = async ({
  accountNumber,
  bankCode,
  setErrorMessage,
  setCurrentStep,
  setResolvedBankDetails,
  creationSteps,

  eventData,
  setEventData,
}: {
  accountNumber: string;
  bankCode: string | number;
  setErrorMessage: Function;
  setCurrentStep: Function;
  setResolvedBankDetails: Function;
  creationSteps: IStep[];

  eventData: IEventData;
  setEventData: any;
}) => {
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
    if (!response.ok) {
      setErrorMessage(
        "Bank name could not be resolved. Please check your input.",
      );
      setCurrentStep!(creationSteps![2]);
      return false;
    } else {
      const data = await response.json();
      setResolvedBankDetails(data.data);
      const accountName = await data.data.account_name;
      const bankCode = await data.data.bank_id;
      const newData: IEventData = {
        ...eventData,
        paymentInfo: {
          ...eventData?.paymentInfo!,
          accountName,
          accountNumber,
          bankCode,
        },
      };
      setEventData(newData);

      return true;
    }

    // console.log(data.data);
  } catch (error) {
    // setError(error.message);
    setResolvedBankDetails(null);
  }
};
