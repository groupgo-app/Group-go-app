import { useState } from "react";
import CopyLInkModal from "./modals/CopyLinkModal";
import cheersImg from "../assets/images/Hands holding glasses of champagne.png";
import SendEmail from "./SendEmail";
import { IEventData } from "../types/Event";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
} from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import { FaCheck, FaCopy, FaShare } from "react-icons/fa6";

const ShareInviteLink = ({
  event,
  showModals = true,
  showButtons = true,
}: {
  event: IEventData;
  showModals?: boolean;
  showButtons?: boolean;
}) => {
  const methods = ["Invite Link", "Email"];

  const [selected, setSelected] = useState("Invite Link");
  const [copied, setCopied] = useState(false);
  const pageUrl = `${import.meta.env.VITE_REACT_SITE_URL}/${event.eventId}`;

  const handleSelect = (e: any) => {
    const method = e.target.innerText;
    // event && console.log(event);
    setSelected(method);
  };

  const handleShare = async (e: any) => {
    e.preventDefault();
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Groupgo Event",
          url: pageUrl,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      {!(
        event?.numberOfPaidParticipants ===
        Number(event?.eventInfo?.maxNumOfParticipant)
      ) ? (
        <div className="share_link_container">
          <h3>Share Event</h3>
          <h5>Share this event with friends</h5>
          {showButtons && (
            <div className="my-4 flex items-center gap-2">
              <WhatsappShareButton url={pageUrl}>
                <WhatsappIcon className="h-[40px] w-[40px] rounded-full" />
              </WhatsappShareButton>
              <FacebookShareButton url={pageUrl}>
                <FacebookIcon className="h-[40px] w-[40px] rounded-full" />
              </FacebookShareButton>
              <TwitterShareButton url={pageUrl}>
                <XIcon className="h-[40px] w-[40px] rounded-full" />
              </TwitterShareButton>
              <EmailShareButton url={pageUrl}>
                <EmailIcon className="h-[40px] w-[40px] rounded-full" />
              </EmailShareButton>
              <CopyToClipboard
                text={pageUrl}
                onCopy={() => {
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 3000);
                  toast("Link Copied", { type: "success" });
                }}
              >
                <div className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-black text-white">
                  {copied ? (
                    <FaCheck className="text-2xl" />
                  ) : (
                    <FaCopy className="text-2xl" />
                  )}
                </div>
              </CopyToClipboard>
              <button
                type="button"
                className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-black text-white"
                onClick={handleShare}
              >
                <FaShare className="text-2zl" />
              </button>
            </div>
          )}
          {showModals && (
            <>
              <div className="my-4">
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
            </>
          )}
        </div>
      ) : (
        <>
          <h3>Share Event</h3>
          <p>
            You can't share this event because the spaces available have
            finished
          </p>
        </>
      )}
    </>
  );
};

export default ShareInviteLink;
