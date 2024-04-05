import { useContext, useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

import addIcon from "../assets/images/addIcon.svg";
import Signin from "../components/modals/Signin";
import DashboardEvent from "../components/Dashboard/DashboardEvent";
import { AppContext } from "../contexts/AppContext";
import { fetchEvents } from "../api/events";
import { useNavigate } from "react-router-dom";
import { FormContext } from "../contexts/FormContext";
import { initialEventData } from "../data/events";
import Loader from "../components/Loader";
import Underliner from "../components/Underliner";

const Dashboard = () => {
  const [eventList, setEventList] = useState<any[]>([]);
  // const [currentPreview, setCurrentPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setEventData } = useContext(FormContext);
  const { user } = useContext(AuthContext);
  const { setCurrentStep, creationSteps } = useContext(AppContext);
  const [drafts, setDrafts] = useState<any[]>([]);
  const [completedEvents, setCompletedEvents] = useState<any[]>([]);
  const navigate = useNavigate();

  const getAllEvents = async () => {
    try {
      setLoading(true);
      const allEvents: any[] = await fetchEvents();

      setEventList(
        allEvents.filter(
          (event) => event?.uid === user?.uid && event.inCreation === false,
        ),
      );
      setDrafts(allEvents.filter((event) => event?.inCreation === true));
      setCompletedEvents(
        allEvents.filter(
          (event) =>
            event.eventInfo.endDate > new Date() && event.inCreation === false,
        ),
      );

      setLoading(false);
    } catch (error: any) {
      console.log(error.stack);
    }
  };

  useEffect(() => {
    getAllEvents();
    // console.log("hello");
  }, [user]);

  if (loading) {
    return <Loader />;
  } else if (user) {
    return (
      <>
        <div className="w-full space-y-16">
          <div className="space-y-5">
            <h5 className="text-[24px] font-medium">Events</h5>
            <div className="grid grid-cols-1 gap-5 laptop:grid-cols-4">
              <div
                className="flex min-h-[265px] w-full max-w-[265px] cursor-pointer flex-col items-center justify-center gap-4 rounded-[10px] border-[1px] border-[#E4E4E4]  bg-gray-300  laptop:h-full"
                onClick={() => {
                  setCurrentStep!(creationSteps![0]);
                  setEventData!(initialEventData);
                  navigate("/create");
                }}
              >
                <img src={addIcon} alt="" />
                <p className="font-normal text-black">Create Event</p>
              </div>
            </div>
            <div>
              <div className="flex flex-wrap items-center justify-center gap-4 tablet:justify-start">
                {eventList &&
                  eventList.map((event) => (
                    <DashboardEvent
                      // handleEventClick={handleEventClick}
                      event={event}
                      key={event?.eventId}
                    />
                  ))}
              </div>
            </div>

            {drafts.length > 0 && (
              <div className="py-5">
                <h3 className="text-4xl">Drafts</h3>
                <Underliner />
                <p>Finish up setting up your events</p>
                <div className="flex flex-wrap items-center justify-center gap-4 tablet:justify-start">
                  {drafts.map((event) => (
                    <DashboardEvent
                      // handleEventClick={handleEventClick}
                      event={event}
                      key={event?.eventId}
                      draft={true}
                    />
                  ))}
                </div>
              </div>
            )}

            {completedEvents.length > 0 && (
              <div>
                <h3>Completed Events</h3>
                <p>Check out the details of the completed events</p>
                {completedEvents.map((event) => (
                  <DashboardEvent
                    // handleEventClick={handleEventClick}
                    event={event}
                    key={event?.id}
                  />
                ))}
              </div>
            )}
          </div>
          {/* {currentPreview && (
            <div className="flex flex-col gap-5">
              <h5 className="text-[24px] font-medium">{`Event/${currentPreview?.eventType}`}</h5>
              <PreviewAvailableEvents
                currentPreview={currentPreview}
                setCurrentPreview={setCurrentPreview}
              />
            </div>
          )} */}
        </div>
      </>
    );
  } else {
    return <Signin />;
  }
};

export default Dashboard;
