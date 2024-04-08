import { useContext, useEffect, useState } from "react";
import EventSchedule from "../EventSchedule";
import { AppContext } from "../../contexts/AppContext";
import InputField from "../InputField";
import { AuthContext } from "../../contexts/AuthContext";
import { FormContext } from "../../contexts/FormContext";
import { FiArrowLeft, FiUpload } from "react-icons/fi";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../config/firebase";
import { saveEvent, updateEvent } from "../../api/events";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import { toast } from "react-toastify";
import SocialLinkInput from "../SocialLinkInput";
import isUrl from "../../utils/isUrl";
import FormSection from "./FormSection";
import LocationSection from "./LocationSection";
import { linkToImage } from "../../utils/linkToImage";
import { ITemplate } from "../../types/Template";
import { IEventData } from "../../types/Event";
import { IStep } from "../../types/Step";

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
        eventData.eventInfo.typeOfParticipants.length > 0 &&
        eventData.eventInfo.amountPerParticipant > 0
      ) {
        setIsLoadingSubmit(true);
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
        <div className="mb-12 space-y-3">
          <button
            onClick={handleBackButton}
            className="flex items-center gap-2 text-orange-clr"
          >
            <FiArrowLeft />
            Go back
          </button>
          <p className="font-normal">{eventData!.eventType}</p>
          {isLoadingImage ? (
            <Loader />
          ) : (
            <>
              <div className={`relative w-full bg-[${coverImg}]`}>
                <img
                  src={coverImg && coverImg}
                  alt="a cover image illustration of template cover"
                  className="h-[400px] w-full rounded-xl object-cover"
                />
                <input
                  onChange={(e) => {
                    // setShowAddButton(true);
                    handleUpload(e.target.files![0], eventData);
                  }}
                  type="file"
                  className="hidden"
                  name=""
                  id="eventImg"
                />
                <label
                  className={`absolute  bottom-[30px] right-[40px] z-[50] m-auto flex h-[30px] w-[30px] cursor-pointer flex-col items-center justify-center gap-8 rounded-full  bg-black text-white opacity-90 `}
                  htmlFor="eventImg"
                >
                  <FiUpload className="text-xl text-white" />
                  {/* <span className="z-[51] text-[16px] font-medium">
                    Change event photo
                  </span> */}
                </label>
              </div>
              {/* {showAddButton && (
                <div>
                  <label
                    htmlFor="eventImg"
                    className="cursor-pointer rounded-xl bg-orange-clr p-4 py-2 !text-white hover:opacity-70"
                  >
                    Change Event Photo
                  </label>
                </div>
              )} */}
            </>
          )}
        </div>

        <div className="space-y-7">
          <FormSection title="Creator Details">
            <InputField
              id="name"
              type="text"
              label="Creator name"
              name="creatorName"
              placeholder="name"
              required={true}
              value={eventInfo.creatorName}
              onChange={eventInfoChange}
            />
            <InputField
              id="email"
              type="text"
              label="Email address"
              name="creatorEmail"
              required={true}
              placeholder="Your email address"
              value={eventInfo.creatorEmail}
              onChange={eventInfoChange}
            />

            <SocialLinkInput
              eventData={eventData!}
              setEventData={setEventData!}
              toast={toast}
            />
          </FormSection>
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
        </div>
        <LocationSection setEventData={setEventData!} eventData={eventData!} />
        <FormSection title="When is the event?">
          <EventSchedule
            eventInfo={eventInfo}
            handleChangeForEventInfo={eventInfoChange}
          />
        </FormSection>
        <FormSection title="Who is attending the event?">
          <InputField
            id="min_num_participant"
            type="number"
            label="Minimum number of participants"
            name="minNumOfParticipant"
            placeholder="Minimum"
            required={true}
            value={eventInfo.minNumOfParticipant}
            onChange={eventInfoChange}
          />

          <InputField
            id="max_num_participant"
            required={true}
            type="number"
            label="Maximum number of participants"
            name="maxNumOfParticipant"
            placeholder="Maximum"
            value={eventInfo.maxNumOfParticipant}
            onChange={eventInfoChange}
          />

          <div className="field_set_div">
            <label htmlFor="gender">Participants gender</label>
            <select
              name="typeOfParticipants"
              id="gender"
              className="inputs"
              // type="select"
              value={eventInfo.typeOfParticipants}
              onChange={eventInfoChange}
            >
              <option value="">select an option</option>
              <option value="males">All male</option>
              <option value="females">All female</option>
              <option value="both genders">Both male and female</option>
            </select>
          </div>
        </FormSection>
        <FormSection title="Pricing">
          <InputField
            id="amount"
            required={true}
            type="number"
            label="Amount per person"
            name="amountPerParticipant"
            placeholder="0.00 (NGN)"
            value={eventInfo.amountPerParticipant}
            onChange={eventInfoChange}
          />
        </FormSection>

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
              onClick={handleSubmit}
              className="primary_button block tablet:w-[100%]"
              disabled={isLoadingSubmit}
              type="submit"
            >
              {isLoadingSubmit ? (
                <>
                  <Loader />
                </>
              ) : (
                <>Save and Continue</>
              )}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default TemplateEventForm;
