import { useContext } from "react";
import { Link } from "react-router-dom";
import { FormContext } from "../contexts/FormContext";
import { initialEventData } from "../data/events";
import { AppContext } from "../contexts/AppContext";

const Home = () => {
  let setEventData: any, setCurrentStep, creationSteps;
  const formContext = useContext(FormContext);
  const appContext = useContext(AppContext);

  if (formContext && appContext) {
    ({ setEventData } = formContext);
    ({ setCurrentStep, creationSteps } = appContext);
  }
  return (
    <div className="mb-10 mt-[20px] flex w-full flex-col-reverse justify-center laptop:mb-0 laptop:mt-[50px] laptop:flex-row">
      <div className="flex w-full flex-col gap-[35px] laptop:w-[60%] laptop:gap-[28px]">
        <div>
          <h1 className="w-full text-[30px] tablet:text-[64px]">
            Create and share events in minutes
          </h1>
          <p className="text-[18px] font-light leading-[25.56px] tablet:w-[70%]">
            You can set a budget for your event and collect money from the
            participants securely and conveniently.
          </p>
        </div>
        <div className="flex gap-4">
          <div>
            <Link
              to="/create"
              className="rounded-[15px] bg-orange-clr px-6 py-[14px] text-[18px] text-white"
              onClick={() => {
                setEventData(initialEventData);
                setCurrentStep!(creationSteps![0]);
              }}
            >
              Create event
            </Link>
          </div>
          <div>
            <Link
              className="rounded-[15px] border border-[#060811] px-6 py-[14px] text-[18px] font-medium text-[#060811] "
              to={"/"}
            >
              Learn more
            </Link>
          </div>
        </div>
      </div>
      <div className="shrink-0 laptop:w-[40%]">
        <img
          className="object-cover"
          src="../../friend_taking_pic.png"
          alt="Hero section image"
        />
      </div>
    </div>
  );
};

export default Home;
/* Frame 4 */

/* 
border: 1px solid rgba(6, 8, 17, 0.2);
border-radius: 15px; */
