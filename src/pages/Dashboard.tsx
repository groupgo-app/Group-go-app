import { useContext, useEffect } from "react";
import { useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

import addIcon from "../assets/images/addIcon.svg";
import Signin from "../components/modals/Signin";
import DashboardEvent from "../components/Dashboard/DashboardEvent";
import { AppContext } from "../contexts/AppContext";
import { deleteEvent, fetchEvents } from "../api/events";
import { useNavigate } from "react-router-dom";
import { FormContext } from "../contexts/FormContext";
import { initialEventData } from "../data/events";
import Loader from "../components/Loader";
import Underliner from "../components/Underliner";
import { IEventData } from "../types/Event";
import { isPassedCurrentTime } from "../utils/isPassedCurrentTime";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";

const Dashboard = () => {
  let setEventData, user: any, setCurrentStep, creationSteps;
  const formContext = useContext(FormContext);
  const authContext = useContext(AuthContext);
  const appContext = useContext(AppContext);

  if (formContext && authContext && appContext) {
    ({ setEventData } = formContext);
    ({ user } = authContext);
    ({ setCurrentStep, creationSteps } = appContext);
  }

  const [eventList, setEventList] = useState<IEventData[]>([]);
  const [loading, setLoading] = useState(false);

  const [drafts, setDrafts] = useState<IEventData[]>([]);
  const [completedEvents, setCompletedEvents] = useState<IEventData[]>([]);
  const navigate = useNavigate();

  const getAllEvents = async () => {
    try {
      setLoading(true);
      const allEvents: any[] = await fetchEvents();

      setEventList(
        allEvents.filter(
          (event) =>
            event?.uid === user?.uid &&
            event.inCreation === false &&
            !isPassedCurrentTime(
              event.eventInfo.endDate,
              event.eventInfo.endTime,
            ),
        ),
      );
      setDrafts(
        allEvents.filter(
          (event) => event?.inCreation === true && event?.uid === user?.uid,
        ),
      );
      setCompletedEvents(
        allEvents.filter(
          (event: IEventData) =>
            isPassedCurrentTime(
              event.eventInfo.endDate,
              event.eventInfo.endTime,
            ) &&
            event.inCreation === false &&
            event?.uid === user?.uid,
        ),
      );

      setLoading(false);
    } catch (error: any) {
      console.log(error.stack);
    }
  };

  useEffect(() => {
    if (user) getAllEvents();
  }, []);

  const handleDelete = async (e: any, eventId: string) => {
    try {
      e.preventDefault();
      await deleteEvent(eventId);
      toast("Event Successfully deleted", { type: "success" });
      setCompletedEvents(
        completedEvents.filter((event) => event.eventId !== eventId),
      );
    } catch (error) {
      toast("Could not delete event", { type: "error" });
    }
  };

  const handleDeleteForDrafts = async (e: any, eventId: string) => {
    try {
      e.preventDefault();
      await deleteEvent(eventId);
      toast("Event Successfully deleted", { type: "success" });
      setDrafts(drafts.filter((event) => event.eventId !== eventId));
    } catch (error) {
      toast("Could not delete event", { type: "error" });
    }
  };

  if (loading) return <Loader />;
  else if (user) {
    return (
      <>
        <Helmet>
          <title data-react-helmet="true">Groupgo | Dashboard</title>
          <meta
            name="description"
            data-react-helmet="true"
            content="Beautiful Dashboard for your events"
          />

          <meta
            property="og:url"
            data-react-helmet="true"
            content={`${import.meta.env.VITE_REACT_SITE_URL}/site_img.png`}
          />
          <meta
            property="og:title"
            data-react-helmet="true"
            content={"Groupgo | Dashboard"}
          />
          <meta
            property="og:description"
            data-react-helmet="true"
            content={"Beautiful Dashboard for your events"}
          />
          <meta
            property="og:image"
            data-react-helmet="true"
            content={`${import.meta.env.VITE_REACT_SITE_URL}/site_img.png`}
          />
          <meta
            property="og:site_name"
            data-react-helmet="true"
            content="Group Go"
          />

          <meta
            name="twitter:card"
            data-react-helmet="true"
            content="summary_large_image"
          />

          <meta
            name="twitter:title"
            data-react-helmet="true"
            content={"Groupgo | Dashboard"}
          />
          <meta
            name="twitter:description"
            data-react-helmet="true"
            content={"Beautiful Dashboard for your events"}
          />
          <meta
            name="twitter:image"
            data-react-helmet="true"
            content={`${import.meta.env.VITE_REACT_SITE_URL}/site_img.png`}
          />
          <meta
            name="pinterest:description"
            data-react-helmet="true"
            content={"Beautiful Dashboard for your events"}
          />
          <meta
            name="pinterest:image"
            data-react-helmet="true"
            content={`${import.meta.env.VITE_REACT_SITE_URL}/site_img.png`}
          />

          <meta
            name="linkedin:title"
            data-react-helmet="true"
            content={"Groupgo | Dashboard"}
          />
          <meta
            name="linkedin:description"
            data-react-helmet="true"
            content={"Beautiful Dashboard for your events"}
          />
          <link
            rel="canonical"
            href={`${import.meta.env.VITE_REACT_SITE_URL}/dashboard`}
          />
        </Helmet>
        <div className="w-full space-y-16">
          <div className="space-y-5">
            <h5 className="text-[24px] font-medium">Events</h5>
            <div className="grid grid-cols-1 gap-5 laptop:grid-cols-4">
              <div
                className="flex min-h-[265px] w-full min-w-[300px] max-w-[300px] cursor-pointer flex-col items-center justify-center gap-4 rounded-[10px] border-[1px] border-[#E4E4E4]  bg-white  laptop:h-full"
                onClick={() => {
                  setCurrentStep!(creationSteps![0]);
                  setEventData!(initialEventData);
                  navigate("/create");
                }}
              >
                <img src={addIcon} alt="Add Icon" />
                <p className="font-normal text-black">Create Event</p>
              </div>
            </div>
            <div>
              <h3 className="my-4 text-4xl">Ongoing / Upcoming Events</h3>
              <Underliner />
              {eventList.length > 0 ? (
                <>
                  <div className="flex flex-wrap items-center justify-center gap-4 pt-5 tablet:justify-start">
                    {eventList.map((event) => (
                      <DashboardEvent event={event} key={event?.eventId} />
                    ))}
                  </div>
                </>
              ) : (
                <p>No upcoming events or on-going events</p>
              )}
            </div>

            {drafts.length > 0 && (
              <div className="py-5">
                <h3 className="text-4xl">Drafts</h3>
                <Underliner />
                <p>Finish up setting up your events</p>

                <div className="flex flex-wrap items-center justify-center gap-4 tablet:justify-start">
                  {drafts.map((event) => (
                    <DashboardEvent
                      event={event}
                      key={event?.eventId}
                      draft={true}
                      handleDelete={handleDeleteForDrafts}
                    />
                  ))}
                </div>
              </div>
            )}

            {completedEvents.length > 0 && (
              <>
                <h3 className="text-4xl">Ended Events</h3>
                <Underliner />
                <p>Check out the details of the completed events</p>
                <div className="py-5">
                  <div className="flex flex-wrap items-center justify-center gap-4 tablet:justify-start">
                    {completedEvents.map((event) => (
                      <DashboardEvent
                        event={event}
                        key={event?.id}
                        completed
                        handleDelete={handleDelete}
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </>
    );
  } else {
    return <Signin />;
  }
};

export default Dashboard;
