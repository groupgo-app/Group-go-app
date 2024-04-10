import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../contexts/AppContext";
import InputField from "../InputField";
import { AuthContext } from "../../contexts/AuthContext";
import { FormContext } from "../../contexts/FormContext";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../config/firebase";
import { saveEvent, updateEvent } from "../../api/events";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import isUrl from "../../utils/isUrl";
import FormSection from "./FormSection";
import LocationSection from "./LocationSection";
import { linkToImage } from "../../utils/linkToImage";
import { ITemplate } from "../../types/Template";
import { IEventData, IEventTier } from "../../types/Event";
import { IStep } from "../../types/Step";
import TierSection from "./TierSection";
import TimeSection from "./TimeSection";
import ParticipantSection from "./ParticipantSection";
import CreatorSection from "./CreatorSection";
import FormButtons from "./FormButtons";
import FormImageSection from "./FormImageSection";

const TemplateEventForm = ({ event }: { event?: IEventData }) => {
  let selectedTemplate: ITemplate | undefined,
    setCurrentStep,
    creationSteps,
    setCreationSteps,
    currentStep: IStep,
    user: any,
    eventData: IEventData,
    setEventData: React.Dispatch<React.SetStateAction<IEventData>>,
    handleChangeForEventInfo,
    handleChangeForEventType,
    handleChangeForCompletedSteps;

  const appContext = useContext(AppContext);
  const authContext = useContext(AuthContext);
  const formContext = useContext(FormContext);

  if (appContext && authContext && formContext) {
    ({
      selectedTemplate,
      setCurrentStep,
      creationSteps,
      setCreationSteps,
      currentStep,
    } = appContext);

    ({ user } = authContext);
    ({
      eventData,
      setEventData,
      handleChangeForEventInfo,
      handleChangeForEventType,
      handleChangeForCompletedSteps,
    } = formContext);
  }

  const { eventInfo } = eventData!;

  const [coverImg, setCoverImg] = useState("");

  const navigate = useNavigate();
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);
  // const [showAddButton, setShowAddButton] = useState(false);

  function sumNumbersInObjects(arr: IEventTier[]) {
    let totalSum = 0;
    for (const obj of arr) {
      if (obj.hasOwnProperty("numberOfTickets")) {
        // Check if "number" property exists
        totalSum += Number(obj.numberOfTickets);
      }
    }
    return totalSum;
  }

  const handleUpload: Function = async (
    file: any,
    eventData: IEventData,
    defaultLoad?: boolean,
  ) => {
    if (!file) return;
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot: any) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        );
        if (progress === 100) {
          if (!defaultLoad) {
            toast("Image Fully Uploaded", {
              type: "success",
              autoClose: 3000,
            });
          }
        }
        setIsLoadingImage(true);
      },
      (error: any) => {
        toast(error, {
          type: "error",
          autoClose: 3000,
        });
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          setCoverImg(downloadURL);

          const newData = { ...eventData, eventImg: downloadURL };

          if (event) {
            await updateEvent(event.eventId, user?.uid, newData);
          }
          setEventData(newData);
          setIsLoadingImage(false);
        });
      },
    );
  };

  useEffect(() => {
    const runAtStart = async () => {
      if (event || selectedTemplate) {
        if (event) {
          setCoverImg(event?.eventImg);
        } else {
          if (eventData.eventImg.length > 0) {
            if (isUrl(eventData.eventImg)) {
              const file = await linkToImage(
                `${eventData.eventImg}`,
                eventData,
              );
              await handleUpload(file, eventData, true);
            } else {
              const file = await linkToImage(
                `${import.meta.env.VITE_REACT_SITE_URL}${eventData.eventImg}`,
                eventData,
              );
              await handleUpload(file, eventData, true);
            }
          }
        }
      } else {
        const newData: IEventData = {
          ...eventData,
          uid: user?.uid,
          eventInfo: { ...eventData.eventInfo, creatorEmail: user?.email },
          eventImg: `${import.meta.env.VITE_REACT_SITE_URL}/templateimages/others.png`,
          completedSteps: [true, false, false, false],
        };
        setEventData!(newData);
        const file = await linkToImage(
          `${import.meta.env.VITE_REACT_SITE_URL}/templateimages/others.png`,
          eventData,
        );
        await handleUpload(file, newData);
      }
    };
    runAtStart();
  }, []);

  const handleBackButton = () => {
    if (event) {
      navigate(`/edit/${eventData.eventId}?step=1`);
    } else setCurrentStep!(creationSteps![0]);
    const newStep = creationSteps!.map((step: IStep) => {
      if (step.id === currentStep!.id) {
        return { ...step, checked: false };
      } else {
        return step;
      }
    });
    setCreationSteps!(newStep);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      if (
        eventData.eventInfo.title.length > 0 &&
        eventData.eventType.length > 0 &&
        eventData.eventInfo.creatorName.length > 0 &&
        eventData.eventInfo.creatorEmail.length > 0 &&
        eventData.eventInfo.socialLinks.length > 0 &&
        eventData.eventInfo.eventDesc.length > 0 &&
        eventData.eventInfo.eventLocation.display_name.length > 0 &&
        eventData.eventInfo.startDate.length > 0 &&
        eventData.eventInfo.endDate.length > 0 &&
        eventData.eventInfo.startTime.length > 0 &&
        eventData.eventInfo.endTime.length > 0 &&
        eventData.eventInfo.maxNumOfParticipant > 0 &&
        eventData.eventInfo.minNumOfParticipant > 0 &&
        eventData.eventInfo.typeOfParticipants.length > 0
      ) {
        setIsLoadingSubmit(true);
        if (eventData.hasTiers) {
          if (
            !eventData.eventInfo.tiers.length &&
            !(eventData.eventInfo.tiers.length > 0)
          )
            return toast("Please make sure you have added at least one tier", {
              type: "error",
            });

          const areAllFilled = eventData.eventInfo.tiers.every(
            (tier) =>
              tier.name.length > 0 &&
              tier.price > 0 &&
              tier.numberOfTickets > 0,
          );
          if (!areAllFilled)
            return toast(
              "Please make sure all your tiers have names, prices and number of tickets",
              { type: "error" },
            );

          if (
            sumNumbersInObjects(eventData.eventInfo.tiers) <
            eventData.eventInfo.maxNumOfParticipant
          )
            return toast(
              "Your number of tickets should not be less than the number of people",
              { type: "error" },
            );
          if (
            sumNumbersInObjects(eventData.eventInfo.tiers) >
            eventData.eventInfo.maxNumOfParticipant
          )
            return toast(
              "Your number of tickets should not be more than the number of people",
              { type: "error" },
            );

          if (event) {
            const newData: IEventData = {
              ...eventData,

              completedSteps: [true, true, false, false],
            };
            await updateEvent(eventData.eventId, user.uid, newData);
            setEventData(newData);
          } else {
            const newData: IEventData = {
              ...eventData,
              uid: user.uid,
              completedSteps: [true, true, false, false],
            };
            await saveEvent(newData);
          }

          setCurrentStep!(creationSteps![2]);

          toast("Successfully created Event", {
            type: "success",
            autoClose: 3000,
          });
          navigate(`/edit/${eventData?.eventId}?step=3`);
        } else {
          if (!(eventData.eventInfo.amountPerParticipant > 0))
            return toast("Please pass in an amount per person", {
              type: "error",
            });

          if (event) {
            const newData: IEventData = {
              ...eventData,

              completedSteps: [true, true, false, false],
            };
            await updateEvent(eventData.eventId, user.uid, newData);
            setEventData(newData);
          } else {
            const newData: IEventData = {
              ...eventData,
              uid: user.uid,
              completedSteps: [true, true, false, false],
            };
            await saveEvent(newData);
          }

          setCurrentStep!(creationSteps![2]);

          toast("Successfully created Event", {
            type: "success",
            autoClose: 3000,
          });
          navigate(`/edit/${eventData?.eventId}?step=3`);
        }
      } else {
        handleChangeForCompletedSteps!([true, false, false, false]);
        toast("Fill in all the inputs to proceed", {
          type: "error",
          autoClose: 3000,
        });
      }
    } catch (error) {
      console.log(error);
      setCurrentStep!(creationSteps![1]);
    } finally {
      setIsLoadingSubmit(false);
    }

    // const file = e.target[0]?.files[0];
  };
  const eventInfoChange = (e: any) => {
    handleChangeForEventInfo!(e.target.name, e.target.value);
  };

  return (
    <>
      <form className="event_info_form">
        <FormImageSection
          coverImg={coverImg}
          eventData={eventData!}
          handleBackButton={handleBackButton}
          handleUpload={handleUpload}
          isLoadingImage={isLoadingImage}
        />

        <CreatorSection
          eventData={eventData!}
          setEventData={setEventData!}
          eventInfoChange={eventInfoChange}
        />
        <FormSection title="Tell us about your event">
          {!selectedTemplate && !event && (
            <>
              <InputField
                id="eventType"
                type="text"
                label="Event Type / Category"
                name="eventType"
                placeholder="Event Type"
                value={eventData!?.eventType}
                onChange={(e: any) => {
                  handleChangeForEventType!(e.target.value);
                }}
                required={true}
              />
            </>
          )}
          {selectedTemplate && selectedTemplate.templateName == "Others" && (
            <>
              <InputField
                id="eventType"
                type="text"
                label="Event Type / Category"
                name="eventType"
                placeholder="Event Type"
                value={eventData!?.eventType}
                onChange={(e: any) => {
                  handleChangeForEventType!(e.target.value);
                }}
                required={true}
              />
            </>
          )}

          <InputField
            id="title"
            type="text"
            label="Title"
            name="title"
            placeholder="Title / Name of the event"
            required={true}
            value={eventInfo.title}
            onChange={eventInfoChange}
          />

          <InputField
            id="description"
            type="textarea"
            name="eventDesc"
            required={true}
            label="Event Description"
            placeholder="Fan Hangout..."
            value={eventInfo.eventDesc}
            onChange={eventInfoChange}
          />
        </FormSection>
        <LocationSection setEventData={setEventData!} eventData={eventData!} />
        <TimeSection eventData={eventData!} eventInfoChange={eventInfoChange} />

        <ParticipantSection
          eventData={eventData!}
          eventInfoChange={eventInfoChange}
        />
        <TierSection
          eventData={eventData!}
          setEventData={setEventData!}
          eventInfoChange={eventInfoChange}
        />

        <FormButtons
          handleBackButton={handleBackButton}
          handleSubmit={handleSubmit}
          isLoadingSubmit={isLoadingSubmit}
        />
      </form>
    </>
  );
};

export default TemplateEventForm;
