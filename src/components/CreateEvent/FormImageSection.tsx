import React from "react";
import { FiArrowLeft, FiUpload } from "react-icons/fi";
import { IEventData } from "../../types/Event";
import Loader from "../Loader";

const FormImageSection = ({
  eventData,
  coverImg,
  isLoadingImage,
  handleUpload,
  handleBackButton,
}: {
  eventData: IEventData;
  coverImg: string;
  isLoadingImage: boolean;
  handleUpload: any;
  handleBackButton: any;
}) => {
  return (
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
              className={`absolute bottom-[30px] right-[40px] z-[50] m-auto flex h-[30px] w-[30px] cursor-pointer flex-col items-center justify-center gap-8 rounded-full bg-black text-white opacity-90`}
              htmlFor="eventImg"
            >
              <FiUpload className="text-xl text-white" />
            </label>
          </div>
        </>
      )}
    </div>
  );
};

export default FormImageSection;
