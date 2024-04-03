import React, { useContext, useEffect, useState } from "react";
import cover from "../assets/images/resturant image.jpeg";
import EventSchedule from "./EventSchedule";
import { AppContext } from "../context/AppContext";
import InputField from "./InputField";
import { AuthContext } from "../context/AuthContext";
import { FormContext } from "../context/FormContext";
import { FiArrowLeft } from "react-icons/fi";

const TemplateEventForm = () => {
  const {
    selectedTemplate,
    setCurrentStep,
    stepData,
    setStepData,
    currentStep,
  } = useContext(AppContext);
  const {
    eventData,
    setEventData,
    handleChangeForEventInfo,
    setImgUrl,
    imgUrl,
  } = useContext(FormContext);
  const [coverImg, setCoverImg] = useState(cover);
  const { eventInfo } = eventData;
  const { user } = useContext(AuthContext);

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const imgUrl = await convertBase64(file);
    setCoverImg(imgUrl);
    setEventData({ ...eventData, eventImg: imgUrl });
  };

  useEffect(() => {
    setEventData({
      ...eventData,
      uid: user?.uid,
      eventType: selectedTemplate.templateName,
    });
    setCoverImg(selectedTemplate.imgUrl);
  }, []);

  const handleBackButton = () => {
    setCurrentStep(stepData[0]);
    const newStep = stepData.map((step) => {
      if (step.id === currentStep.id) {
        return { ...step, checked: false };
      } else {
        return step;
      }
    });
    setStepData(newStep);
  };

  return (
    <>
      <form className="event_info_form">
        <div className="mb-12 space-y-3">
          <button
            onClick={handleBackButton}
            className="flex items-center gap-2 text-blue-500"
          >
            <FiArrowLeft />
            Go back
          </button>
          <p className="font-normal">{selectedTemplate.templateName}</p>
          <div className="relative w-full cursor-pointer">
            <label className="relative z-[50] w-full cursor-pointer">
              <img
                src={coverImg}
                alt="a cover image illustration of template cover"
                className="h-[400px] w-full rounded-xl object-cover"
              />
              <input
                onChange={handleUpload}
                type="file"
                className="hidden"
                name=""
                id=""
              />
            </label>
            <div className="absolute bottom-0 left-0 right-0 top-0 m-auto flex w-fit items-center gap-3">
              <svg
                width="18"
                height="19"
                viewBox="0 0 18 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 18.5C1.45 18.5 0.979333 18.3043 0.588 17.913C0.196667 17.5217 0.000666667 17.0507 0 16.5V2.5C0 1.95 0.196 1.47933 0.588 1.088C0.98 0.696667 1.45067 0.500667 2 0.5H16C16.55 0.5 17.021 0.696 17.413 1.088C17.805 1.48 18.0007 1.95067 18 2.5V16.5C18 17.05 17.8043 17.521 17.413 17.913C17.0217 18.305 16.5507 18.5007 16 18.5H2ZM2 16.5H16V2.5H2V16.5ZM3 14.5H15L11.25 9.5L8.25 13.5L6 10.5L3 14.5Z"
                  fill="white"
                />
              </svg>
              <span className="z-[51] text-[16px] font-medium text-white">
                Change event photo
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-7">
          <InputField
            id="titlr"
            type="text"
            label="Title"
            name="title"
            placeholder="Title"
            value={eventInfo.title}
            onChange={handleChangeForEventInfo}
          />
          <InputField
            id="name"
            type="text"
            label="Creator name"
            name="creatorName"
            placeholder="name"
            value={eventInfo.creatorName}
            onChange={handleChangeForEventInfo}
          />
          <InputField
            id="email"
            type="email"
            label="Email address"
            name="creatorEmail"
            placeholder="Your email address"
            value={eventInfo.creatorEmail}
            onChange={handleChangeForEventInfo}
          />
          <InputField
            id="link"
            type="text"
            label="Social link"
            name="socialLink"
            placeholder="https://instagram.com/username (X, instagram, tiktok..)"
            value={eventInfo.socialLink}
            onChange={handleChangeForEventInfo}
          />
          <h4>Tell us about your event</h4>
          <InputField
            id="description"
            type="textarea"
            name="eventDesc"
            label="Event Description"
            placeholder="Fan Hangout..."
            value={eventInfo.eventDesc}
            onChange={handleChangeForEventInfo}
          />
        </div>

        <div className="space-y-7">
          <h4>Where are you having the event?</h4>
          <InputField
            id="location"
            type="text"
            label="Location"
            name="eventLocation"
            placeholder="Where are you having the event?"
            value={eventInfo.eventLocation}
            onChange={handleChangeForEventInfo}
          />
        </div>

        <div>
          <h4>When is the event?</h4>
          <EventSchedule
            eventInfo={eventInfo}
            handleChangeForEventInfo={handleChangeForEventInfo}
          />
        </div>

        <div className="space-y-6">
          <h4>Who’s attending the event?</h4>
          <InputField
            id="min_num_participant"
            type="number"
            label="Minimum number of participants"
            name="minNumOfParticipant"
            placeholder="Minimum"
            value={eventInfo.minNumOfParticipant}
            onChange={handleChangeForEventInfo}
          />

          <InputField
            id="max_num_participant"
            type="number"
            label="Maximum number of participants"
            name="maxNumOfParticipant"
            placeholder="Maximum"
            value={eventInfo.maxNumOfParticipant}
            onChange={handleChangeForEventInfo}
          />

          <div className="field_set_div">
            <label htmlFor="gender">Participants gender</label>
            <select
              name="typeOfParticipants"
              id="gender"
              className="inputs"
              type="select"
              value={eventInfo.typeOfParticipants}
              onChange={handleChangeForEventInfo}
            >
              <option value="">select an option</option>
              <option value="males">All male</option>
              <option value="females">All female</option>
              <option value="both genders">Both male and female</option>
            </select>
          </div>
        </div>

        <div className="space-y-6">
          <h4>How much is the event</h4>
          <InputField
            id="amount"
            type="text"
            label="Amount per person"
            name="amountPerParticipant"
            placeholder="0.00 (NGN)"
            value={eventInfo.amountPerParticipant}
            onChange={handleChangeForEventInfo}
          />
        </div>

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
              onClick={() => setCurrentStep(stepData[2])}
              className="primary_button block tablet:w-[100%]"
              type="button"
            >
              Continue
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default TemplateEventForm;
