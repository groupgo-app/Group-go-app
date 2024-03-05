import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { AppContext } from "./AppContext";
import { nanoid } from "nanoid";
import cover from "../assets/images/resturant image.jpeg";
import { storage } from "../config/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

export const FormContext = createContext(null);

export const FormContextProvider = ({ children }) => {
  const { setCurrentStep, stepData } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const [progresspercent, setProgresspercent] = useState();
  const { user } = useContext(AuthContext);

  const [accountNumber, setAccountNumber] = React.useState("");
  const [banksName, setBanksName] = useState([]);
  const [bankCode, setBankCode] = React.useState("");
  const [resolvedBankDetails, setResolvedBankDetails] = React.useState(null);
  // const [error, setError] = React.useState(null);
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

  const uploadCoverImage = () => {
    setLoading(true);
    const storageRef = ref(storage, `images/${imgUrl.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imgUrl);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
        setProgresspercent(progress);
      },
      (error) => {
        console.log(error);
        setLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log(downloadURL);
          // setEventData({...eventData, eventImg: downloadURL})
          handleEventCreation(downloadURL);
        });
      },
    );
  };

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

  const handleEventCreation = async (fileUrl) => {
    const newEventData = { ...eventData, eventImg: fileUrl };
    const dofRef = doc(db, "event", newEventData.eventId);
    try {
      await setDoc(dofRef, { eventData: newEventData });
      // console.log(newEventData)
      setCurrentStep(stepData[3]);
      console.log("event data added");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
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
      const data = await response.json();
      console.log(data);
      setResolvedBankDetails(data.data);
      // setError(null);
      setAccountNumber("");
      setBanksName([]);
    } catch (error) {
      // setError(error.message);
      setResolvedBankDetails(null);
    }
  };

  useEffect(() => {
    // Fetch banks when the component mounts
    fetchBanks();
  }, []);

  const handleChangeBankName = (selectedBankName) => {
    setEventData((eventData) => ({
      ...eventData,
      paymentInfo: {
        ...eventData.paymentInfo,
        bankName: selectedBankName,
      },
    }));
    // selectBankCode(bankCode);
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

  return (
    <FormContext.Provider
      value={{
        eventData,
        banksName,
        setImgUrl,
        imgUrl,
        loading,
        bankCode,
        resolvedBankDetails,
        setBankCode,
        setEventData,
        handleChangeForEventInfo,
        handleChangeForPaymentInfo,
        uploadCoverImage,
        handleChangeBankName,
        handleChangeAccountNumber,
        resolveBankAccount,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};
