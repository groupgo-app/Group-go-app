import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import location from "../assets/images/location.svg";
import profile from "../assets/images/profile.svg";
import dateImg from "../assets/images/date.svg";
import moneyImg from "../assets/images/money.svg";
import PageNotFound from "./PageNotFound";
import { AuthContext } from "../contexts/AuthContext";
import moment from "moment";
import { IEventData, IEventTier, IPayEvent } from "../types/Event";
import { fetchEventById } from "../api/events";
import { SocialIcon } from "react-social-icons";
import LocationMap from "../components/CreateEvent/LocationMap";
import Loader from "../components/Loader";

import { isPassedCurrentTime } from "../utils/isPassedCurrentTime";
import ShareInviteLink from "../components/ShareInviteLink";
import { MdEmail } from "react-icons/md";
import { FaMoneyBill, FaTicket, FaUser } from "react-icons/fa6";
import { FormContext } from "../contexts/FormContext";

const Event = () => {
  // let user;
  let setPaymentData: React.Dispatch<React.SetStateAction<IPayEvent>>,
    setEventData: any;
  const [loading, setLoading] = useState(true);
  const { eventId } = useParams();
  const [event, setEvent] = useState<IEventData>();

  const authContext = useContext(AuthContext);
  const formContext = useContext(FormContext);

  const navigate = useNavigate();
  if (authContext && formContext) {
    // ({ user } = authContext);
    ({ setPaymentData, setEventData } = formContext);
  }

  const startDate = moment(event?.eventInfo?.startDate).format("DD MMM, YYYY");
  const endDate = moment(event?.eventInfo?.endDate).format("DD MMM, YYYY");
  const startTime = moment(event?.eventInfo?.startTime, "HH:mm").format(
    "hh:mm A",
  );
  const endTime = moment(event?.eventInfo?.endTime, "HH:mm").format("hh:mm A");

  const Naira = <>&#8358;</>;

  const handleTierPayment = (e: any, tier: IEventTier, index: number) => {
    e.preventDefault();
    setPaymentData({
      amount: tier.price,
      eventId: event?.eventId!,
      title: event?.eventInfo.title!,
      hasTier: event?.hasTiers,
      tier,
      tierIndex: index,
    });
    navigate(`/${eventId}/pay`);
  };

  const handleNonTierPayment = (e: any) => {
    e.preventDefault();
    setPaymentData({
      amount: event?.eventInfo.amountPerParticipant!,
      eventId: event?.eventId!,
      title: event?.eventInfo.title!,
      hasTier: event?.hasTiers,
    });
    navigate(`/${eventId}/pay`);
  };

  const getDataSingleEvent = async () => {
    try {
      const saveDataEvent = await fetchEventById(eventId!);
      setEventData(saveDataEvent);
      setEvent(saveDataEvent);
      setLoading(false);
    } catch (error: any) {
      console.log(error?.stack);
    }
  };

  useEffect(() => {
    getDataSingleEvent();
  }, [eventId]);
  const isEnded = isPassedCurrentTime(
    event?.eventInfo.endDate,
    event?.eventInfo.endDate,
  );

  if (loading) return <Loader />;
  else if (event) {
    return (
      <div className="w-full overflow-hidden">
        <div>
          <h2 className="">{event?.eventInfo.title}</h2>
          <p className="py-2 text-sm">Event Type: {event?.eventType}</p>
        </div>

        <div className="my-4 aspect-video w-full">
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

        <div className="my-4 flex flex-wrap gap-2">
          {/* Date */}
          <div
            className={`h-[149px] w-full flex-col justify-between rounded-[10px] bg-[#f7f6f9] p-[18px] ${event.hasTiers ? "tablet:w-[45%] laptop:w-[30%]" : "tablet:w-[45%]"}`}
          >
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

          {event.hasTiers ? (
            <div className="my-4 w-full">
              <h3>Event Tiers</h3>
              <div className="my-4 flex flex-wrap items-center gap-4">
                {event.eventInfo.tiers?.map((tier, i) => (
                  <div
                    key={tier.id}
                    className=" min-w-[300px] rounded-xl bg-gray-300 p-4"
                  >
                    <h5>{tier.name}</h5>
                    <div className="flex items-center gap-2">
                      <FaMoneyBill /> {Naira} {tier.price}
                    </div>
                    <div className="flex items-center gap-2">
                      <FaTicket /> {tier.numberOfTickets} Tickets Available{" "}
                    </div>
                    <div>
                      <button
                        className="mt-1 w-full rounded-xl bg-orange-clr p-2 text-white"
                        type="button"
                        onClick={(e) => {
                          handleTierPayment(e, tier, i);
                        }}
                      >
                        Buy ticket
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
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
                  {isEnded ? (
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
                  onClick={handleNonTierPayment}
                  disabled={
                    event?.numberOfPaidParticipants ===
                      Number(event?.eventInfo?.maxNumOfParticipant) || isEnded
                  }
                  className={`w-full rounded-[15px] bg-[#e2614b] px-[24px] py-[10px] text-[#fff] ${
                    event?.numberOfPaidParticipants ===
                      Number(event?.eventInfo?.maxNumOfParticipant) || isEnded
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
          )}
        </div>

        {/* Organiser Details */}
        <div className="my-4 w-fit rounded-xl bg-gray-300 p-4">
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
            <span className="flex flex-wrap items-center gap-1">
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
            </span>
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
        </div>

        <div className="my-4">
          {!isPassedCurrentTime(
            event.eventInfo.endDate,
            event.eventInfo.endTime,
          ) && (
            <>
              <ShareInviteLink event={event} showModals={false} />
            </>
          )}
        </div>
      </div>
    );
  } else {
    return <PageNotFound />;
  }
};
export default Event;
