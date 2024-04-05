import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import location from "../assets/images/location.svg";
import profile from "../assets/images/profile.svg";
import instagram from "../assets/images/instagram.svg";
import mapImg from "../assets/images/map.svg";
import dateImg from "../assets/images/date.svg";
import moneyImg from "../assets/images/money.svg";
import loader from "../assets/images/orange-loader.svg";
import PageNotFound from "./PageNotFound";
import {
  // fetchSingleEventByOwnerAndID,
  updateParticipantsCount,
} from "../utils/events";
import { AuthContext } from "../contexts/AuthContext";
// import cover from "../assets/images/resturant image.jpeg";
import { usePaystackPayment } from "react-paystack";
import moment from "moment";
import { nanoid } from "nanoid";
import { IEventData } from "../types/Event";
import { fetchEventById } from "../api/events";

const Event = () => {
  const [loading, setLoading] = useState(true);
  const { eventId } = useParams();
  const [event, setEvent] = useState<IEventData>();

  const { user } = useContext(AuthContext);

  const startDate = moment(event?.eventInfo?.startDate).format("DD MMM, YYYY");

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
    // console.log("This is reference", reference);
    updateParticipantsCount(eventId);
  };

  const onClose = () => {
    console.log("Your payment was unsuccessful, try again later!");
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
    return (
      <div className="my-[56px] flex w-full items-center justify-center">
        <img width={48} src={loader} alt="" />
      </div>
    );
  } else if (event) {
    return (
      <div>
        <img
          className="h-[403px] w-full rounded-[10px] object-cover"
          src={event?.eventImg}
          alt=""
        />

        <div className="my-[55px] flex flex-wrap gap-10">
          <div className="flex w-fit max-w-full flex-col gap-[24px] laptop:w-[400px]">
            <div className="flex flex-col gap-[6px]">
              <h3 className="">{event?.eventType}</h3>
              <div className="flex items-center gap-[22px]">
                <div className="flex items-center gap-[8px]">
                  <img src={location} alt="" />
                  <p>{event?.eventInfo?.eventLocation}</p>
                </div>
                <div className="flex items-center gap-[8px]">
                  <img src={profile} alt="" />
                  <p>{event?.eventInfo?.typeOfParticipants}</p>
                </div>
              </div>
            </div>

            <div>
              <p>
                Number of people paid: {event?.numberOfPaidParticipants || 0}
              </p>
              <p className="mb-[15px]">
                {`${
                  (event?.eventInfo?.maxNumOfParticipant || 0) -
                  (event?.numberOfPaidParticipants || 0)
                }`}{" "}
                people left unpaid
              </p>
              <button
                onClick={handlePaymentSubmit}
                disabled={
                  event?.numberOfPaidParticipants ===
                  Number(event?.eventInfo?.maxNumOfParticipant)
                }
                className={`w-full rounded-[15px] bg-[#e2614b] px-[24px] py-[10px] text-[#fff] ${
                  event?.numberOfPaidParticipants ===
                  Number(event?.eventInfo?.maxNumOfParticipant)
                    ? "cursor-not-allowed bg-red-900"
                    : ""
                }`}
              >
                {event?.numberOfPaidParticipants ===
                Number(event?.eventInfo?.maxNumOfParticipant)
                  ? "No more ticket"
                  : "Apply for event"}
              </button>
            </div>

            <div>
              <h3>Event Description</h3>
              <p>{event?.eventInfo?.eventDesc}</p>
            </div>

            <div>
              <h3>Event Host/Creator</h3>
              <div className="flex items-center gap-[16px]">
                <p>{event?.eventInfo?.creatorName}</p>
                <a href={event?.eventInfo?.socialLink}>
                  <img src={instagram} alt="" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex w-fit max-w-full flex-col gap-[18px]">
            <div className="flex flex-col gap-4 tablet:flex-row">
              <div className="flex h-[149px] w-full flex-col justify-between rounded-[10px] bg-[#f7f6f9] p-[18px] tablet:w-[50%]">
                <div className="flex items-center gap-[8px]">
                  <img src={dateImg} alt="" />
                  <p>Date and time</p>
                </div>

                <div className="">
                  <h5 className="mb-[5px] font-medium">{`${startDate}`}</h5>
                  <h5 className="font-medium">{`${startTime} to ${endTime}`}</h5>
                </div>
              </div>

              <div className="flex h-[149px] w-full flex-col  justify-between rounded-[10px] bg-[#f7f6f9] p-[18px] tablet:w-[50%]">
                <div className="flex items-center gap-[8px]">
                  <img src={moneyImg} alt="" />
                  <p>Commitment per person</p>
                </div>

                <div>
                  <h5 className="font-medium">
                    N{event?.eventInfo?.amountPerParticipant}
                  </h5>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-[15px] tablet:gap-[8px]">
              <p className="font-medium">Location</p>
              <img src={mapImg} alt="" className="map w-full" />
              {/* <div className="w-full"><iframe width="100%" height="281" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"><a href="https://www.gps.ie/">gps vehicle tracker</a></iframe></div> */}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <PageNotFound />;
  }
};
export default Event;
