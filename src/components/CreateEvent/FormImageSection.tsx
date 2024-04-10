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
        className="flex gap-2 items-center text-orange-clr"
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
              className={`flex absolute flex-col gap-8 justify-center items-center m-auto text-white bg-black rounded-full opacity-90 cursor-pointer bottom-[30px] right-[40px] z-[50] h-[30px] w-[30px]`}
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
