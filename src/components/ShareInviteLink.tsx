import { useState } from "react";
import CopyLInkModal from "./modals/CopyLinkModal";
import cheersImg from "../assets/images/Hands holding glasses of champagne.png";
import SendEmail from "./SendEmail";
import { IEventData } from "../types/Event";

const ShareInviteLink = ({ event }: { event: IEventData }) => {
  const methods = ["Invite Link", "Email"];

  const [selected, setSelected] = useState("Invite Link");

  const handleSelect = (e: any) => {
    const method = e.target.innerText;
    // event && console.log(event);
    setSelected(method);
  };
  return (
    <>
      <div className="share_link_container">
        <h4 className="font-normal">Send event invite</h4>
        <div>
          <h5 className="font-noraml text-base">Send invite via:</h5>
          <div className="select_method_div">
            {methods?.map((method, i) => (
              <span
                className={selected === method ? "selected_method" : ""}
                key={i}
                onClick={handleSelect}
              >
                {method}
              </span>
            ))}
          </div>
        </div>

        {selected === "Invite Link" ? (
          <CopyLInkModal event={event} />
        ) : (
          <SendEmail />
        )}

        <div className="mt-10 w-full max-w-[295px]">
          <img
            src={cheersImg}
            alt="image illustration of hands holding glasses of champagne"
          />
        </div>
      </div>
    </>
  );
};

export default ShareInviteLink;
