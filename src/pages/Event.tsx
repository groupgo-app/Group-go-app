import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import location from "../assets/images/location.svg";
import profile from "../assets/images/profile.svg";
import dateImg from "../assets/images/date.svg";
import moneyImg from "../assets/images/money.svg";
import PageNotFound from "./PageNotFound";
import { updateParticipantsCount } from "../utils/events";
import { AuthContext } from "../contexts/AuthContext";

import { usePaystackPayment } from "react-paystack";
import moment from "moment";
import { nanoid } from "nanoid";
import { IEventData } from "../types/Event";
import { fetchEventById } from "../api/events";
import { SocialIcon } from "react-social-icons";
import LocationMap from "../components/CreateEvent/LocationMap";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { isPassedCurrentTime } from "../utils/isPassedCurrentTime";
import ShareInviteLink from "../components/ShareInviteLink";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa6";

const Event = () => {
  let user;
  const [loading, setLoading] = useState(true);
  const { eventId } = useParams();
  const [event, setEvent] = useState<IEventData>();

  const authContext = useContext(AuthContext);

  if (authContext) {
    ({ user } = authContext);
  }

  const startDate = moment(event?.eventInfo?.startDate).format("DD MMM, YYYY");
  const endDate = moment(event?.eventInfo?.endDate).format("DD MMM, YYYY");

  const startTime = moment(event?.eventInfo?.startTime, "HH:mm").format(
    "hh:mm A",
  );
  const endTime = moment(event?.eventInfo?.endTime, "HH:mm").format("hh:mm A");

  const config = {
    reference: nanoid(),
    email: user?.email,
    publicKey: import.meta.env.VITE_REACT_PAYSTACK_API,
    amount: Number(event?.eventInfo?.amountPerParticipant) * 100,
    metadata: {
      custom_fields: [
        {
          display_name: user?.email,
          variable_name: user?.email,
          value: user?.email,
        },
      ],
    },
  };

  const onSuccess = () => {
    updateParticipantsCount(eventId);
  };

  const onClose = () => {
    toast("Your payment was unsuccessful, try again later!", { type: "error" });
  };

  const initializePayment = usePaystackPayment(config);

  const getDataSingleEvent = async () => {
    try {
      const saveDataEvent = await fetchEventById(eventId!);
      setEvent(saveDataEvent);
      setLoading(false);
    } catch (error: any) {
      console.log(error?.stack);
    }
  };

  useEffect(() => {
    getDataSingleEvent();
  }, [eventId]);

  const handlePaymentSubmit = async () => {
    await initializePayment(onSuccess, onClose);
  };

  if (loading) {
    return <Loader />;
  } else if (event) {
    return (
      <div className="w-full overflow-hidden">
        <div>
          <h2 className="">{event?.eventInfo.title}</h2>
          <p className="py-2 text-sm">Event Type: {event?.eventType}</p>
        </div>

        <div className="my-4 aspect-video w-full ">
          <img
            className="aspect-video w-full rounded-sm object-cover"
            src={event?.eventImg}
            alt=""
          />
        </div>

        <div>
          <h3>Event Description</h3>

          <p>{event?.eventInfo?.eventDesc}</p>
        </div>

        <div className="my-4 flex flex-wrap gap-2 border border-red-500">
          {/* Date */}
          <div className="  h-[149px] w-full flex-col justify-between rounded-[10px] bg-[#f7f6f9] p-[18px] tablet:w-[45%]">
            <div className="flex items-center gap-[8px]">
              <img src={dateImg} alt="" />
              <p>Date and time</p>
            </div>

            <div className="pt-1">
              {event.eventInfo.startDate === event.eventInfo.endDate ? (
                <>
                  <h5 className="mb-[2px] font-medium">{`${startDate}`}</h5>
                  <h5 className="font-medium">{`${startTime} to ${endTime}`}</h5>
                </>
              ) : (
                <>
                  <h5 className="mb-1 font-medium">{`${startDate}, ${startTime}`}</h5>
                  <p>To</p>
                  <h5 className="font-medium">{`${endDate}, ${endTime}`}</h5>
                </>
              )}
            </div>
          </div>
          {/* Payment */}
          <div className=" h-[250px] w-full flex-col justify-between rounded-[10px] bg-[#f7f6f9] p-[18px] pt-1 tablet:w-[45%]">
            <div className="flex items-center gap-[8px]">
              <img src={moneyImg} alt="" />
              <p>Commitment per person</p>
            </div>

            <div className="">
              <h5 className="font-medium">
                &#8358; {event?.eventInfo?.amountPerParticipant}
              </h5>
            </div>
            <div className="my-4 flex items-center gap-[8px]">
              <img src={profile} alt="" />
              <p className="text-sm capitalize">
                {!(event.eventInfo.typeOfParticipants.length > 7) && "Only "}
                {event?.eventInfo?.typeOfParticipants} Allowed
              </p>
            </div>
            <div>
              <h5 className="mb-[15px]">
                {isPassedCurrentTime(
                  event.eventInfo.endDate,
                  event.eventInfo.endDate,
                ) ? (
                  "0"
                ) : (
                  <>
                    {`${
                      (event?.eventInfo?.maxNumOfParticipant || 0) -
                      (event?.numberOfPaidParticipants || 0)
                    }`}{" "}
                  </>
                )}
                Tickets available
              </h5>
              <p className="py-2 text-sm">Event Type: {event?.eventType}</p>
              <button
                onClick={handlePaymentSubmit}
                disabled={
                  event?.numberOfPaidParticipants ===
                    Number(event?.eventInfo?.maxNumOfParticipant) ||
                  isPassedCurrentTime(
                    event?.eventInfo.endDate,
                    event?.eventInfo.endTime,
                  )
                }
                className={`w-full rounded-[15px] bg-[#e2614b] px-[24px] py-[10px] text-[#fff] ${
                  event?.numberOfPaidParticipants ===
                    Number(event?.eventInfo?.maxNumOfParticipant) ||
                  isPassedCurrentTime(
                    event?.eventInfo.endDate,
                    event?.eventInfo.endTime,
                  )
                    ? "cursor-not-allowed bg-red-900"
                    : ""
                }`}
              >
                {isPassedCurrentTime(
                  event?.eventInfo.endDate,
                  event?.eventInfo.endTime,
                ) ? (
                  <>Event Ended</>
                ) : (
                  <>
                    {event?.numberOfPaidParticipants ===
                    Number(event?.eventInfo?.maxNumOfParticipant)
                      ? "No more ticket"
                      : "Apply for event"}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
        {/* Organiser Details */}
        <div className="w-fit rounded-xl bg-gray-300 p-4">
          <h4>Host / Organiser Details</h4>
          <div className="flex justify-center">
            <FaUser className="text-center text-4xl" />
          </div>
          <h5 className="text-center">
            <strong>{event?.eventInfo?.creatorName}</strong>
          </h5>
          <p className="flex items-center gap-2 text-sm">
            <MdEmail />
            <span>
              Email:{" "}
              <a href={`mailto:${event.eventInfo.creatorEmail}`}>
                {event.eventInfo.creatorEmail}
              </a>
            </span>
          </p>
          <p className="flex flex-wrap items-center gap-1 text-sm">
            Event Links:{" "}
            <div className="flex flex-wrap items-center gap-1">
              {JSON.parse(String(event?.eventInfo?.socialLinks)).map(
                (link: string, i: number) => (
                  <span
                    key={i}
                    className="flex w-fit items-center gap-3 rounded-xl p-2 hover:bg-gray-300"
                  >
                    <SocialIcon
                      url={link}
                      style={{ width: "20px", height: "20px" }}
                    />
                  </span>
                ),
              )}
            </div>
          </p>
        </div>
        <div className="flex flex-col gap-[15px] tablet:gap-[8px]">
          <h3 className="flex items-center gap-4">
            <img src={location} alt="" />
            Location
          </h3>
          <p className="font-medium">
            {event.eventInfo.eventLocation.display_name}
          </p>
          <LocationMap location={event.eventInfo.eventLocation} />
          {/* <img src={mapImg} alt="" className="w-full map" /> */}
          {/* <div className="w-full"><iframe width="100%" height="281" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">gps vehicle tracker</a></iframe></div> */}
        </div>

        <div className="my-4">
          {event.uid === user.uid &&
            !isPassedCurrentTime(
              event.eventInfo.endDate,
              event.eventInfo.endTime,
            ) && (
              <>
                <ShareInviteLink event={event} />
              </>
            )}
        </div>

        {/* <div className="my-[55px] flex flex-wrap gap-10">
          <div className="flex w-fit max-w-full flex-col gap-[24px] laptop:w-[400px]">
            <div className="flex flex-col gap-[6px]">
              <h3 className="">{event?.eventInfo.title}</h3>
              <p className="text-sm">Event Type: {event?.eventType}</p>
              <div className="items-center gap-[22px]">
                <div className="my-4 flex items-center gap-[8px]">
                  <img src={location} alt="" />
                  <p className="text-xs">
                    {event?.eventInfo?.eventLocation?.display_name}
                  </p>
                </div>
                <div className="my-4 flex items-center gap-[8px]">
                  <img src={profile} alt="" />
                  <p className="text-xs">
                    {event?.eventInfo?.typeOfParticipants}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3>Event Description</h3>
              <p>{event?.eventInfo?.eventDesc}</p>
            </div>
          </div>

          <div className="flex w-fit max-w-full flex-col gap-[18px]">
            <div className="flex flex-col gap-4 tablet:flex-row">
              <div className="h-[149px] w-full flex-col  justify-between rounded-[10px] bg-[#f7f6f9] p-[18px] pt-1 tablet:w-[50%]">
                <div className="flex items-center gap-[8px]">
                  <img src={moneyImg} alt="" />
                  <p>Commitment per person</p>
                </div>

                <div className="">
                  <h5 className="font-medium">
                    &#8358; {event?.eventInfo?.amountPerParticipant}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    );
  } else {
    return <PageNotFound />;
  }
};
export default Event;
