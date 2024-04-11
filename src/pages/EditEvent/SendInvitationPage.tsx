// import React from "react";
import { Link } from "react-router-dom";
import ShareInviteLink from "../../components/ShareInviteLink";
import { IEventData } from "../../types/Event";

const SendInvitationPage = ({ event }: { event: IEventData }) => {
  return (
    <>
      <div>
        <ShareInviteLink event={event} />
      </div>
      <div>
        <h3>View Event Details</h3>
        <Link
          to={`/${event.eventId}`}
          className="w-fit rounded-xl bg-orange-clr px-4 py-2 text-white"
        >
          View
        </Link>
      </div>
    </>
  );
};

export default SendInvitationPage;
