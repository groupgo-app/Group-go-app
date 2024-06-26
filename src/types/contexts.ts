import React from "react";
import { IEventData, IPayEvent } from "./Event";
import { IStep } from "./Step";
import { ITemplate } from "./Template";

export type AppContextState = {
  selectedTemplate?: ITemplate;
  setSelectedTemplate: React.Dispatch<
    React.SetStateAction<ITemplate | undefined>
  >;
  creationSteps: IStep[];
  setCreationSteps: React.Dispatch<React.SetStateAction<IStep[]>>;
  currentStep: IStep;
  setCurrentStep: React.Dispatch<React.SetStateAction<IStep>>;
};

export type AuthContextState = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  user: any;
  alertMsg: string;
  setAlertMsg: React.Dispatch<React.SetStateAction<string>>;
  isEmailLinkLoading: boolean;
  setIsEmailLinkLoading: React.Dispatch<React.SetStateAction<boolean>>;
  errorMsg: string;
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
};

export type FormContextState = {
  eventData: IEventData;
  banks: any[];
  bankCode: any;
  setBankCode: any;
  setImgUrl: React.Dispatch<React.SetStateAction<string>>;
  imgUrl: string;
  paymentData?: IPayEvent;
  setPaymentData: React.Dispatch<React.SetStateAction<IPayEvent>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  resolvedBankDetails: any;
  setResolvedBankDetails: React.Dispatch<React.SetStateAction<any>>;
  errorMessage: string;
  setEventData: React.Dispatch<React.SetStateAction<IEventData>>;
  handleChangeForEventInfo?: any;
  handleChangeForPaymentInfo?: any;
  handleRedirect: (id: any) => Promise<void>;
  handleChangeAccountName: (accountName: string) => void;
  handleChangeAccountNumber?: any;
  handleChangeBankName?: any;
  handleChangeForEventType?: any;
  handleChangeForInCreation?: any;
  handleChangeForCompletedSteps?: any;
};
