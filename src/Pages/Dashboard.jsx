import { useContext, useEffect } from "react";
import PreviewAvailableEvents from "../components/PreviewAvailableEvents";
import { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import loader from "../assets/images/orange-loader.svg";
import addIcon from "../assets/images/addIcon.svg";
import Signin from "../components/modals/Signin";
import { fetchEventForAUser } from "../utils/events";
import DashboardEvent from "../components/DashboardEvent";

const Dashboard = () => {
  const [eventList, setEventList] = useState([]);
  const [currentPreview, setCurrentPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, navigate } = useContext(AuthContext);

  const getAllEvents = async () => {
    try {
      const allEvent = await fetchEventForAUser();
      // setEventList(allEvent);
      setEventList(allEvent.filter((event) => event?.uid === user?.uid)),
        // console.log("All event", allEvent);
        setCurrentPreview(eventList[0]); // Get the first list in the array
      // console.log("Event", eventList);
      setLoading(false);
    } catch (error) {
      console.log(error.stack);
    }
  };

  const handleEventClick = (event) => {
    setCurrentPreview(event);
  };

  useEffect(() => {
    getAllEvents();
    // console.log("hello");
  }, [user]);

  if (loading) {
    return (
      <div className="my-[56px] flex w-full items-center justify-center">
        <img width={48} src={loader} alt="" />
      </div>
    );
  } else if (user) {
    return (
      <>
        <div className="w-full space-y-16">
          <div className="space-y-5">
            <h5 className="text-[24px] font-medium">Events</h5>
            <div className="grid grid-cols-1 gap-5 laptop:grid-cols-4">
              <div
                className="flex h-[206px] w-full max-w-[265px] cursor-pointer flex-col items-center justify-center gap-4 rounded-[10px] border-[1px] border-[#E4E4E4]  bg-gray-300  laptop:h-full"
                onClick={() => navigate("/create")}
              >
                <img src={addIcon} alt="" />
                <p className="font-normal text-black">Create Event</p>
              </div>
              {eventList &&
                eventList.map((event) => (
                  <DashboardEvent
                    handleEventClick={handleEventClick}
                    event={event}
                    key={event?.id}
                  />
                ))}
            </div>
          </div>
          {currentPreview && (
            <div className="flex flex-col gap-5">
              <h5 className="text-[24px] font-medium">{`Event/${currentPreview?.eventType}`}</h5>
              <PreviewAvailableEvents
                currentPreview={currentPreview}
                setCurrentPreview={setCurrentPreview}
              />
            </div>
          )}
        </div>
      </>
    );
  } else {
    return <Signin />;
  }
};

export default Dashboard;
