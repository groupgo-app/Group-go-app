import { Link, useNavigate } from "react-router-dom";
import { IEventData } from "../../types/Event";
// import Loader from "../Loader";
import { FaTrash } from "react-icons/fa6";
import { updateEvent } from "../../api/events";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { BiEdit } from "react-icons/bi";
import Loader from "../Loader";

const DashboardEvent = ({
  event,
  draft = false,
  completed = false,
  handleDelete,
}: {
  event: IEventData;
  draft?: boolean;
  completed?: boolean;
  handleDelete?: (e: any, eventId: string) => Promise<void>;
}) => {
  let user: any;
  const authContext = useContext(AuthContext);
  const [singleEventLoading, setSingleEventLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  if (authContext) {
    ({ user } = authContext);
  }
  const navigate = useNavigate();
  const deleteEvent = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    try {
      setDeleteLoading(true);
      await handleDelete!(e, event.eventId);
    } catch (error) {
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleEdit = async (e: any) => {
    try {
      setSingleEventLoading(true);
      e.preventDefault();
      const newData: IEventData = { ...event, inCreation: true };
      await updateEvent(event?.eventId, user?.uid, newData, true);
      navigate(`/edit/${event?.eventId}?step=2`);
    } catch (error) {
    } finally {
      setSingleEventLoading(false);
    }
  };
  return (
    <>
      <figure className="relative flex w-full min-w-[300px] max-w-[300px] cursor-pointer flex-col gap-1 rounded-xl border border-orange-clr bg-white pb-2">
        <img
          src={event?.eventImg}
          alt=""
          className="relative h-[250px] w-full rounded-[10px]  object-cover"
        />
        <figcaption className="px-2">
          <h3 className="px-4 py-2 text-xl">{event?.eventInfo.title}</h3>

          <Link
            to={draft ? `/edit/${event?.eventId}` : `/${event?.eventId}`}
            className="flex items-center justify-center gap-2 rounded-[15px] bg-orange-clr py-[7px] text-white"
          >
            <svg
              width="21"
              height="10"
              viewBox="0 0 21 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.5 10H5.5C4.11667 10 2.93767 9.51233 1.963 8.537C0.988333 7.56167 0.500667 6.38267 0.5 5C0.5 3.61667 0.987667 2.43767 1.963 1.463C2.93833 0.488334 4.11733 0.000666667 5.5 0H9.5V2H5.5C4.66667 2 3.95833 2.29167 3.375 2.875C2.79167 3.45833 2.5 4.16667 2.5 5C2.5 5.83333 2.79167 6.54167 3.375 7.125C3.95833 7.70833 4.66667 8 5.5 8H9.5V10ZM6.5 6V4H14.5V6H6.5ZM11.5 10V8H15.5C16.3333 8 17.0417 7.70833 17.625 7.125C18.2083 6.54167 18.5 5.83333 18.5 5C18.5 4.16667 18.2083 3.45833 17.625 2.875C17.0417 2.29167 16.3333 2 15.5 2H11.5V0H15.5C16.8833 0 18.0627 0.487667 19.038 1.463C20.0133 2.43833 20.5007 3.61733 20.5 5C20.5 6.38333 20.0123 7.56267 19.037 8.538C18.0617 9.51333 16.8827 10.0007 15.5 10H11.5Z"
                fill="white"
              />
            </svg>
            {draft ? "Edit Details" : completed ? "View Details" : "View"}
          </Link>

          {!draft && (
            <>
              <button
                type="button"
                className="my-4 flex w-full items-center justify-center  gap-2 rounded-[15px] border border-orange-clr bg-orange-clr bg-opacity-15 py-2 text-orange-clr hover:bg-opacity-50"
                onClick={async (e) => {
                  await handleEdit(e);
                }}
              >
                {singleEventLoading ? (
                  <>
                    <Loader variant="small" />
                  </>
                ) : (
                  <>
                    <BiEdit />
                    Edit
                  </>
                )}
              </button>
            </>
          )}

          {(completed || draft) && (
            <>
              <button
                type="button"
                className="my-4 flex w-full items-center justify-center  gap-2 rounded-[15px] bg-red-800 py-2 text-white hover:bg-opacity-70"
                onClick={async (e) => {
                  await deleteEvent(e);
                }}
              >
                {deleteLoading ? (
                  <>
                    <Loader variant="small" />
                  </>
                ) : (
                  <>
                    <FaTrash />
                    Delete Event
                  </>
                )}
              </button>
            </>
          )}
        </figcaption>
      </figure>
    </>
  );
};

export default DashboardEvent;
